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
  var finished;

  // startNextTask should be called as soon as both finished and startNextTask
  // are defined. It should be called by the piece of code that just defined
  // either finished or startNextTask.
  var startNextTask;

  var abort;
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

  function cancelFirstTask() {
    if (!finished) {
      finished = {err: 'cancelled', result: null};
      if (startNextTask) startNextTask();
      if (abort) abort();
    }
  }

  /**
   * Accepts a function that will create a subsequent task, and returns a Task
   * that proxies to it (once it's created).
   */
  function registerNextTask(createNextTask) {
    if (startNextTask) {
      throw new Error('thenDo called more than once');
    }

    var proxyTask, finishProxyTask;
    var isProxyCancelled;
    var nextTask;

    proxyTask = Task.do(function(callback) {
      finishProxyTask = callback;
      return function cancelProxyTask() {
        cancelFirstTask();
        isProxyCancelled = true;
        if (nextTask) {
          nextTask.cancel();
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
          }
          else {
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

  return {
    cancel: cancelFirstTask,
    thenDo: registerNextTask
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
