import { placePhoto } from "../../src/places/photo";
import { PlaceInputType } from "../../src/common";

test("photo should return correct result", async () => {
  const params = {
    photoreference:
      "CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU",
    maxwidth: 100,
    maxheight: 100,
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const r = await placePhoto({ params: params });

  expect(r.status).toEqual(200);
  expect(r.headers["content-type"]).toEqual("image/jpeg");
});
