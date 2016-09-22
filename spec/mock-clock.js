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

var PriorityQueue = require('priorityqueuejs');
var Task = require('../lib/internal/task');

var MockClock = exports;

MockClock.create = function(opt_startTime) {
  var theTime = opt_startTime || 0;
  var queue = new PriorityQueue(function(a, b) {
    return b.time - a.time;
  });
  var nextId = 100;
  var cancelledCallbacks = {};

  var me = {};

  me.getTime = function() {
    return theTime;
  };

  me.setTimeout = function(callback, delay) {
    var id = nextId++;
    queue.enq({
      time: theTime + delay,
      id: id,
      callback: callback
    });
    return id;
  };

  me.clearTimeout = function(id) {
    cancelledCallbacks[id] = true;
  };

  me.run = function(opt_duration) {
    var endTime = opt_duration + theTime;

    return wait1ms().thenDo(function loop() {
      if (queue.isEmpty() ||
          (opt_duration && queue.peek().time > endTime)) {
        if (opt_duration) {
          theTime = endTime;
        }
        return;
      }

      var item = queue.deq();

      theTime = item.time;
      if (!cancelledCallbacks[item.id]) {
        item.callback();
      }

      // Wait a bit to allow process.nextTick() and setImmediate to happen.
      return wait1ms().thenDo(loop);
    });
  };

  return me;
};

function wait1ms() {
  return Task.start(function(resolve) {
    setTimeout(resolve, 1);
  });
}
