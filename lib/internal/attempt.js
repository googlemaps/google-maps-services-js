exports.inject = function(setTimeout, getTime) {
  return {

    attempt: function(options, callback) {
      var doSomething = options['do'];
      var isSuccessful = options.until;
      var timeout = options.timeout || 60 * 1000;
      var interval = options.interval || 500;
      var increment = options.increment || 1.5;
      var jitter = options.jitter || 0.5;

      var startTime = getTime();
      var handle;
      var cancelled = false;
      var running = false;

      process.nextTick(function tryItAndSee() {
        if (cancelled) return;

        running = true;
        handle = doSomething(function(err, result) {
          running = false;

          if (err != null) {
            callback(err, null);
            return;
          }
          if (isSuccessful(result)) {
            callback(null, result);
            return;
          }

          var waitTime = interval * (1 + jitter * (2 * Math.random() - 1));
          interval *= increment;
          if (getTime() + waitTime < startTime + timeout) {
            setTimeout(tryItAndSee, waitTime);
            return;
          }

          callback(new Error('timeout'), null);
        });
      });

      return {cancel: function() {
        if (cancelled) return;
        cancelled = true;

        if (running) {
          // Since doSomething() has been called, it has responsibility for
          // calling the callback. We won't call it.
          if (handle && handle.cancel) {
            handle.cancel();
          }
        } else {
          // Since doSomething() has not been called, we have responsibility for
          // calling the callback.
          process.nextTick(function() {
            callback(new Error('cancelled'), null);
          });
        }
      }};
    }

  };
};
