exports.inject = (setTimeout) => ({
  attempt: (doSomething, wasSuccessful, callback) => {
    (function tryItAndSee() {
      doSomething((err, result) => {
        process.nextTick(() => {
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
});
