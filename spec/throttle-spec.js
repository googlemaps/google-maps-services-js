describe('throttle', () => {
  var INTERVAL = 100;

  var fakeSetTimeout = (callback, duration) => {
    setImmediate(() => {
      theTime += duration;
      callback();
    });
  };
  var theTime, enqueue, doSomething;
  beforeEach(() => {
    theTime = 1000000;
    enqueue = require('../lib/throttle')
        .inject(fakeSetTimeout, () => theTime)
        .createQueue(INTERVAL);

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
      expect(theTime).toBe(startTime + INTERVAL);
    });

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime + 2 * INTERVAL);
      done();
    });
  });

  it('waits half an interval, when appropriate', done => {
    var startTime = theTime;

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
    });

    fakeSetTimeout(() => {
      enqueue(doSomething, (err, result) => {
        expect(theTime).toBe(startTime + INTERVAL);
        done();
      });
    }, 0.5 * INTERVAL);
  });

  it('doesn\'t wait when calls are made far apart', done => {
    var startTime = theTime;

    enqueue(doSomething, (err, result) => {
      expect(theTime).toBe(startTime);
    });

    fakeSetTimeout(() => {
      enqueue(doSomething, (err, result) => {
        expect(theTime).toBe(startTime + 2 * INTERVAL);
        done();
      });
    }, 2 * INTERVAL);
  });
});
