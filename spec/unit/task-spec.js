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

describe('Task:', function() {
  var doSomethingSpy;
  beforeEach(function() {
    doSomethingSpy = jasmine.createSpy('doSomethingSpy');
  });

  it('calls doSomething immediately', function() {
    Task.start(doSomethingSpy);

    expect(doSomethingSpy).toHaveBeenCalled();
  });

  describe('when the task completes synchronously,', function() {
    it('calls the next task asynchronously with the result', function(done) {
      var isSync = true;

      Task.withValue('success')
      .thenDo(function() {
        expect(isSync).toBe(false);
      }, fail)
      .thenDo(done);

      isSync = false;
    });

    it('calls chained tasks with the result of previous tasks', function(done) {
      Task.withValue('success')
      .thenDo(function(result) {
        expect(result).toBe('success');
      }, fail)
      .thenDo(function(result) {
        expect(result).toBe(undefined);
        return Task.withValue(42);
      }, fail)
      .thenDo(function(result) {
        expect(result).toBe(42);
      }, fail)
      .thenDo(done);
    });
  });

  describe('when the task throws,', function() {
    it('gives the next task the error', function(done) {
      var isSync = true;

      Task.start(function() {
        throw new Error ('uh oh');
      })
      .thenDo(fail, function(err) {
        expect(isSync).toBe(false);
        expect(err).toMatch('uh oh');
      })
      .thenDo(done);

      isSync = false;
    });
  });

  describe('when the task completes asynchronously', function() {
    it('calls the next task asynchronously', function(done) {
      var isSync = true;

      Task.start(function(resolve) {
        setImmediate(function() {
          resolve('success');
        });
      })
      .thenDo(function(result) {
        expect(isSync).toBe(false);
      })
      .thenDo(done);

      isSync = false;
    });

    it('calls chained tasks with the result of previous tasks', function(done) {
      Task.start(function(resolve) {
        setImmediate(function() {
          resolve('success');
        });
      })
      .thenDo(function(result) {
        expect(result).toBe('success');
      }, fail)
      .thenDo(function(result) {
        expect(result).toBe(undefined);
        return Task.start(function(resolve) {
          setImmediate(function() {
            resolve(42);
          });
        });
      }, fail)
      .thenDo(function(result) {
        expect(result).toBe(42);
      }, fail)
      .thenDo(done);
    });
  });

  describe('when the first task is cancelled,', function() {
    it('cancels the work if possible', function(done) {
      Task.start(function() {
        return function cancelMe() {
          done();
        };
      })
      .cancel();
    });

    it('does not call the next task with a "cancelled" error', function(done) {
      var firstTask = Task.start(function(resolve) {
        setImmediate(function() {
          resolve('success');
        });
      });
      firstTask.thenDo(fail, fail).finally(done);
      firstTask.cancel();
    });

    it('ignores cancellation if the task is already finished', function(done) {
      var firstTask = Task.withValue('success');
      firstTask.thenDo(done, fail);
      firstTask.cancel();
    });
  });

  describe('when a composite task is cancelled,', function() {
    it('aborts the first task if it is not finished', function(done) {
      var aborted = false;
      Task.start(function() {
        return function abortMe() {
          aborted = true;
        };
      })
      .thenDo(fail, fail)
      .finally(function() {
        expect(aborted).toBe(true);
        done();
      })
      .cancel();
    });

    it('does not start the next task', function(done) {
      Task.withValue('success')
      .thenDo(fail, fail)
      .finally(done)
      .cancel();
    });

    it('cancels the next task if it has started', function(done) {
      var compositeTask =
          Task.withValue('success')
          .thenDo(function() {
            return Task.start(function() {
              return function abortMe() {
                done();
              };
            });
          });

      setImmediate(function() {
        compositeTask.cancel();
      });
    });
  });
});

describe('Task.race', function() {
  var task1, resolve1, cancelled1;
  var task2, resolve2, cancelled2;
  beforeEach(function() {
    task1 = Task.start(function(resolve) {
      resolve1 = resolve;
      cancelled1 = jasmine.createSpy('cancelled1');
      return cancelled1;
    });
    task2 = Task.start(function(resolve) {
      resolve2 = resolve;
      cancelled2 = jasmine.createSpy('cancelled2');
      return cancelled2;
    });
  });

  it('cancels the second task if the first task finishes', function(done) {
    Task.race([task1, task2]).thenDo(function(result) {
      expect(result).toBe(42);
      expect(cancelled2).toHaveBeenCalled();
      done();
    });

    resolve1(42);
  });

  it('cancels both tasks if the race is cancelled', function(done) {
    Task.race([task1, task2])
    .thenDo(fail)
    .finally(function() {
      expect(cancelled1).toHaveBeenCalled();
      expect(cancelled2).toHaveBeenCalled();
      done();
    })
    .cancel();
  });
});
