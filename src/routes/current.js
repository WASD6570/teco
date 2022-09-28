const { getLocation } = require("../services/location");
const { getWeather } = require("../services/weather.js");

/**
 * @swagger
 * tags:
 *  name: current
 *  description: current endpoints
 */

/**
 * @swagger
 * /current/{city}:
 *   get:
 *     summary: Get current weather by city name
 *     tags:
 *       - Current
 *     externalDocs:
 *       description: Find out more about this endpoints
 *       url: https://documenter.getpostman.com/view/17908890/2s83f8isGn
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: City name
 *     responses:
 *       200:
 *         description: Current weather
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status: string
 *                  country: string
 *                  countryCode: string
 *                  region: string
 *                  regionName: string
 *                  city: string
 *                  zip: string
 *                  lat: number
 *                  lon: number
 *                  timezone: string
 *                  isp: string
 *                  org: string
 *                  as: string
 *                  query: string
 *       404:
 *          description: Error getting current weather
 *             content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      error:
 *                        type: string
 *       500:
 *         description: Error getting current weather
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

async function currentRoutes(fastify) {
  fastify.get("/current/:city", async (request, reply) => {
    try {
      const city = request.params.city;
      const json = await getWeather({ method: "current", city });
      if (!json.error) {
        return reply.send({ location: json.location, current: json.current });
      }
      return reply.status(404).send({ error: json.error.message });
    } catch (error) {
      reply.code(500).send({ error: "Error getting current wheather" });
    }
  });

  /**
   * @swagger
   * /current
   *    get:
   *      summary: Get current weather by location of the client
   *    tags:
   *      - Current
   *    externalDocs:
   *      description: Find out more about this endpoints
   *      url: https://documenter.getpostman.com/view/17908890/2s83f8isGn
   *    responses:
   *      200:
   *        description: Current weather
   *        content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  status: string
   *                  country: string
   *                  countryCode: string
   *                  region: string
   *                  regionName: string
   *                  city: string
   *                  zip: string
   *                  lat: number
   *                  lon: number
   *                  timezone: string
   *                  isp: string
   *                  org: string
   *                  as: string
   *                  query: string
   *      404:
   *        description: Error getting current weather
   *         content:
   *                application/json:
   *                  schema:
   *                    type: object
   *                    properties:
   *                      error:
   *                        type: string
   *      500:
   *        description: Error getting current weather
   *        content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   */

  fastify.get("/current", async (request, reply) => {
    try {
      const location = await getLocation(request);
      const json = await getWeather({
        method: "current",
        lat: location.lat,
        lon: location.lon,
      });
      if (!json.error) {
        return reply.send({ location: json.location, current: json.current });
      }
      reply.status(404).send({ error: json.error.message });
    } catch (error) {
      reply.code(500).send({ error: "Error getting current wheather" });
    }
  });
}

module.exports = currentRoutes;
