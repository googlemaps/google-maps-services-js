import axios from "axios";
import { directions } from "../src/directions";

test("directions should get correct result", async () => {
  const params = {
    origin: "Seattle, WA",
    destination: "San Francisco, CA",
    waypoints: [{ lat: 40, lng: -120 }],
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const r = await directions({ params: params });
  expect(r.data.status).toEqual("OK")
});
