const { ip_api } = require("../config/default.js");
const { getIp } = require("./get_ip.js");
const fetch = require("./fetch.js");

const getLocation = async (request) => {
  const ip = await getIp(request);
  const data = await fetch(`${ip_api}/${ip}`);
  const json = await data.json();
  return json;
};

module.exports = { getLocation };
