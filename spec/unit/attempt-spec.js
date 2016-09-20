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
var MockClock = require('../mock-clock');
var numberCloseTo = require('../number-close-to');

describe('attempt', function() {
  var clock;
  var attempt;
  beforeEach(function() {
    clock = MockClock.create();
    var wait = require('../../lib/internal/wait')
        .inject(clock.setTimeout, clock.clearTimeout);
    attempt = require('../../lib/internal/attempt').inject(wait).attempt;
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
        .and.returnValue(Task.withValue(200));

    attempt({'do': doSomething, until: equalTo200});
    expect(doSomething).not.toHaveBeenCalled();
  });

  it('calls the callback with an error', function(done) {
    function throwError() {
      throw new Error('uh-oh!');
    }

    attempt({'do': throwError, until: equalTo200})
    .thenDo(fail, function(err) {
      expect(err).toMatch('uh-oh!');
      expect(equalTo200).not.toHaveBeenCalled();
      done();
    });
  });

  describe('(when the first attempt succeeds)', function() {
    function return200() {
      return Task.withValue(200);
    }

    it('calls the callback with the successful result', function(done) {
      attempt({'do': return200, until: equalTo200})
      .thenDo(function(result) {
        expect(result).toBe(200);
      })
      .thenDo(done, fail);
    });


    it('gives the result to the success tester', function(done) {
      attempt({'do': return200, until: equalTo200})
      .thenDo(function() {
        expect(equalTo200).toHaveBeenCalledWith(200);
      })
      .thenDo(done, fail);
    });
  });

  describe('(when the second attempt succeeds)', function() {
    var attemptCount, requestTimes;
    beforeEach(function() {
      attemptCount = 0;
      requestTimes = [];
    });

    function return500Then200() {
      ++attemptCount;
      requestTimes.push(clock.getTime());
      return Task.withValue((attemptCount > 1) ? 200 : 500);
    }

    it('calls doSomething twice', function(done) {
      attempt({'do': return500Then200, until: equalTo200})
      .thenDo(function(result) {
        expect(attemptCount).toBe(2);
      })
      .thenDo(done, fail);

      clock.run();
    });

    it('calls equalTo200 with both results', function(done) {
      attempt({'do': return500Then200, until: equalTo200})
      .thenDo(function(result) {
        expect(equalTo200.calls.allArgs()).toEqual([[500], [200]]);
      })
      .thenDo(done, fail);

      clock.run();
    });

    it('calls the callback with the successful result', function(done) {
      attempt({'do': return500Then200, until: equalTo200})
      .thenDo(function(result) {
        expect(result).toBe(200);
      })
      .thenDo(done, fail);

      clock.run();
    });

    it('waits approximately INTERVAL ms', function(done) {
      var INTERVAL = 700;
      var JITTER = 0.5
      attempt({
        'do': return500Then200,
        until: equalTo200,
        interval: INTERVAL,
        jitter: JITTER
      })
      .thenDo(function() {
        expect(requestTimes).toEqual(
          [0, numberCloseTo(INTERVAL).within(JITTER * 100).percent()]);
      })
      .thenDo(done, fail);

      clock.run();
    });
  });

  describe('(when multiple attempts fail)', function() {
    var attemptCount, requestTimes;
    beforeEach(function() {
      attemptCount = 0;
      requestTimes = [];
    });

    function return500TenTimesThen200() {
      ++attemptCount;
      requestTimes.push(clock.getTime());
      return Task.withValue((attemptCount > 10) ? 200 : 500);
    }

    it('does exponential backoff', function(done) {
      var INTERVAL = 700;
      var INCREMENT = 1.2;
      var JITTER = 0.2;

      var startTime = clock.getTime();

      attempt({
        'do': return500TenTimesThen200,
        until: equalTo200,
        interval: INTERVAL,
        increment: INCREMENT,
        jitter: JITTER
      })
      .thenDo(function(result) {
        expect(result).toBe(200);

        var waitTime = INTERVAL;
        requestTimes.reduce(function(prevTime, time) {
          var duration = time - prevTime;
          expect(duration).toEqual(
              numberCloseTo(waitTime).within(100 * JITTER).percent());
          waitTime *= INCREMENT;
          return time;
        });
      })
      .thenDo(done, fail);

      clock.run();
    });

    it('can be cancelled immediately', function(done) {
      attempt({do: return500TenTimesThen200, until: equalTo200})
      .thenDo(fail, fail)
      .finally(done)
      .cancel();
    });

    it('can be cancelled while running', function(done) {
      var abortMe = jasmine.createSpy('abortMe');
      var task = attempt({
        do: function() {
          // This task never completes, but can be cancelled.
          return Task.start(function() {
            return abortMe;
          });
        },
        until: equalTo200
      })
      .thenDo(fail, fail)
      .finally(function() {
        expect(abortMe).toHaveBeenCalled();
        done();
      });

      clock.run(10)
      .thenDo(function() {
        expect(abortMe).not.toHaveBeenCalled();
        task.cancel();
      });
    });
  });
});
