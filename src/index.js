/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require("fastify")({ logger: true });
const { port } = require("./config/default.js");
const locationRoutes = require("./routes/location.js");
const currentRoutes = require("./routes/current.js");
const forecastRoutes = require("./routes/forecast.js");

fastify.register(locationRoutes, { prefix: "/v1" });
fastify.register(currentRoutes, { prefix: "/v1" });
fastify.register(forecastRoutes, { prefix: "/v1" });

fastify
  .listen({ port, host: "0.0.0.0" })
  .then((address) => {
    fastify.log.info(`server listening on ${address}`);
  })
  .catch((err) => {
    fastify.log.info(err);
  });

module.exports = fastify; // for testing
