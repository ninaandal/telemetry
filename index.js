import fetch from "cross-fetch";
const PROXY_ENDPOINT = "https://www.sanity.io/intake/dp/v1/track";

const getPayload = ({ event, metadata = {}, userId }) => {
  return JSON.stringify({
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
};

export const telemetryClick = ({
  event,
  metadata,
  userId,
  telemetryDisabled,
}) => {
  console.log("click");
  //const fetch = require("cross-fetch");

  //If you set the env variable to 1, you will turn the tracking off. Anything else, and this fetch will run
  if (!telemetryDisabled) {
    fetch(PROXY_ENDPOINT, {
      method: "POST", // or 'PUT'
      headers: {
        authorization: "Basic MXBiSk5jRUpIV09lM0R2ZFB5SXA3WERJQ0o0Og==",
      },
      body: getPayload({ event, metadata, userId, telemetryDisabled }),
    });
  }
};

export const telemetryTimer = ({
  event,
  metadata,
  userId,
  telemetryDisabled,
}) => {
  //const fetch = require("cross-fetch");
  const id = Math.random();
  let timerInfo = {
    start: null,
    finish: null,
  };

  //If you set the env variable to 1, you will turn the tracking off. Anything else, and this fetch will run
  if (!telemetryDisabled) {
    console.log("timer");
  }

  const start = () => {
    console.log("start");
    timerInfo.start = performance.now();
    const mt = { ...metadata, ...{ start: timerInfo.start, timerId: id } };

    fetch(PROXY_ENDPOINT, {
      method: "POST", // or 'PUT'
      headers: {
        authorization: "Basic MXBiSk5jRUpIV09lM0R2ZFB5SXA3WERJQ0o0Og==",
      },
      body: getPayload({
        event,
        metadata: mt,
        userId,
      }),
    });
  };
  const end = () => {
    console.log("end");
    timerInfo.end = performance.now();
    const mt = {
      ...metadata,
      ...{ timeSpent: timerInfo.end - timerInfo.start, timerId: id },
    };

    fetch(PROXY_ENDPOINT, {
      method: "POST", // or 'PUT'
      headers: {
        authorization: "Basic MXBiSk5jRUpIV09lM0R2ZFB5SXA3WERJQ0o0Og==",
      },
      body: getPayload({
        event,
        metadata: mt,
        userId,
      }),
    });
  };

  return { start, end };
};
