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

As discussed earlier - the ```userID``` should just be sent once when the user logs in, and not for every call to the telemetry package. Ideally, the ```disableTelemetry``` should also just be sent once at the same time. 
One way of checking if the user has disabled telemetry could be something like this: 
```
  const disabledTelemetry: boolean =
    process.env.SANITY_STUDIO_TELEMETRY === '1' || config.telemetry_disabled
``` 
This way, the user can either disable telemetry with an env var or per studio in the ```sanity.json``` as a config variable. 


### Notes on current state:
The CLI needs of the telemetry are different than the studio (using require vs import) and as of right now we have something working for the cli and studio but the codes are slightly different, they would need to be bundled and built so that we can have it work on both use cases (I think).

Branch for CLI: `add-timer-cli`

Branch for Studio: `add-timer-studio`
