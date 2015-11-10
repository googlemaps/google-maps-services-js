exports.inject = (setTimeout) => ({
  attempt: (options, callback) => {
    (function tryItAndSee() {
      options.do((err, result) => {
        process.nextTick(() => {
          if (err != null) {
            callback(err, null);
            return;
          }
          if (options.until(result)) {
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
