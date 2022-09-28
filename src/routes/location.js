const { getLocation } = require("../services/location");

/**
 * @swagger
 * tags:
 *  name: location
 *  description: location endpoint
 */

/**
 * @swagger
 * /location
 *   get:
 *     summary: Get current location by ip
 *     tags:
 *       - Location
 *     externalDocs:
 *       description: Find out more about this endpoints
 *       url: https://documenter.getpostman.com/view/17908890/2s83f8isGn
 *     responses:
 *       200:
 *         description: Current location
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
 *       500:
 *         description: Error getting location
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

async function locationRoutes(fastify) {
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
