const { getWeather } = require("../src/services/weather");

test("It should return the current weather of the city", async () => {
  const weather = await getWeather({ city: "London" });
  expect(weather).toHaveProperty("current");
  expect(weather).toHaveProperty("location");
  expect(weather.location).toHaveProperty("region");
  expect(weather.location.region).toBe("City of London, Greater London");
});

test("It should return teh current weather of the mock lat-lon pair", async () => {
  const weather = await getWeather({ lat: 51.5074, lon: 0.1278 });
  expect(weather).toHaveProperty("current");
  expect(weather).toHaveProperty("location");
  expect(weather.location).toHaveProperty("region");
  expect(weather.location.region).toBe("Bexley, Greater London");
});

test("It should return the forecast weather of the city", async () => {
  const weather = await getWeather({
    city: "London",
    method: "forecast",
  });
  expect(weather).toHaveProperty("forecast");
  expect(weather).toHaveProperty("location");
  expect(weather.location).toHaveProperty("region");
  expect(weather.location.region).toBe("City of London, Greater London");
  expect(weather.forecast).toHaveProperty("forecastday");
});

test("It should return the forecast weather of the city", async () => {
  const weather = await getWeather({
    lat: 51.5074,
    lon: 0.1278,
    method: "forecast",
  });
  expect(weather).toHaveProperty("forecast");
  expect(weather).toHaveProperty("location");
  expect(weather.location).toHaveProperty("region");
  expect(weather.location.region).toBe("Bexley, Greater London");
  expect(weather.forecast).toHaveProperty("forecastday");
});
