const fetch = require("./fetch");
const { ipify } = require("../config/default.js");

/**
 * @param {request} request object from fastify
 * @returns {string} ip address
 * This function is meant to be used in local context
 * It will return the ip address of the server if the client is localhost
 */
const getIp = async (request) => {
  let ip = request.ip;

  if (ip === "::1" || ip === "127.0.0.1") {
    const data = await fetch(ipify);
    ip = await data.text();
  }

  if (ip.split(".")[0].includes("172") || ip.split(".")[0].includes("192")) {
    return (ip = "200.59.81.129");
  }

  return ip;
};

module.exports = { getIp };
