exports.inject = (setTimeout, getTime) => ({
  /**
   * Creates a queue, and returns an enqueue function. The enqueue function
   * takes two parameters:
   *  - The first is a doSomething function (taking no arguments). doSomething
   *    will be queued and called at the next available opportunity.
   *  - The second is a callback function, which will be called with
   *    (err,result) as arguments, after doSomething has been called. If
   *    doSomething threw an exception, err will be that exception. Otherwise,
   *    err will be null, and result will be doSomething`s return value.
   *
   * @param {number} interval Minimum time (ms) between calling the queued
   *     actions.
   * @return {Function}
   */
  createQueue: function(interval) {
    var queue = [];
    var lastTime;
    var scheduled = false;

    function schedule() {
      if (scheduled) return;

      var delay = lastTime + interval - getTime();
      delay = (lastTime != undefined && delay > 0) ? delay : 0;

      scheduled = true;
      setTimeout(() => {
        scheduled = false;

        while (true) {
          var action = queue.shift();
          if (!action) return;
          if (!action.done) break;
        }

        lastTime = getTime();
        action.done = true;
        action();

        if (queue.length) {
          schedule();
        }
      }, delay);
    }

    return function enqueue(doSomething, callback) {
      function action() {
        try {
          var result = doSomething();
        } catch (err) {
          return callback(err, null);
        }
        return callback(null, result);
      }

      function cancel() {
        if (!action.done) {
          action.done = true;
          process.nextTick(() => callback(new Error('cancelled'), null));
        }
      }

      queue.push(action);
      schedule();

      return {cancel: cancel};
    };
  }
});
