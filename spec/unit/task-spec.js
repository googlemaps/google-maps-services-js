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
    Task.do(doSomethingSpy);

    expect(doSomethingSpy).toHaveBeenCalled();
  });

  describe('when the task completes synchronously,', function() {
    it('calls the next task asynchronously with the result', function(done) {
      var isSync = true;

      Task.withValue(null, 'success')
      .thenDo(function(err, result) {
        expect(isSync).toBe(false);
      })
      .thenDo(done);

      isSync = false;
    });

    it('calls chained tasks with the result of previous tasks', function(done) {
      Task.withValue(null, 'success')
      .thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe('success');
      })
      .thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe(null);
        return Task.withValue(null, 42);
      })
      .thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe(42);
      })
      .thenDo(done);
    });
  });

  describe('when the task throws,', function() {
    it('gives the next task the error', function(done) {
      var isSync = true;

      Task.do(function() {
        throw new Error ('uh oh');
      })
      .thenDo(function(err, result) {
        expect(isSync).toBe(false);
        expect(err).toMatch('uh oh');
        expect(result).toBe(null);
      })
      .thenDo(done);

      isSync = false;
    });
  });

  describe('when the task complete asynchronously', function() {
    it('calls the next task asynchronously', function(done) {
      var isSync = true;

      Task.do(function(callback) {
        setImmediate(function() {
          callback(null, 'success');
        });
      })
      .thenDo(function(err, result) {
        expect(isSync).toBe(false);
      })
      .thenDo(done);

      isSync = false;
    });

    it('calls chained tasks with the result of previous tasks', function(done) {
      Task.do(function(callback) {
        setImmediate(function() {
          callback(null, 'success');
        });
      })
      .thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe('success');
      })
      .thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe(null);
        return Task.do(function(callback) {
          setImmediate(function() {
            callback(null, 42);
          });
        });
      })
      .thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe(42);
      })
      .thenDo(done);
    });
  });

  describe('when the first task is cancelled,', function() {
    it('cancels the work if possible', function(done) {
      Task.do(function(callback) {
        return function cancelMe() {
          done();
        };
      })
      .cancel();
    });

    it('calls the next task with a "cancelled" error', function(done) {
      var task = Task.do(function(callback) {
        setImmediate(function() {
          callback(null, 'success');
        });
      });

      task.thenDo(function(err, result) {
        expect(err).toBe('cancelled');
        expect(result).toBe(null);
      })
      .thenDo(done);

      task.cancel();
    });

    it('ignores cancellation if the task is already finished', function(done) {
      var task = Task.withValue(null, 'success');

      task.thenDo(function(err, result) {
        expect(err).toBe(null);
        expect(result).toBe('success');
      })
      .thenDo(done);

      task.cancel();
    });
  });

  describe('when a proxy task is cancelled,', function() {
    it('cancels the first task if it is not finished', function(done) {
      var cancelled = false;
      Task.do(function(callback) {
        return function cancelMe() {
          cancelled = true;
        };
      })
      .thenDo(function(err, result) {
        expect(cancelled).toBe(true);
        expect(err).toBe('cancelled');
        expect(result).toBe(null);
        done();
      })
      .cancel();
    });

    it('starts the next task with "cancelled"', function(done) {
      Task.withValue(null, 'success')
      .thenDo(function(err, result) {
        expect(err).toBe('cancelled');
        done();
      })
      .cancel();
    });

    it('cancels the next task if it has started', function(done) {
      var proxyTask =
          Task.withValue(null, 'success')
          .thenDo(function(err, result) {
            return Task.do(function(callback) {
              return function cancelMe() {
                done();
              };
            });
          });

      setImmediate(function() {
        proxyTask.cancel();
      });
    });
  });
});
