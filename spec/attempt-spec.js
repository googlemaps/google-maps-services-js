describe('attempt', function() {
  var attempt;
  var fakeSetTimeout;
  var timeoutDurations;
  beforeEach(function() {
    timeoutDurations = [];
    fakeSetTimeout = function(callback, duration) {
      timeoutDurations.push(duration);
      setImmediate(callback);
    };
    attempt = require('../attempt').inject(fakeSetTimeout).attempt;
  });

  var doSomething, wasSuccessful;
  beforeEach(function() {
    doSomething = jasmine.createSpy('doSomething');
    wasSuccessful = jasmine.createSpy('wasSuccessful')
        .and.callFake(function(result) {
          return result === 200;
        });
  });

  it('calls doSomething synchronously', function() {
    attempt(doSomething, wasSuccessful, function() {});
    expect(doSomething).toHaveBeenCalled();
  });

  it('asynchronously calls the callback with an error', function(done) {
    doSomething.and.callFake(function(callback) {
      callback(new Error('uh-oh!'));
    });

    var called = false;

    attempt(doSomething, wasSuccessful, function(err, result) {
      called = true;
      expect(err).toMatch('uh-oh!');
      expect(result).toBe(null);
      expect(wasSuccessful).not.toHaveBeenCalled();
      done();
    });

    expect(called).toBe(false);
  });

  describe('(when the first attempt succeeds)', function() {

    beforeEach(function() {
      doSomething.and.callFake(function(callback) {
        callback(null, 200);
      });
    });

    it('asynchronously calls the callback with the successful result', function(done) {
      var called = false;

      attempt(doSomething, wasSuccessful, function(err, result) {
        called = true;
        expect(err).toBe(null);
        expect(result).toBe(200);
        done();
      });

      expect(called).toBe(false);
    });


    it('gives the result to the success tester', function(done) {
      attempt(doSomething, wasSuccessful, function() {
        expect(wasSuccessful).toHaveBeenCalledWith(200);
        done();
      });
    });
  });

  describe('(when the second attempt succeeds)', function() {
    beforeEach(function() {
      var attemptCount = 0
      doSomething.and.callFake(function(callback) {
        var result = (attemptCount++ === 0) ? 500 : 200;
        callback(null, result);
      });
    });

    it('calls doSomething twice', function(done) {
      attempt(doSomething, wasSuccessful, function(err, result) {
        expect(doSomething.calls.count()).toBe(2);
        done();
      });
    });

    it('calls wasSuccessful with both results', function(done) {
      attempt(doSomething, wasSuccessful, function(err, result) {
        expect(wasSuccessful.calls.allArgs()).toEqual([[500], [200]]);
        done();
      });
    });

    it('calls the callback with the successful result', function(done) {
      attempt(doSomething, wasSuccessful, function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe(200);
        done();
      });
    });

    it('waits 500 ms', function(done) {
      attempt(doSomething, wasSuccessful, function(err, result) {
        expect(timeoutDurations).toEqual([500]);
        done();
      });
    });
  });

  describe('(when multiple attempts fail)', function() {
    it('does exponential backoff');
  });
});
