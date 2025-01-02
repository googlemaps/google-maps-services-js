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

import { decodePath } from "../src/util";
import { routes } from "../src/routes";
import {
  RouteTravelMode,
  RouteUnits,
  RoutingPreference,
} from "../src/interfaces/routes";

test("routes should get correct result", async () => {
  const params = {
    origin: {
      location: {
        latLng: { latitude: 37.419734, longitude: -122.0827784 }, // Origin coordinates
      },
    },
    destination: {
      location: {
        latLng: { latitude: 37.41767, longitude: -122.079595 }, // Destination coordinates
      },
    },
    travelMode: RouteTravelMode.DRIVE,
    routingPreference: RoutingPreference.TRAFFIC_AWARE,
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
    languageCode: "en-US",
    units: RouteUnits.IMPERIAL,
    apiKey: { key: process.env.GOOGLE_MAPS_API_KEY },
  };

  const r = await routes({
    params: params,
    apiKey: { key: process.env.GOOGLE_MAPS_API_KEY },
  });

  expect(r.config.url).toContain(
    "routes.googleapis.com/directions/v2:computeRoutes"
  );

  expect(r.data.routes[0].legs[0].distanceMeters).toBeGreaterThan(0);
  expect(
    decodePath(r.data.routes[0].polyline.encodedPolyline)[0].lat
  ).toBeDefined();
});
