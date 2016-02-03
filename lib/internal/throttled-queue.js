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

exports.inject = function(setTimeout, getTime) {
  return {
    /**
     * Creates a ThrottledQueue. The queue stores actions, which will be executed
     * asynchronously, at a controlled rate.
     *
     * @param {number} limit The maximum number of actions that can be executed
     *     over one period.
     * @param {number} period The time period (ms) over which limit is
     *     enforceable.
     * @return {ThrottledQueue}
     */
    create: function(limit, period) {
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

          while (true) {
            var action = queue.shift();
            if (!action) return;
            if (!action.done) break;
          }

          recentTimes.insert(getTime());
          action.done = true;
          action();

          if (queue.length) {
            schedule();
          }
        }, delay);
      }

      // Return a ThrottledQueue object.
      return {
        /**
         * Adds an action to the work queue. The action will be executed as soon
         * as the rate limit allows.
         *
         * @param {Function} doSomething This function will be called with no
         *     arguments. It is always executed asynchronously. Its return value,
         *     or any exception it throws, will be given to the callback.
         * @param {Function} callback A function that takes (err, result) as
         *     arguments. This is called after doSomething is executed. EITHER:
         *     err is null, and result is doSomething's return value; OR result is
         *     null, and err is the exception thrown by doSomething.
         * @return {Object} Returns a handle with a .cancel() method, which can be
         *     used to cancel the action. If .cancel() is called, then callback
         *     will be called with err = new Error('cancelled').
         */
        add: function(doSomething, callback) {
          function action() {
            try {
              var result = doSomething();
            } catch (err) {
              return callback(err, null);
            }
            return callback(null, result);
          }

          function cancel() {
            if (!action.done) {
              action.done = true;
              process.nextTick(function() {
                return callback(new Error('cancelled'), null);
              });
            }
          }

          queue.push(action);
          schedule();

          return {cancel: cancel};
        }
      };
    }
  };
};
