const { getLocation } = require("../services/location");

async function locationRoutes(fastify, options) {
  fastify.get("/location", async (request, reply) => {
    try {
      const location = await getLocation(request);
      reply.send(location);
    } catch (error) {
      reply.code(500).send({ error: "Error getting location" });
    }
  });
}

module.exports = locationRoutes;
