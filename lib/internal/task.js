/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This is a utility class that makes it easier to work with asynchronous tasks.
// Here's why I don't just use Promises:
// (a) I don't want to depend on a Promise implementation.
// (b) Promises aren't cancellable (yet?), and I want cancellability.
//
// This is very stripped down, compared to Promises.
// (a) You can only call .thenDo() once.
// (b) Tasks always complete with a pair (err, result).
// (c) Regardless of errors or cancellation, the argument of .thenDo() is
//     *always* executed, and asynchronously.
// (d) The argument to .thenDo() must return either undefined or a Task. I don't
//     promote values to Tasks, like what happens with Promises.

var Task = exports;

/**
 * Creates a Task.
 *
 * The `doSomething` function is called immediately, so that it can start
 * whatever work is part of this task.
 *
 * The `doSomething` function is given a callback, which it should call (once)
 * when the task is finished, to report its result. The callback should be given
 * two parameters (err, result). One of err and result should be null/undefined,
 * depending on whether the task completed successfully or not.
 *
 * The `doSomething` function can optionally return a cancel function. This will
 * be called if the task is cancelled.
 *
 * @param  {function(function(?, T)): function()} doSomething
 * @return {Task<T>}
 * @template T
 */
Task.start = function(doSomething) {
  var me = {};

  // onFinish should be called as soon as both finished and onFinish are
  // defined. It should be called by the piece of code that just defined either
  // finished or onFinish.
  var finished;
  var onFinish;

  try {
    // doSomething must be called immediately.
    var abort = doSomething(function(err, result) {
      // Ignore if we are given multiple results, or it's been cancelled.
      if (finished) return;

      finished = {err: err, result: result};
      if (onFinish) onFinish();
    });
  } catch (err) {
    // NOTE: Neither finished nor onFinish is defined yet.
    finished = {err: err, result: null};
  }

  /**
   * Cancels the task (unless the task has already finished, in which case
   * this call is ignored).
   *
   * If there is a subsequent task scheduled (using #thenDo) it will be called
   * with the pair ('cancelled', null).
   */
  me.cancel = function() {
    if (!finished) {
      finished = {err: 'cancelled', result: null};
      if (onFinish) onFinish();
      if (abort) abort();
    }
  };

  /**
   * Sets the listener that will be called with the result of this task, when
   * finished. This function can be called at most once.
   *
   * @param {function(?, T)}
   */
  function setListener(callback) {
    onFinish = function() {
      callback(finished.err, finished.result);
    };
    if (finished) onFinish();
  }

  /**
   * Creates and returns a composite task, consisting of this task and a
   * subsequent task.
   *
   * @param {function(*, *): ?Task} createSubsequentTask A function that will
   *     create the subsequent task. This function will be called
   *     asynchronously, with the (err, result) pair of this task, when it
   *     finishes. The return value must be a Task, or null/undefined. Note that
   *     the function is called, even if this task finishes with an error value.
   *
   * @return {Task} The composite task. Cancelling the composite task cancels
   *     either this task or the subsequent task, depending on whether this
   *     task is finished.
   */
  me.thenDo = function(createSubsequentTask) {
    if (onFinish) {
      throw new Error('thenDo called more than once');
    }
    return compose(me, setListener, createSubsequentTask);
  };

  return me;
};

/**
 * Creates a Task with the given error and result.
 */
Task.withValue = function(err, result) {
  return Task.start(function(callback) {
    callback(err, result);
  });
};

/**
 * Creates a composite task, which uses the output of the first task to create
 * a subsequent task, and represents the two tasks together.
 *
 * This function is internal-only. It is used by Task.thenDo().
 *
 * @param {Task<T>} firstTask
 * @param {function(function(?, T))} setFirstTaskListener The private
 *     setListener method on the firstTask.
 * @param {function(?, T): Task<U>} createSubsequentTask
 * @return {Task<U>}
 * @template T, U
 */
function compose(firstTask, setFirstTaskListener, createSubsequentTask) {
  var cancelled;
  var subsequentTask;
  var callbackCompositeTask;
  var compositeTask = Task.start(function(callback) {
    callbackCompositeTask = callback;
    return function cancelCompositeTask() {
      cancelled = true;
      if (subsequentTask) {
        subsequentTask.cancel();
      } else {
        firstTask.cancel();
      }
    };
  });

  setFirstTaskListener(function(firstErr, firstResult) {
    // createSubsequentTask must be called asynchronously.
    process.nextTick(function() {
      var err = cancelled ? 'cancelled' : firstErr;
      var result = cancelled ? null : firstResult;
      try {
        subsequentTask = createSubsequentTask(err, result);
        if (subsequentTask) {
          subsequentTask.thenDo(callbackCompositeTask);
        } else {
          callbackCompositeTask(null, null);
        }
      } catch (subsequentErr) {
        callbackCompositeTask(subsequentErr, null);
      }
    });
  });

  return compositeTask;
}
