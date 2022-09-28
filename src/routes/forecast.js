const { getLocation } = require("../services/location");
const { weather_api_key, weather_api_url } = require("../config/default.js");
const fetch = require("../services/fetch.js");

/**
 * @swagger
 * tags:
 *  name: forecast
 *  description: forecast endpoints
 */

/**
 * @swagger
 * /forecast/{city}:
 *  get:
 *   summary: Get forecast weather by city name
 *  tags:
 *   - Forecast
 *  externalDocs:
 *    description: Find out more about this endpoints
 *    url: https://documenter.getpostman.com/view/17908890/2s83f8isGn
 *  parameters:
 *    - in: path
 *    name: city
 *    schema:
 *      type: string
 *      required: true
 *      description: City name
 *    - in: query
 *    name: days
 *    schema:
 *      type: integer
 *      required: false
 *      description: Number of days requested, default 5
 *  responses:
 *    200:
 *     description: Forecast weather
 *     content:
 *      application/json:
 *    404:
 *      description: Error getting forecast weather
 *      content:
 *        application/json:
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *            type: string
 *    500:
 *      description: Error getting forecast weather
 *      content:
 *        application/json:
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *            type: string
 */

async function forecastRoutes(fastify) {
  fastify.get("/forecast/:city", async (request, reply) => {
    try {
      const city = request.params.city;
      const days = request.query.days || 5;
      const data = await fetch(
        `${weather_api_url}/forecast.json?key=${weather_api_key}&q=${city}&days=${days}`
      );
      const json = await data.json();
      if (!json.error) {
        return reply.send({ location: json.location, forecast: json.forecast });
      }
      reply.code(404).send({ error: json.error.message });
    } catch (error) {
      reply.code(500).send({ error: "Error getting forecast wheather" });
    }
  });
  /**
   * @swagger
   * /forecast
   *  get:
   *   summary: Get forecast weather of the client location
   *  tags:
   *   - Forecast
   *  externalDocs:
   *    description: Find out more about this endpoints
   *    url: https://documenter.getpostman.com/view/17908890/2s83f8isGn
   *  parameters:
   *    - in: query
   *    name: days
   *    schema:
   *      type: integer
   *      required: false
   *      description: Number of days requested, default 5
   *  responses:
   *    200:
   *     description: Forecast weather
   *     content:
   *      application/json:
   *    404:
   *      description: Error getting forecast weather
   *      content:
   *        application/json:
   *        schema:
   *          type: object
   *          properties:
   *            error:
   *            type: string
   *    500:
   *      description: Error getting forecast weather
   *      content:
   *        application/json:
   *        schema:
   *          type: object
   *          properties:
   *            error:
   *            type: string
   */

  fastify.get("/forecast", async (request, reply) => {
    try {
      const days = request.query.days || 5;
      const location = await getLocation(request);
      const data = await fetch(
        `${weather_api_url}/forecast.json?key=${weather_api_key}&q=${location.lat},${location.lon}&days=${days}`
      );
      const json = await data.json();
      if (!json.error) {
        return reply.send({ location: json.location, forecast: json.forecast });
      }
      reply.code(404).send({ error: json.error.message });
    } catch (error) {
      reply.code(500).send({ error: "Error getting forecast wheather" });
    }
  });
}

module.exports = forecastRoutes;
