# Telemetry package

It is not published as an npm package yet. 

First run this in the cli: 
```
npm link telemetry
```

To import in your repository: 
``` 
const telemetryClient = require('telemetry')
```

Then use it where desired like this: 
```
 telemetryClient({
      event: trackingEvent,
      userId: currentSanityUser,
      telemetryDisabled: isTelemetryDisabled,
      metadata: {
        ... 
      },
    })
```
