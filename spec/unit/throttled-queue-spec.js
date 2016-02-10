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

describe('throttle', function() {
  var PERIOD = 1000;

  // This simplistic fake is suitable for injecting into the ThrottledQueue.
  // The queue only has one pending timeout at a time.
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
          ++count;
          return Task.withValue('result ' + count);
        });
  });

  it('doesn\'t do the operation synchronously', function() {
    queue.add(doSomething);
    expect(doSomething).not.toHaveBeenCalled();
  });

  it('calls doSomething', function(done) {
    queue.add(doSomething)
    .finally(function() {
      expect(doSomething).toHaveBeenCalled();
      done();
    });
  });

  it('.cancel() cancels an operation', function(done) {
    var task = queue.add(doSomething);
    task.thenDo(fail, fail).finally(function() {
      expect(doSomething).not.toHaveBeenCalled();
      done();
    });
    task.cancel();
  });

  it('does actions in order', function(done) {
    queue.add(doSomething)
    .thenDo(function(result) {
      expect(result).toBe('result 1');
    }, fail);

    queue.add(doSomething)
    .thenDo(function(result) {
      expect(result).toBe('result 2');
    }, fail);

    queue.add(doSomething)
    .thenDo(function(result) {
      expect(result).toBe('result 3');
    })
    .thenDo(done, fail);
  });

  it('does it immediately the first time', function(done) {
    var startTime = theTime;

    queue.add(doSomething)
    .thenDo(function() {
      expect(theTime).toBe(startTime);
      done();
    });
  });

  it('spaces out calls made at the same time', function(done) {
    var startTime = theTime;

    queue.add(doSomething)
    .thenDo(function() {
      expect(theTime).toBe(startTime);
    }, fail);

    queue.add(doSomething)
    .thenDo(function() {
      expect(theTime).toBe(startTime + PERIOD);
    }, fail);

    queue.add(doSomething)
    .thenDo(function() {
      expect(theTime).toBe(startTime + 2 * PERIOD);
    })
    .thenDo(done, fail);
  });

  it('spaces out calls made half a PERIOD apart', function(done) {
    var startTime = theTime;

    queue.add(doSomething)
    .thenDo(function() {
      expect(theTime).toBe(startTime);
    }, fail);

    setTimeout(function() {
      theTime += 0.5 * PERIOD;
      queue.add(doSomething)
      .thenDo(function() {
        expect(theTime).toBe(startTime + PERIOD);
      })
      .thenDo(done, fail);
    }, 10);
  });

  it('doesn\'t wait when calls are made far apart', function(done) {
    var startTime = theTime;

    queue.add(doSomething)
    .thenDo(function() {
      expect(theTime).toBe(startTime);
    }, fail);

    setTimeout(function() {
      theTime += 2 * PERIOD;
      queue.add(doSomething)
      .thenDo(function() {
        expect(theTime).toBe(startTime + 2 * PERIOD);
      })
      .thenDo(done, fail);
    }, 10);
  });

  it('does not wait for calls that are cancelled', function(done) {
    var startTime = theTime;

    queue.add(doSomething)
    .thenDo(function(result) {
      expect(theTime).toBe(startTime);
      expect(result).toBe('result 1');
    }, fail);

    var task = queue.add(doSomething).thenDo(fail, fail);
    task.finally(function() {
      expect(theTime).toBe(startTime);
    })
    task.cancel();

    queue.add(doSomething)
    .thenDo(function(result) {
      expect(theTime).toBe(startTime + PERIOD);
      expect(result).toBe('result 2');
    })
    .thenDo(done, fail);
  });

  describe('when limit is 3', function() {
    beforeEach(function() {
      queue = createQueue(3, PERIOD);
    });

    it('waits before making the 4th call made together', function(done) {
      var startTime = theTime;

      queue.add(doSomething)
      .thenDo(function() {
        expect(theTime).toBe(startTime);
      }, fail);

      queue.add(doSomething)
      .thenDo(function() {
        expect(theTime).toBe(startTime);
      }, fail);

      queue.add(doSomething)
      .thenDo(function() {
        expect(theTime).toBe(startTime);
      }, fail);

      queue.add(doSomething)
      .thenDo(function() {
        expect(theTime).toBe(startTime + PERIOD);
      })
      .thenDo(done, fail);
    });
  });
});
