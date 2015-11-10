describe('attempt', () => {
  var attempt;
  var fakeSetTimeout;
  var timeoutDurations;
  beforeEach(() => {
    timeoutDurations = [];
    fakeSetTimeout = (callback, duration) => {
      timeoutDurations.push(duration);
      setImmediate(callback);
    };
    attempt = require('../attempt').inject(fakeSetTimeout).attempt;
  });

  var doSomething, wasSuccessful;
  beforeEach(() => {
    doSomething = jasmine.createSpy('doSomething');
    wasSuccessful = jasmine.createSpy('wasSuccessful')
        .and.callFake((result) => {
          return result === 200;
        });
  });

  it('calls doSomething synchronously', () => {
    attempt(doSomething, wasSuccessful, () => {});
    expect(doSomething).toHaveBeenCalled();
  });

  it('asynchronously calls the callback with an error', (done) => {
    doSomething.and.callFake((callback) => {
      callback(new Error('uh-oh!'));
    });

    var called = false;

    attempt(doSomething, wasSuccessful, (err, result) => {
      called = true;
      expect(err).toMatch('uh-oh!');
      expect(result).toBe(null);
      expect(wasSuccessful).not.toHaveBeenCalled();
      done();
    });

    expect(called).toBe(false);
  });

  describe('(when the first attempt succeeds)', () => {

    beforeEach(() => {
      doSomething.and.callFake((callback) => {
        callback(null, 200);
      });
    });

    it('asynchronously calls the callback with the successful result', (done) => {
      var called = false;

      attempt(doSomething, wasSuccessful, (err, result) => {
        called = true;
        expect(err).toBe(null);
        expect(result).toBe(200);
        done();
      });

      expect(called).toBe(false);
    });


    it('gives the result to the success tester', (done) => {
      attempt(doSomething, wasSuccessful, () => {
        expect(wasSuccessful).toHaveBeenCalledWith(200);
        done();
      });
    });
  });

  describe('(when the second attempt succeeds)', () => {
    beforeEach(() => {
      var attemptCount = 0
      doSomething.and.callFake((callback) => {
        var result = (attemptCount++ === 0) ? 500 : 200;
        callback(null, result);
      });
    });

    it('calls doSomething twice', (done) => {
      attempt(doSomething, wasSuccessful, (err, result) => {
        expect(doSomething.calls.count()).toBe(2);
        done();
      });
    });

    it('calls wasSuccessful with both results', (done) => {
      attempt(doSomething, wasSuccessful, (err, result) => {
        expect(wasSuccessful.calls.allArgs()).toEqual([[500], [200]]);
        done();
      });
    });

    it('calls the callback with the successful result', (done) => {
      attempt(doSomething, wasSuccessful, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe(200);
        done();
      });
    });

    it('waits 500 ms', (done) => {
      attempt(doSomething, wasSuccessful, (err, result) => {
        expect(timeoutDurations).toEqual([500]);
        done();
      });
    });
  });

  describe('(when multiple attempts fail)', () => {
    it('does exponential backoff');
  });
});
