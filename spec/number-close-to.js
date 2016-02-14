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

module.exports = function(expected) {
  // By default, match to within 1 per-cent.
  var matcher = closeTo(expected, 0.01 * expected);
  matcher.within = function(tolerance) {
    // By default, the tolerance is absolute.
    var matcher = closeTo(expected, tolerance);
    matcher.percent = function() {
      return closeTo(expected, tolerance * expected / 100);
    };
    return matcher;
  };
  return matcher;
};

function closeTo(expected, absTolerance) {
  return {asymmetricMatch: function(actual) {
    return expected - absTolerance <= actual
        && expected + absTolerance >= actual;
  }};
}
