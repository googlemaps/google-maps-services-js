describe('throttle', function() {
  var PERIOD = 1000;

  var fakeSetTimeout = function(callback, duration) {
    setImmediate(function() {
      theTime += duration;
      callback();
    });
  };
  var theTime, createQueue, queue, doSomething;
  beforeEach(function() {
    theTime = 1000000;
    createQueue = require('../../lib/internal/throttled-queue')
        .inject(fakeSetTimeout, function() {
          return theTime;
        })
        .create;
    queue = createQueue(1, PERIOD);

    var count = 0;
    doSomething = jasmine.createSpy('doSomething')
        .and.callFake(function() {
          return 'result ' + (++count);
        });
  });

  it('doesn\'t do the operation synchronously', function() {
    queue.add(doSomething, function() {});
    expect(doSomething).not.toHaveBeenCalled();
  });

  it('calls doSomething', function(done) {
    queue.add(doSomething, function(err, result) {
      expect(doSomething).toHaveBeenCalled();
      done();
    });
  });

  it('.cancel() cancels an operation', function(done) {
    queue.add(doSomething, function(err, result) {
      expect(err).toMatch(/cancelled/);
      expect(doSomething).not.toHaveBeenCalled();
      done();
    })
    .cancel();
  });

  it('.cancel() has no effect once the operation starts', function(done) {
    var handle = queue.add(doSomething, function(err, result) {
      expect(err).toBe(null);
      expect(result).toBe('result 1');
      handle.cancel();
      done();
    });
  });

  it('does actions in order', function(done) {
    queue.add(doSomething, function(err, result) {
      expect(result).toBe('result 1');
    });

    queue.add(doSomething, function(err, result) {
      expect(result).toBe('result 2');
    });

    queue.add(doSomething, function(err, result) {
      expect(result).toBe('result 3');
      done();
    });
  });

  it('does it immediately the first time', function(done) {
    var startTime = theTime;

    queue.add(doSomething, function(err, result) {
      expect(theTime).toBe(startTime);
      done();
    });
  });

  it('spaces out calls made at the same time', function(done) {
    var startTime = theTime;

    queue.add(doSomething, function(err, result) {
      expect(theTime).toBe(startTime);
    });

    queue.add(doSomething, function(err, result) {
      expect(theTime).toBe(startTime + PERIOD);
    });

    queue.add(doSomething, function(err, result) {
      expect(theTime).toBe(startTime + 2 * PERIOD);
      done();
    });
  });

  it('waits half a period, when appropriate', function(done) {
    var startTime = theTime;

    queue.add(doSomething, function(err, result) {
      expect(theTime).toBe(startTime);
    });

    fakeSetTimeout(function() {
      queue.add(doSomething, function(err, result) {
        expect(theTime).toBe(startTime + PERIOD);
        done();
      });
    }, 0.5 * PERIOD);
  });

  it('doesn\'t wait when calls are made far apart', function(done) {
    var startTime = theTime;

    queue.add(doSomething, function(err, result) {
      expect(theTime).toBe(startTime);
    });

    fakeSetTimeout(function() {
      queue.add(doSomething, function(err, result) {
        expect(theTime).toBe(startTime + 2 * PERIOD);
        done();
      });
    }, 2 * PERIOD);
  });

  describe('when limit is 3', function() {
    beforeEach(function() {
      queue = createQueue(3, PERIOD);
    });

    it('waits before making the 4th call made together', function(done) {
      var startTime = theTime;

      queue.add(doSomething, function(err, result) {
        expect(theTime).toBe(startTime);
      });

      queue.add(doSomething, function(err, result) {
        expect(theTime).toBe(startTime);
      });

      queue.add(doSomething, function(err, result) {
        expect(theTime).toBe(startTime);
      });

      queue.add(doSomething, function(err, result) {
        expect(theTime).toBe(startTime + PERIOD);
        done();
      });
    });
  });
});
