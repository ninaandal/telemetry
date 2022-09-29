interface TelemetryPayload {
  userId: string;
  event: TELEMETRY_EVENT | string;
  metadata?: Record<string, string>;
  telemetryDisabled: boolean; //If the user has disabled telemetry, this is true
}

enum TELEMETRY_EVENT {
  BUTTON_CLICK = "buttonClick",
}

const PROXY_ENDPOINT = "https://www.sanity.io/intake/dp/v1/track";

const getPayload = ({ event, metadata = {}, userId }: TelemetryPayload) =>
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

const telemetryClient = ({
  event,
  metadata,
  userId,
  telemetryDisabled,
}: TelemetryPayload) => {
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

module.exports = telemetryClient;
