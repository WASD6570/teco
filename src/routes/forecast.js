const { getLocation } = require("../services/location");
const { weather_api_key, weather_api_url } = require("../config/default.js");
const fetch = require("../services/fetch.js");

async function forecastRoutes(fastify) {
  fastify.get("/forecast/:city", async (request, reply) => {
    try {
      const city = request.params.city;
      const days = request.query.days || 5;
      const data = await fetch(
        `${weather_api_url}/forecast.json?key=${weather_api_key}&q=${city}&days=${days}`
      );
      const json = await data.json();
      reply.send({ location: json.location, forecast: json.forecast });
    } catch (error) {
      reply.code(500).send({ error: "Error getting forecast wheather" });
    }
  });

  fastify.get("/forecast", async (request, reply) => {
    try {
      const days = request.query.days || 5;
      const location = await getLocation(request);
      const data = await fetch(
        `${weather_api_url}/forecast.json?key=${weather_api_key}&q=${location.lat},${location.lon}&days=${days}`
      );
      const json = await data.json();
      reply.send({ location: json.location, forecast: json.forecast });
    } catch (error) {
      reply.code(500).send({ error: "Error getting forecast wheather" });
    }
  });
}

module.exports = forecastRoutes;
