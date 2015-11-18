describe('throttle', () => {
  var PERIOD = 1000;

  var fakeSetTimeout = (callback, duration) => {
    setImmediate(() => {
      theTime += duration;
      callback();
    });
  };
  var theTime, createQueue, queue, doSomething;
  beforeEach(() => {
    theTime = 1000000;
    createQueue = require('../lib/throttled-queue')
        .inject(fakeSetTimeout, () => theTime)
        .create;
    queue = createQueue(1, PERIOD);

    var count = 0;
    doSomething = jasmine.createSpy('doSomething')
        .and.callFake(() => 'result ' + (++count));
  });

  it('doesn\'t do the operation synchronously', () => {
    queue.add(doSomething, () => {});
    expect(doSomething).not.toHaveBeenCalled();
  });

  it('calls doSomething', done => {
    queue.add(doSomething, (err, result) => {
      expect(doSomething).toHaveBeenCalled();
      done();
    });
  });

  it('.cancel() cancels an operation', done => {
    queue.add(doSomething, (err, result) => {
      expect(err).toMatch(/cancelled/);
      expect(doSomething).not.toHaveBeenCalled();
      done();
    })
    .cancel();
  });

  it('.cancel() has no effect once the operation starts', done => {
    var handle = queue.add(doSomething, (err, result) => {
      expect(err).toBe(null);
      expect(result).toBe('result 1');
      handle.cancel();
      done();
    });
  });

  it('does actions in order', done => {
    queue.add(doSomething, (err, result) => {
      expect(result).toBe('result 1');
    });

    queue.add(doSomething, (err, result) => {
      expect(result).toBe('result 2');
    });

    queue.add(doSomething, (err, result) => {
      expect(result).toBe('result 3');
      done();
    });
  });

  it('does it immediately the first time', done => {
    var startTime = theTime;

    queue.add(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
      done();
    });
  });

  it('spaces out calls made at the same time', done => {
    var startTime = theTime;

    queue.add(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
    });

    queue.add(doSomething, (err, result) => {
      expect(theTime).toBe(startTime + PERIOD);
    });

    queue.add(doSomething, (err, result) => {
      expect(theTime).toBe(startTime + 2 * PERIOD);
      done();
    });
  });

  it('waits half a period, when appropriate', done => {
    var startTime = theTime;

    queue.add(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
    });

    fakeSetTimeout(() => {
      queue.add(doSomething, (err, result) => {
        expect(theTime).toBe(startTime + PERIOD);
        done();
      });
    }, 0.5 * PERIOD);
  });

  it('doesn\'t wait when calls are made far apart', done => {
    var startTime = theTime;

    queue.add(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
    });

    fakeSetTimeout(() => {
      queue.add(doSomething, (err, result) => {
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

      queue.add(doSomething, (err, result) => {
        expect(theTime).toBe(startTime);
      });

      queue.add(doSomething, (err, result) => {
        expect(theTime).toBe(startTime);
      });

      queue.add(doSomething, (err, result) => {
        expect(theTime).toBe(startTime);
      });

      queue.add(doSomething, (err, result) => {
        expect(theTime).toBe(startTime + PERIOD);
        done();
      });
    });
  });
});
