var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

describe('attempt', function() {
  var timeoutDurations, theTime;
  var attempt;
  beforeEach(function() {
    theTime = 123456;
    timeoutDurations = [];
    var fakeSetTimeout = function(callback, duration) {
      timeoutDurations.push(duration);
      setImmediate(function() {
        theTime += duration;
        callback();
      });
    };
    attempt = require('../lib/internal/attempt')
        .inject(fakeSetTimeout, function() {
          return theTime;
        })
        .attempt;
  });

  var doSomething, equalTo200;
  beforeEach(function() {
    doSomething = sinon.stub();
    equalTo200 = sinon.spy(function(result) {
      return result === 200;
    });
  });

  it('calls doSomething asynchronously', function() {
    attempt({'do': doSomething, until: equalTo200}, function() {});
    expect(doSomething).not.to.have.been.called;
  });

  it('asynchronously calls the callback with an error', function(done) {
    doSomething.yields(new Error('uh-oh!'));

    var called = false;

    attempt({'do': doSomething, until: equalTo200}, function(err, result) {
      called = true;
      expect(err).to.deep.equal(new Error('uh-oh!'));
      expect(result).to.equal(null);
      expect(equalTo200).not.to.have.been.called;
      done();
    });

    expect(called).to.equal(false);
  });

  describe('(when the first attempt succeeds)', function() {

    beforeEach(function() {
      doSomething.yields(null, 200);
    });

    it('asynchronously calls the callback with the successful result', function(done) {
      var called = false;

      attempt({'do': doSomething, until: equalTo200}, function(err, result) {
        called = true;
        expect(err).to.equal(null);
        expect(result).to.equal(200);
        done();
      });

      expect(called).to.equal(false);
    });


    it('gives the result to the success tester', function(done) {
      attempt({'do': doSomething, until: equalTo200}, function() {
        expect(equalTo200).to.have.been.calledWith(200);
        done();
      });
    });
  });

  describe('(when the second attempt succeeds)', function() {
    beforeEach(function() {
      var attemptCount = 0
      doSomething = sinon.spy(function(callback) {
        var result = (attemptCount++ === 0) ? 500 : 200;
        callback(null, result);
      });
    });

    it('calls doSomething twice', function(done) {
      attempt({'do': doSomething, until: equalTo200}, function(err, result) {
        expect(doSomething).to.have.been.calledTwice;
        done();
      });
    });

    it('calls equalTo200 with both results', function(done) {
      attempt({'do': doSomething, until: equalTo200}, function(err, result) {
        expect(equalTo200.args).to.deep.equal([[500], [200]]);
        done();
      });
    });

    it('calls the callback with the successful result', function(done) {
      attempt({'do': doSomething, until: equalTo200}, function(err, result) {
        expect(err).to.equal(null);
        expect(result).to.equal(200);
        done();
      });
    });

    it('waits approximately 500 ms', function(done) {
      attempt({'do': doSomething, until: equalTo200}, function(err, result) {
        expect(timeoutDurations.length).to.equal(1);
        expect(timeoutDurations[0]).to.be.closeTo(500, 250);
        done();
      });
    });
  });

  describe('(when multiple attempts fail)', function() {
    beforeEach(function() {
      doSomething.yields(null, 500);
    });

    it('does exponential backoff', function(done) {
      var TIMEOUT = 5000;
      var INTERVAL = 700;
      var INCREMENT = 1.2;
      var JITTER = 0.2;

      var startTime = theTime;

      attempt({
        'do': doSomething,
        until: equalTo200,
        timeout: TIMEOUT,
        interval: INTERVAL,
        increment: INCREMENT,
        jitter: JITTER
      }, function(err, result) {
        expect(result).to.equal(null);
        expect(err).to.deep.equal(new Error('timeout'));

        var waitTime = INTERVAL;
        timeoutDurations.forEach(function(duration, i) {
          expect(duration).to.be.closeTo(waitTime, waitTime * JITTER);
          waitTime *= INCREMENT;
        });
        expect(startTime + TIMEOUT).to.be.within(
            theTime, theTime + (1 + JITTER) * waitTime);
        done();
      });
    });

    it('can be cancelled immediately', function(done) {
      attempt({'do': doSomething, until: equalTo200}, function(err, result) {
        expect(result).to.equal(null);
        expect(err).to.deep.equal(new Error('cancelled'));
        done();
      }).cancel();
    });

    it('can be cancelled while running', function(done) {
      var wasCancelled = false;
      // A fake action, which never completes, but can be cancelled.
      var doNothing = sinon.spy(function(callback) {
        return {
          cancel: function() {
            wasCancelled = true;
            process.nextTick(function() {
              return callback(new Error('cancelled'), null);
            });
          }
        }
      });

      var handle = attempt({
        'do': doNothing,
        until: equalTo200
      }, function(err, result) {
        expect(wasCancelled).to.equal(true);
        expect(err).to.deep.equal(new Error('cancelled'));
        done();
      });

      setTimeout(function() {
        expect(doNothing).to.have.been.called;
        handle.cancel();
      }, 10);
    })
  });
});
