/**
 * Copyright 2026 Google LLC
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

/**
 * Regression test for issue #1319.
 *
 * The Google Directions API only populates `steps[i].steps` (substeps) and
 * `steps[i].transit_details` for transit travel mode. The previous typings
 * declared both as required and, for `steps`, as a non-array
 * `DirectionsStep`, which did not match the API response.
 *
 * Each block below is a compile-time assertion: if the typings regress,
 * `tsc`/`ts-jest` will fail the build before any runtime assertion runs.
 */

import { Maneuver, TravelMode, VehicleType } from "./common";
import type { DirectionsStep, TransitDetails } from "./common";

const baseStep: DirectionsStep = {
  html_instructions: "Head north-west",
  distance: { value: 0, text: "" },
  duration: { value: 0, text: "" },
  start_location: { lat: 0, lng: 0 },
  end_location: { lat: 0, lng: 0 },
  maneuver: Maneuver.turn_left,
  polyline: { points: "" },
  travel_mode: TravelMode.driving,
};

const transitDetails: TransitDetails = {
  arrival_stop: { name: "Innes Ave & Fitch St", location: { lat: 0, lng: 0 } },
  departure_stop: { name: "24th St", location: { lat: 0, lng: 0 } },
  arrival_time: { value: new Date(0), text: "", time_zone: "" },
  departure_time: { value: new Date(0), text: "", time_zone: "" },
  headsign: "Ocean Beach",
  headway: 600,
  num_stops: 5,
  line: {
    agencies: [{ name: "SFMTA", url: "", phone: "" }],
    name: "N Judah",
    short_name: "N",
    color: "#0000FF",
    url: "https://www.sfmta.com",
    icon: "",
    text_color: "#FFFFFF",
    vehicle: {
      name: "Light rail",
      icon: "",
      local_icon: "",
      type: VehicleType.TRAM,
    },
  },
};

test("DirectionsStep.steps is an optional array of DirectionsStep", () => {
  // Substeps are an array (compile-time check).
  const transitStep: DirectionsStep = {
    ...baseStep,
    travel_mode: TravelMode.transit,
    steps: [
      {
        ...baseStep,
        html_instructions: "Walk to Innes Ave & Fitch St",
      },
    ],
    // transit_details has a pinned type so a regression to a wrong element
    // type would fail compilation, not just the runtime sanity check.
    transit_details: transitDetails,
  };

  // The runtime field, when read, is `DirectionsStep[] | undefined`.
  const substeps: DirectionsStep[] | undefined = transitStep.steps;
  expect(Array.isArray(substeps) || substeps === undefined).toBe(true);
});

test("DirectionsStep does not require a steps field (non-transit steps)", () => {
  // A step without a `steps` field is valid (compile-time check).
  const drivingStep: DirectionsStep = baseStep;
  expect(drivingStep.travel_mode).toBe(TravelMode.driving);
});

test("DirectionsStep.transit_details is optional (only present for transit)", () => {
  // A step without `transit_details` is valid (compile-time check).
  const drivingStep: DirectionsStep = baseStep;
  expect(drivingStep.transit_details).toBeUndefined();

  // The declared type of a present transit_details must be TransitDetails.
  const transitStep: DirectionsStep = {
    ...baseStep,
    transit_details: transitDetails,
  };
  const td: TransitDetails | undefined = transitStep.transit_details;
  expect(td && typeof td === "object" && "line" in td).toBe(true);
});
