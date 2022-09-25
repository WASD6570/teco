require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  ipify: process.env.IPIFY,
  ip_api: process.env.IP_API,
  weather_api_key: process.env.WEATHER_API_KEY,
  weather_api_url: process.env.WEATHER_API_URL,
};
