/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Task = require('../../lib/internal/task');
var within = require('../within');

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
    attempt = require('../../lib/internal/attempt')
        .inject(fakeSetTimeout)
        .attempt;
  });

  var equalTo200;
  beforeEach(function() {
    equalTo200 = jasmine.createSpy('equalTo200')
        .and.callFake(function(result) {
          return result === 200;
        });
  });

  it('calls doSomething asynchronously', function() {
    var doSomething = jasmine.createSpy('doSomething')
        .and.returnValue(Task.withValue(null, 200));

    attempt({'do': doSomething, until: equalTo200});
    expect(doSomething).not.toHaveBeenCalled();
  });

  it('calls the callback with an error', function(done) {
    function throwError() {
      throw new Error('uh-oh!');
    }

    attempt({'do': throwError, until: equalTo200})
    .thenDo(function(err, result) {
      expect(err).toMatch('uh-oh!');
      expect(result).toBe(null);
      expect(equalTo200).not.toHaveBeenCalled();
      done();
    });
  });

  describe('(when the first attempt succeeds)', function() {
    function return200() {
      return Task.withValue(null, 200);
    }

    it('calls the callback with the successful result', function(done) {
      attempt({'do': return200, until: equalTo200})
      .thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe(200);
        done();
      });
    });


    it('gives the result to the success tester', function(done) {
      attempt({'do': return200, until: equalTo200})
      .thenDo(function() {
        expect(equalTo200).toHaveBeenCalledWith(200);
        done();
      });
    });
  });

  describe('(when the second attempt succeeds)', function() {
    var attemptCount;
    beforeEach(function() {
      attemptCount = 0;
    });

    function return500Then200() {
      ++attemptCount;
      return Task.withValue(null, (attemptCount > 1) ? 200 : 500);
    }

    it('calls doSomething twice', function(done) {
      attempt({'do': return500Then200, until: equalTo200})
      .thenDo(function(err, result) {
        expect(attemptCount).toBe(2);
        done();
      });
    });

    it('calls equalTo200 with both results', function(done) {
      attempt({'do': return500Then200, until: equalTo200})
      .thenDo(function(err, result) {
        expect(equalTo200.calls.allArgs()).toEqual([[500], [200]]);
        done();
      });
    });

    it('calls the callback with the successful result', function(done) {
      attempt({'do': return500Then200, until: equalTo200})
      .thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe(200);
        done();
      });
    });

    it('waits approximately 500 ms', function(done) {
      attempt({'do': return500Then200, until: equalTo200})
      .thenDo(function(err, result) {
        expect(timeoutDurations).toEqual([within(250).of(500)]);
        done();
      });
    });
  });

  describe('(when multiple attempts fail)', function() {
    var attemptCount;
    beforeEach(function() {
      attemptCount = 0;
    });

    function return500TenTimesThen200() {
      ++attemptCount;
      return Task.withValue(null, (attemptCount > 10) ? 200 : 500);
    }

    it('does exponential backoff', function(done) {
      var INTERVAL = 700;
      var INCREMENT = 1.2;
      var JITTER = 0.2;

      var startTime = theTime;

      attempt({
        'do': return500TenTimesThen200,
        until: equalTo200,
        interval: INTERVAL,
        increment: INCREMENT,
        jitter: JITTER
      })
      .thenDo(function(err, result) {
        expect(result).toBe(200);
        expect(err).toBe(null);

        var waitTime = INTERVAL;
        timeoutDurations.forEach(function(duration, i) {
          expect(duration).toEqual(within(waitTime * JITTER).of(waitTime));
          waitTime *= INCREMENT;
        });

        done();
      });
    });

    it('can be cancelled immediately', function(done) {
      attempt({'do': return500TenTimesThen200, until: equalTo200})
      .thenDo(function(err, result) {
        expect(result).toBe(null);
        expect(err).toMatch('cancelled');
        done();
      })
      .cancel();
    });

    it('can be cancelled while running', function(done) {
      var cancelMe = jasmine.createSpy('cancelMe');
      var task = attempt({
        'do': function() {
          // This task never completes, but can be cancelled.
          return Task.start(function(callback) {
            return cancelMe;
          });
        },
        until: equalTo200
      })
      .thenDo(function(err, result) {
        expect(err).toMatch('cancelled');
        expect(cancelMe).toHaveBeenCalled();
        done();
      });

      setTimeout(function() {
        expect(cancelMe).not.toHaveBeenCalled();
        task.cancel();
      }, 10);
    })
  });
});
