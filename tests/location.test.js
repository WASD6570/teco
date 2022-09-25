const { getLocation } = require("../src/services/location");

test("It should return the location of the ip address", async () => {
  const location = await getLocation({ ip: "200.59.81.129" });
  expect(location).toHaveProperty("status");
  expect(location.status).toBe("success");
  expect(location.regionName).toBe("San Juan");
});
