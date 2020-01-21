import { geolocate, GeolocateResponseData } from "../src/geolocate";

test("geolocate should call axios correctly", async () => {
  const params = { key: process.env.GOOGLE_MAPS_API_KEY };
  const data = { considerIp: false };

  // geolocation depends upon the ip address of the client.
  // it is not deterministic and will return 404 for some IPs.
  try {
    const r = await geolocate({ params, data });
    expect(r.data).toHaveProperty("location");
  } catch (e) {
    expect(e.response.status).toEqual(404);
  }
});
