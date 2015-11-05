exports.inject = function(setTimeout) {
  return {
    attempt: function(doSomething, wasSuccessful, callback) {
      (function tryItAndSee() {
        doSomething(function(err, result) {
          process.nextTick(function() {
            if (err != null) {
              callback(err, null);
              return;
            }
            if (wasSuccessful(result)) {
              callback(null, result);
              return;
            }

            // TODO(step): Implement exponential backoff.
            setTimeout(tryItAndSee, 500);
          });
        });
      })();
    }
  };
};
