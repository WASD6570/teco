const fetch = require("./fetch");
const { weather_api_key, weather_api_url } = require("../config/default.js");

const getWeather = async ({ method = "current", city, days, lat, lon }) => {
  let data;
  if (city !== undefined && days !== undefined && method === "forecast") {
    data = await fetch(
      `${weather_api_url}/${method}.json?key=${weather_api_key}&q=${city}&days=${days}`
    );
  }
  if (city !== undefined) {
    data = await fetch(
      `${weather_api_url}/${method}.json?key=${weather_api_key}&q=${city}`
    );
  }
  if (lat !== undefined && lon !== undefined) {
    data = await fetch(
      `${weather_api_url}/${method}.json?key=${weather_api_key}&q=${lat},${lon}`
    );
  }
  if (
    lat !== undefined &&
    lon !== undefined &&
    days !== undefined &&
    method === "forecast"
  ) {
    data = await fetch(
      `${weather_api_url}/${method}.json?key=${weather_api_key}&q=${lat},${lon}&days=${days}`
    );
  }
  return await data?.json();
};

module.exports = { getWeather };
