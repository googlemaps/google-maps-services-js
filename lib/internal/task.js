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
// (b) Promises aren't cancellable, and I want cancellability.
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
 * Creates a Task out of a function that does some work and calls its callback
 * with the results.
 *
 * @param  {function(Callback): CancelFunction} doSomething
 * @return {Task}
 */
Task.do = function(doSomething) {
  var self;
  var abort;
  var finished;

  // startNextTask should be called as soon as both finished and startNextTask
  // are defined. It should be called by the piece of code that just defined
  // either finished or startNextTask.
  var startNextTask;

  try {
    // doSomething must be called immediately.
    abort = doSomething(function(err, result) {
      // Ignore if we are given multiple results, or it's been cancelled.
      if (finished) return;

      finished = {err: err, result: result};
      if (startNextTask) startNextTask();
    });
  } catch (err) {
    // NOTE: Neither finished nor startNextTask is defined yet.
    finished = {err: err, result: null};
  }


  return self = {
    /**
     * Cancels the task (unless the task has already finished, in which case
     * this call is ignored).
     *
     * If there is a subsequent task scheduled (using #thenDo) it will be called
     * with the pair ('cancelled', null).
     */
    cancel: function() {
      if (!finished) {
        finished = {err: 'cancelled', result: null};
        if (startNextTask) startNextTask();
        if (abort) abort();
      }
    },

    /**
     * Creates and returns a composite task, consisting of this task and a
     * subsequent task.
     *
     * @param {function(*, *): ?Task} createNextTask A function that will create
     *     the subsequent task. This function will be called asynchronously,
     *     with the (err, result) pair of this task, when it finishes. The
     *     return value must be a Task, or null/undefined. Note that the
     *     function is called, even if this task finishes with an error value.
     *
     * @return {Task} The composite task. Cancelling the composite task cancels
     *     either this task or the subsequent task, depending on whether this
     *     task is finished.
     */
    thenDo: function(createNextTask) {
      if (startNextTask) {
        throw new Error('thenDo called more than once');
      }

      var finishProxyTask;
      var isProxyCancelled;
      var nextTask;

      var proxyTask = Task.do(function(callback) {
        finishProxyTask = callback;
        return function cancelProxyTask() {
          isProxyCancelled = true;
          if (nextTask) {
            nextTask.cancel();
          } else {
            self.cancel();
          }
        };
      });

      startNextTask = function() {
        // createNextTask must be called asynchronously.
        process.nextTick(function() {
          var err = isProxyCancelled ? 'cancelled' : finished.err;
          var result = isProxyCancelled ? null : finished.result;
          try {
            nextTask = createNextTask(err, result);
            if (nextTask) {
              nextTask.thenDo(finishProxyTask);
            } else {
              finishProxyTask(null, null);
            }
          } catch (nextErr) {
            finishProxyTask(nextErr, null);
          }
        });
      };
      if (finished) startNextTask();

      return proxyTask;
    }
  };
};

/**
 * Creates a Task with the given error and result.
 */
Task.withValue = function(err, result) {
  return Task.do(function(callback) {
    callback(err, result);
  });
};
