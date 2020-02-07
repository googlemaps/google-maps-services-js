import { version } from ".";

test("version exists and is string", () => {
  expect(typeof version).toBe("string");
});
