const { Console } = require("console");

const PROXY_ENDPOINT = "https://www.sanity.io/intake/dp/v1/track";

const getPayload = ({ event, metadata = {}, userId }) =>
  JSON.stringify({
    userId: userId,
    event: "studio-telemetry",
    properties: {
      eventAction: event,
      ...metadata,
    },
    context: {
      library: {
        name: "http",
      },
    },
    timestamp: new Date().toISOString(),
  });

const telemetryClient = ({ event, metadata, userId, telemetryDisabled }) => {
  const fetch = require("cross-fetch");

  //If you set the env variable to 1, you will turn the tracking off. Anything else, and this fetch will run
  if (!telemetryDisabled) {
    console.log(fetch);
    fetch(PROXY_ENDPOINT, {
      method: "POST", // or 'PUT'
      headers: {
        authorization: "Basic MXBiSk5jRUpIV09lM0R2ZFB5SXA3WERJQ0o0Og==",
      },
      body: getPayload({ event, metadata, userId, telemetryDisabled }),
    });
  }
};

module.exports = telemetryClient;
