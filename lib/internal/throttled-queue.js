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

var CircularBuffer = require('./circular-buffer');
var Task = require('./task');

exports.inject = function(setTimeout, getTime) {
  return {
    /**
     * Creates a ThrottledQueue. The queue stores tasks, which will be executed
     * asynchronously, at a controlled rate.
     *
     * @param {number} limit The maximum number of tasks that can be executed
     *     over one period.
     * @param {number} period The time period (ms) over which limit is
     *     enforceable.
     * @return {ThrottledQueue}
     */
    create: function(limit, period) {
      var me = {};
      var queue = [];
      var recentTimes = CircularBuffer.create(limit);
      var scheduled = false;

      function schedule() {
        if (scheduled) return;

        var lastTime = recentTimes.item(limit - 1);
        var delay = lastTime + period - getTime();
        delay = (lastTime != undefined && delay > 0) ? delay : 0;

        scheduled = true;
        setTimeout(function() {
          scheduled = false;

          var action = queue.shift();
          if (action) action();

          if (queue.length) {
            schedule();
          }
        }, delay);
      }

      /**
       * Adds a task to the work queue.
       *
       * @param {function(): Task<T>} doSomething Starts the task. This function
       *     will be called when the rate limit allows.
       * @return {Task<T>} The delayed task.
       * @template T
       */
      me.add = function(doSomething) {
        schedule();

        return Task.start(function(callback) {
          var cancelled;

          // Call the callback when the action is popped off the queue
          // (unless we were cancelled in the meantime).
          queue.push(function() {
            if (!cancelled) {
              recentTimes.insert(getTime());
              callback(null, null);
            }
          });
          return function onCancel() {
            cancelled = true;
          };
        })
        .thenDo(function(err, result) {
          if (err == null) return doSomething();
        });
      };

      return me;
    }
  };
};
