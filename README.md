[![npm](https://img.shields.io/npm/v/@googlemaps/google-maps-services-js)][npm-pkg]
![Release](https://github.com/googlemaps/google-maps-services-js/workflows/Release/badge.svg)
![Stable](https://img.shields.io/badge/stability-stable-green)
[![Tests/Build](https://github.com/googlemaps/google-maps-services-js/actions/workflows/test.yml/badge.svg)](https://github.com/googlemaps/google-maps-services-js/actions/workflows/test.yml)

[![codecov](https://codecov.io/gh/googlemaps/google-maps-services-js/branch/master/graph/badge.svg)](https://codecov.io/gh/googlemaps/google-maps-services-js)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

![Contributors](https://img.shields.io/github/contributors/googlemaps/google-maps-services-js?color=green)
[![License](https://img.shields.io/github/license/googlemaps/google-maps-services-js?color=blue)][license]
[![StackOverflow](https://img.shields.io/stackexchange/stackoverflow/t/google-maps?color=orange&label=google-maps&logo=stackoverflow)](https://stackoverflow.com/questions/tagged/google-maps)
[![Discord](https://img.shields.io/discord/676948200904589322?color=6A7EC2&logo=discord&logoColor=ffffff)][Discord server]

# Node.js Client for Google Maps Services

> [!IMPORTANT]
> 
> Some parts of this library are only compatible with [Legacy Services](https://developers.google.com/maps/legacy).
> Using the Legacy Services requires enabling each API on your Google Cloud project by following the direct links:
> [Places API (Legacy)](https://console.cloud.google.com/apis/library/places-backend.googleapis.com),
> [Directions API (Legacy)](https://console.cloud.google.com/apis/library/directions-backend.googleapis.com),
> [Distance Matrix API (Legacy)](https://console.cloud.google.com/apis/library/distance-matrix-backend.googleapis.com).
>
> The newer Google Maps APIs each provide their own npm-package:
>  - [`@googlemaps/places`](https://www.npmjs.com/package/@googlemaps/places)
>  - [`@googlemaps/routing`](https://www.npmjs.com/package/@googlemaps/routing)
>  - [`@googlemaps/maps-platform-datasets`](https://www.npmjs.com/package/@googlemaps/maps-platform-datasets)
>  - [`@googlemaps/addressvalidation`](https://www.npmjs.com/package/@googlemaps/addressvalidation)

## Description

This client library brings the following [Google Maps Web Services APIs] to your server-side Node.js applications:

- [Maps Static API]
- [Elevation API]
- [Geocoding API]
- [Roads API]
- [Time Zone API]

As well as the following legacy APIs:

- [Directions API (Legacy)][Directions API]
- [Places API (Legacy)][Places API]
- [Distance Matrix API (Legacy)][Distance Matrix API]

## Requirements

- [Sign up with Google Maps Platform]
- A Google Maps Platform [project] with the desired API(s) from the above list enabled
- An [API key] associated with the project above

## API Key Security

This client library is designed for use in server-side applications.

In either case, it is important to add [API key restrictions](https://developers.google.com/maps/api-security-best-practices#restricting-api-keys) to improve its security. Additional security measures, such as hiding your key
from version control, should also be put in place to further improve the security of your API key.

Check out the [API Security Best Practices](https://developers.google.com/maps/api-security-best-practices) guide to learn more.

> [!NOTE] **This library for server-side only**
> Attempting to use it client-side, in either the browser or any other environment like React Native, may in some cases work, but mostly will not. Please refrain from reporting issues with these environments when attempting to use them, since **server-side Node.js applications is the only supported environment for this library**.
> For other environments, try the [Maps JavaScript API], which contains a comparable feature set, and is explicitly intended for use with client-side JavaScript.

## Usage

    npm install @googlemaps/google-maps-services-js

Below is a simple example calling the elevation method on the client class.

Import the Google Maps Client using TypeScript and ES6 module:

```js
import {Client} from "@googlemaps/google-maps-services-js";
```

Alternatively using JavaScript without ES6 module support:
```js
const {Client} = require("@googlemaps/google-maps-services-js");
```

Now instantiate the client to make a call to one of the APIs.

```js
const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: process.env.MAPS_API_KEY,
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });
```

## Documentation

For more information, see the reference [documentation]. The TypeScript types are the authoritative documentation for this library and may differ slightly from the descriptions.

## Developing

In order to run the end-to-end tests, you'll need to supply your API key via an
environment variable.

    $ export MAPS_API_KEY=YOUR_API_KEY
    $ npm test

## Migration

This section discusses the migration from [@google/maps](https://npmjs.com/package/@google/maps) to [@googlemaps/google-maps-services-js][npm-pkg] and the differences between the two.

> **Note**: The two libraries do not share any methods or interfaces.

The primary difference is `@google/maps` exposes a public method that takes individual parameters as arguments while `@googlemaps/google-maps-services-js` exposes methods that take `params`, `headers`, `body`, `instance`(see [Axios](https://github.com/axios/axios)). This allows direct access to the transport layer without the complexity that was inherent in the old library. Below are two examples.

### Old (`@google/maps`)

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
      key: process.env.MAPS_API_KEY
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
| Retry is supported      | Retry is configurable via [axios-retry](https://npmjs.com/package/axios-retry) or [retry-axios](https://npmjs.com/package/retry-axios)      |
| Does not use promises by default | Promises are default     |
| Typings are in [@types/googlemaps](https://npmjs.com/package/@types/googlemaps) | Typings are included |
| Does not support keep alive | Supports keep alive |
| Does not support interceptors | Supports [interceptors](https://github.com/axios/axios#interceptors)|
| Does not support cancelalation | Supports [cancellation](https://github.com/axios/axios#cancellation) |

## Premium Plan Authentication

Authentication via client ID and URL signing secret is provided to support legacy applications that use the Google Maps Platform Premium Plan. The Google Maps Platform Premium Plan is no longer available for sign up or new customers. All new applications must use API keys.

```js
const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      client_id: process.env.GOOGLE_MAPS_CLIENT_ID,
      client_secret: process.env.GOOGLE_MAPS_CLIENT_SECRET
    },
    timeout: 1000 // milliseconds
  })
  .then(r => {
    console.log(r.data.results[0].elevation);
  })
  .catch(e => {
    console.log(e.response.data.error_message);
  });
```

## Contributing

Contributions are welcome and encouraged! If you'd like to contribute, send us a [pull request] and refer to our [code of conduct] and [contributing guide].

## Terms of Service

This library uses Google Maps Platform services. Use of Google Maps Platform services through this library is subject to the Google Maps Platform [Terms of Service].

This library is not a Google Maps Platform Core Service. Therefore, the Google Maps Platform Terms of Service (e.g. Technical Support Services, Service Level Agreements, and Deprecation Policy) do not apply to the code in this library.


### European Economic Area (EEA) developers

If your billing address is in the European Economic Area, effective on 8 July 2025, the [Google Maps Platform EEA Terms of Service](https://cloud.google.com/terms/maps-platform/eea) will apply to your use of the Services. Functionality varies by region. [Learn more](https://developers.google.com/maps/comms/eea/faq).

## Support

This library is offered via an open source [license]. It is not governed by the Google Maps Platform Support [Technical Support Services Guidelines, the SLA, or the [Deprecation Policy]. However, any Google Maps Platform services used by the library remain subject to the Google Maps Platform Terms of Service.

This library adheres to [semantic versioning] to indicate when backwards-incompatible changes are introduced. Accordingly, while the library is in version 0.x, backwards-incompatible changes may be introduced at any time.

If you find a bug, or have a feature request, please [file an issue] on GitHub. If you would like to get answers to technical questions from other Google Maps Platform developers, ask through one of our [developer community channels]. If you'd like to contribute, please check the [contributing guide].

You can also discuss this library on our [Discord server].

[Google Maps Platform Web Services APIs]: https://developers.google.com/maps/apis-by-platform#web_service_apis
[Maps Static API]: https://developers.google.com/maps/documentation/maps-static
[Directions API]: https://developers.google.com/maps/documentation/directions
[directions-key]: https://developers.google.com/maps/documentation/directions/get-api-key#key
[Distance Matrix API]: https://developers.google.com/maps/documentation/distancematrix
[Elevation API]: https://developers.google.com/maps/documentation/elevation
[Geocoding API]: https://developers.google.com/maps/documentation/geocoding
[Time Zone API]: https://developers.google.com/maps/documentation/timezone
[Roads API]: https://developers.google.com/maps/documentation/roads
[Places API]: https://developers.google.com/places/web-service
[Maps JavaScript API]: https://developers.google.com/maps/documentation/javascript

[API key]: https://developers.google.com/maps/documentation/javascript/get-api-key
[documentation]: https://googlemaps.github.io/google-maps-services-js
[npm-pkg]: https://npmjs.com/package/@googlemaps/google-maps-services-js

[code of conduct]: ?tab=coc-ov-file#readme
[contributing guide]: CONTRIBUTING.md
[Deprecation Policy]: https://cloud.google.com/maps-platform/terms
[developer community channels]: https://developers.google.com/maps/developer-community
[Discord server]: https://discord.gg/hYsWbmk
[file an issue]: https://github.com/googlemaps/google-maps-services-js/issues/new/choose
[license]: LICENSE
[pull request]: https://github.com/googlemaps/google-maps-services-js/compare
[project]: https://developers.google.com/maps/documentation/javascript/cloud-setup#enabling-apis
[semantic versioning]: https://semver.org
[Sign up with Google Maps Platform]: https://console.cloud.google.com/google/maps-apis/start
[similar inquiry]: https://github.com/googlemaps/google-maps-services-js/issues
[SLA]: https://cloud.google.com/maps-platform/terms/sla
[Technical Support Services Guidelines]: https://cloud.google.com/maps-platform/terms/tssg
[Terms of Service]: https://cloud.google.com/maps-platform/terms
