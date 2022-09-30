// interface TelemetryPayload {
//   userId: string;
//   event: TELEMETRY_EVENT | string;
//   metadata?: Record<string, string>;
//   telemetryDisabled: boolean; //If the user has disabled telemetry, this is true
// }

// enum TELEMETRY_EVENT {
//   BUTTON_CLICK = "buttonClick",
// }

const PROXY_ENDPOINT = "https://www.sanity.io/intake/dp/v1/track";

// const getPayload = ({ event, metadata = {}, userId }: TelemetryPayload) =>
//   JSON.stringify({
//     userId: userId,
//     event: "studio-telemetry",
//     properties: {
//       eventAction: event,
//       ...metadata,
//     },
//     context: {
//       library: {
//         name: "http",
//       },
//     },
//     timestamp: new Date().toISOString(),
//   });

// const telemetryClient = ({
//   event,
//   metadata,
//   userId,
//   telemetryDisabled,
// }: TelemetryPayload) => {
//   //Turn the tracking off
//   if (!telemetryDisabled) {
//     fetch(PROXY_ENDPOINT, {
//       method: "POST", // or 'PUT'
//       headers: {
//         authorization: "Basic MXBiSk5jRUpIV09lM0R2ZFB5SXA3WERJQ0o0Og==",
//       },
//       body: getPayload({ event, metadata, userId, telemetryDisabled }),
//     });
//   }
// };

var telemetry = function () {
  this.id = Math.random();
  this.timer = {
    start: null,
    end: null,
  };

  this.startTimer = function () {
    this.timer.start = performance.now();
  };

  this.endTimer = function () {
    this.timer.end = performance.now();
    console.log(
      `Call to doSomething took ${
        this.timer.end - this.timer.start
      } milliseconds.`
    );
  };

  const time = this.timer.end - this.timer.start;

  if (this.timer.start !== null && this.timer.end !== null) {
    console.log(time);
    fetch(PROXY_ENDPOINT, {
      method: "POST", // or 'PUT'
      headers: {
        authorization: "Basic MXBiSk5jRUpIV09lM0R2ZFB5SXA3WERJQ0o0Og==",
      },
      body: JSON.stringify({
        event: "studio-telemetry",
        properties: {
          eventAction: "timer-event",
          metadata: { time },
        },
        context: {
          library: {
            name: "http",
          },
        },
        timestamp: new Date().toISOString(),
      }),
    });
  }
};

module.exports = telemetry;
