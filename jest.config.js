/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
  roots: ["<rootDir>/src/", "<rootDir>/e2e/"],
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  // some dependencies are esm and need to be compiled to work in jest
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|retry-axios|query-string|decode-uri-component|split-on-first|filter-obj)/)",
  ],
  collectCoverageFrom: ["src/**/([a-zA-Z_]*).{js,ts}", "!**/*.test.{js,ts}"],
};
