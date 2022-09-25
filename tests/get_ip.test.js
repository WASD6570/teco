const { getIp } = require("../src/services/get_ip.js");

test("It should return the server IPv4", async () => {
  const ip = await getIp({ ip: "::1" });
  expect(ip).toEqual(
    expect.stringMatching(
      /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/
    )
  );
});

test("It should return the mock IPv4", async () => {
  const ip = await getIp({ ip: "200.11.22.333" });
  expect(ip).toEqual("200.11.22.333");
});
