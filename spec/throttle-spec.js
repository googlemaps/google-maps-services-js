describe('throttle', () => {
  var PERIOD = 1000;

  var fakeSetTimeout = (callback, duration) => {
    setImmediate(() => {
      theTime += duration;
      callback();
    });
  };
  var theTime, createQueue, enqueue, doSomething;
  beforeEach(() => {
    theTime = 1000000;
    createQueue = require('../lib/throttle')
        .inject(fakeSetTimeout, () => theTime)
        .createQueue;
    enqueue = createQueue(1, PERIOD);

    var count = 0;
    doSomething = jasmine.createSpy('doSomething')
        .and.callFake(() => 'result ' + (++count));
  });

  it('doesn\'t do the operation synchronously', () => {
    enqueue(doSomething, () => {});
    expect(doSomething).not.toHaveBeenCalled();
  });

  it('calls doSomething', done => {
    enqueue(doSomething, (err, result) => {
      expect(doSomething).toHaveBeenCalled();
      done();
    });
  });

  it('.cancel() cancels an operation', done => {
    enqueue(doSomething, (err, result) => {
      expect(err).toMatch(/cancelled/);
      expect(doSomething).not.toHaveBeenCalled();
      done();
    })
    .cancel();
  });

  it('.cancel() has no effect once the operation starts', done => {
    var handle = enqueue(doSomething, (err, result) => {
      expect(err).toBe(null);
      expect(result).toBe('result 1');
      handle.cancel();
      done();
    });
  });

  it('does actions in order', done => {
    enqueue(doSomething, (err, result) => {
      expect(result).toBe('result 1');
    });

    enqueue(doSomething, (err, result) => {
      expect(result).toBe('result 2');
    });

    enqueue(doSomething, (err, result) => {
      expect(result).toBe('result 3');
      done();
    });
  });

  it('does it immediately the first time', done => {
    var startTime = theTime;

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
      done();
    });
  });

  it('spaces out calls made at the same time', done => {
    var startTime = theTime;

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
    });

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime + PERIOD);
    });

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime + 2 * PERIOD);
      done();
    });
  });

  it('waits half a period, when appropriate', done => {
    var startTime = theTime;

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
    });

    fakeSetTimeout(() => {
      enqueue(doSomething, (err, result) => {
        expect(theTime).toBe(startTime + PERIOD);
        done();
      });
    }, 0.5 * PERIOD);
  });

  it('doesn\'t wait when calls are made far apart', done => {
    var startTime = theTime;

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
    });

    fakeSetTimeout(() => {
      enqueue(doSomething, (err, result) => {
        expect(theTime).toBe(startTime + 2 * PERIOD);
        done();
      });
    }, 2 * PERIOD);
  });

  describe('when limit is 3', function() {
    beforeEach(function() {
      enqueue = createQueue(3, PERIOD);
    });

    it('waits before making the 4th call made together', function(done) {
      var startTime = theTime;

      enqueue(doSomething, (err, result) => {
        expect(theTime).toBe(startTime);
      });

      enqueue(doSomething, (err, result) => {
        expect(theTime).toBe(startTime);
      });

      enqueue(doSomething, (err, result) => {
        expect(theTime).toBe(startTime);
      });

      enqueue(doSomething, (err, result) => {
        expect(theTime).toBe(startTime + PERIOD);
        done();
      });
    });
  });
});
