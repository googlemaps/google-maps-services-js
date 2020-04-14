Node.js Client for Google Maps Services
=======================================

[![npm](https://img.shields.io/npm/v/@googlemaps/google-maps-services-js.svg)](https://www.npmjs.com/package/@googlemaps/google-maps-services-js)
![CI](https://github.com/googlemaps/google-maps-services-js/workflows/CI/badge.svg)
![Release](https://github.com/googlemaps/google-maps-services-js/workflows/Release/badge.svg)
[![codecov](https://codecov.io/gh/googlemaps/google-maps-services-js/branch/master/graph/badge.svg)](https://codecov.io/gh/googlemaps/google-maps-services-js)
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/google-maps-services-js?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Discord](https://img.shields.io/discord/676948200904589322)](https://discord.gg/jRteCzP)


> This library is a refactor of a previous version published to [@google/maps](https://www.npmjs.com/package/@google/maps). It is now being published to [@googlemaps/google-maps-services-js](https://www.npmjs.com/package/@googlemaps/google-maps-services-js). Source for the old version is at the [@google/maps branch](https://github.com/googlemaps/google-maps-services-js/tree/%40google/maps).

Use Node.js? Want to [geocode][Geocoding API] something? Looking
for [directions][Directions API]?
This library brings the [Google Maps API Web Services] to your Node.js
application.

The Node.js Client for Google Maps Services is a Node.js Client library
for the following Google Maps APIs:

 - [Directions API]
 - [Distance Matrix API]
 - [Elevation API]
 - [Geocoding API]
 - [Places API]
 - [Roads API]
 - [Time Zone API]

Keep in mind that the same [terms and conditions](https://developers.google.com/maps/terms)
apply to usage of the APIs when they're accessed through this library.

## Attention!

This library is designed for server-side Node.js applications. Attempting to use it client-side, in either the browser or any other environment like React Native, may in some cases work, but mostly will not. Please refrain from reporting issues with these environments when attempting to use them, since **server-side Node.js applications is the only supported environment for this library**. For other environments, try the [Maps JavaScript API], which contains a comparable feature set, and is explicitly intended for use with client-side JavaScript.

## Quick Start

    $ npm install @googlemaps/google-maps-services-js

Below is a simple example calling the elevation method on the client class.

Import the Google Maps Client using Typescript and ES6 module:

```js
import {Client, Status} from "@googlemaps/google-maps-services-js";
```

Alternatively using JavaScript without ES6 module support:
```js
const {Client, Status} = require("@googlemaps/google-maps-services-js");
```

Now instantiate the client to make a call to one of the APIs.

```js
const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: "asdf",
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    if (r.data.status === Status.OK) {
      console.log(r.data.results[0].elevation);
    } else {
      console.log(r.data.error_message);
    }
  })
  .catch((e) => {
    console.log(e);
  });
```

## Reference Documentation

The generated reference documentationcan be found [here](https://googlemaps.github.io/google-maps-services-js/). The TypeScript types are the authoritative documenation for this library and may differ slightly from the descriptions.

## Developing

In order to run the end-to-end tests, you'll need to supply your API key via an
environment variable.

    $ export GOOGLE_MAPS_API_KEY=AIza-your-api-key
    $ npm test

## Migration

This section discusses the migration from [@google/maps](https://www.npmjs.com/package/@google/maps) to [@googlemaps/google-maps-services-js](https://www.npmjs.com/package/@googlemaps/google-maps-services-js) and the differences between the two.

> **Note**: The two libraries do not share any methods or interfaces.

The primary difference is `@google/maps` exposes a public method that takes individual parameters as arguments while `@googlemaps/google-maps-services-js` exposes methods that take `params`, `headers`, `body`, `instance`(see [Axios](https://github.com/axios/axios)). This allows direct access to the transport layer without the complexity that was inherent in the old library. Below are two examples.

### Old (`@google/maps`):
```js
const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here'
});

googleMapsClient
  .elevation({
    locations: {lat: 45, lng: -110}
  })
  .asPromise()
  .then(function(r) {
    console.log(r.json.results[0].elevation);
  })
  .catch(e => {
  console.log(e);
  });
```

### New (`@googlemaps/google-maps-services-js`):
```js
const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: process.env.GOOGLE_MAPS_API_KEY
    },
    timeout: 1000 // milliseconds
  }, axiosInstance)
  .then(r => {
    console.log(r.data.results[0].elevation);
  })
  .catch(e => {
    console.log(e);
  });
```

The primary differences are in the following table.

| Old        | New           |
| ------------- |:-------------:|
| Can provide params     | Can provide params, headers, instance, timeout (see [Axios Request Config](https://github.com/axios/axios#request-config)) |
| API key configured at Client | API key configured per method in params object|
| Retry is supported      | Retry is configurable via [axios-retry](https://www.npmjs.com/package/axios-retry) or [retry-axios](https://www.npmjs.com/package/retry-axios)      |
| Does not use promises by default | Promises are default     |
| Typings are in [@types/googlemaps](https://www.npmjs.com/package/@types/googlemaps) | Typings are included |
| Does not support keep alive | Supports keep alive |
| Does not support interceptors | Supports [interceptors](https://github.com/axios/axios#interceptors)|
| Does not support cancelalation | Supports [cancellation](https://github.com/axios/axios#cancellation) |


## Support

This library is community supported. We're comfortable enough with the
stability and features of the library that we want you to build real
production applications on it. We will try to support, through Stack
Overflow, the public surface of the library and maintain
backwards compatibility in the future; however, while the library is in
version 0.x, we reserve the right to make backwards-incompatible
changes. If we do remove some functionality (typically because better
functionality exists or if the feature proved infeasible), our intention
is to deprecate and give developers a year to update their code.

If you find a bug, or have a feature suggestion, please
[log an issue][issues]. If you'd like to contribute, please read
[How to Contribute][contrib].

[apikey]: https://developers.google.com/maps/faq#keysystem
[clientid]: https://developers.google.com/maps/documentation/business/webservices/auth

[Google Maps API Web Services]: https://developers.google.com/maps/apis-by-platform#web_service_apis
[Directions API]: https://developers.google.com/maps/documentation/directions/
[directions-key]: https://developers.google.com/maps/documentation/directions/get-api-key#key
[Distance Matrix API]: https://developers.google.com/maps/documentation/distancematrix/
[Elevation API]: https://developers.google.com/maps/documentation/elevation/
[Geocoding API]: https://developers.google.com/maps/documentation/geocoding/
[Time Zone API]: https://developers.google.com/maps/documentation/timezone/
[Roads API]: https://developers.google.com/maps/documentation/roads/
[Places API]: https://developers.google.com/places/web-service/

[issues]: https://github.com/googlemaps/google-maps-services-js/issues
[contrib]: https://github.com/googlemaps/google-maps-services-js/blob/master/CONTRIBUTING.md
[Maps JavaScript API]: https://developers.google.com/maps/documentation/javascript/
