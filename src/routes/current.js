const { getLocation } = require("../services/location");
const { getWeather } = require("../services/weather.js");

async function currentRoutes(fastify) {
  fastify.get("/current/:city", async (request, reply) => {
    try {
      const city = request.params.city;
      const json = await getWeather({ method: "current", city });
      reply.send({ location: json.location, current: json.current });
    } catch (error) {
      reply.code(500).send({ error: "Error getting current wheather" });
    }
  });

  fastify.get("/current", async (request, reply) => {
    try {
      const location = await getLocation(request);
      const json = await getWeather({
        method: "current",
        lat: location.lat,
        lon: location.lon,
      });
      reply.send({ location: json.location, current: json.current });
    } catch (error) {
      reply.code(500).send({ error: "Error getting current wheather" });
    }
  });
}

module.exports = currentRoutes;
