Node.js Client for Google Maps Services
=======================================

[![Build Status](https://travis-ci.org/googlemaps/google-maps-services-js.svg?branch=master)](https://travis-ci.org/googlemaps/google-maps-services-js)
[![npm](https://img.shields.io/npm/v/@googlemaps/google-maps-services-js.svg)](https://www.npmjs.com/package/@googlemapsgoogle-maps-services-js)
[![codecov](https://codecov.io/gh/googlemaps/google-maps-services-js/branch/master/graph/badge.svg)](https://codecov.io/gh/googlemaps/google-maps-services-js)
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/google-maps-services-js?color=green)

> This library is a refactor of a previous version published to [@google/maps](https://www.npmjs.com/package/@google/maps). It is now being published to [@googlemaps/google-maps-services-js](https://www.npmjs.com/package/@googlemaps/google-maps-services-js).

Use Node.js? Want to [geocode][Geocoding API] something? Looking
for [directions][Directions API]?
This library brings the [Google Maps API Web Services] to your Node.js
application. ![Analytics](https://maps-ga-beacon.appspot.com/UA-12846745-20/google-maps-services-js/readme?pixel)

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

    $ npm install @googlemaps/google-maps-services-node

Below is a simple example calling the elevation method on the client class.

```js
const maps = new require("@googlemaps/google-maps-services-js");

const client = new maps.Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: process.env.GOOGLE_MAPS_API_KEY
    },
    timeout: 1000 // milliseconds
  })
  .then(r => {
    console.log(r.data.results[0].elevation);
  })
  .catch(e => {
    console.log(e);
  });
```

## Developing

In order to run the end-to-end tests, you'll need to supply your API key via an
environment variable.

    $ export GOOGLE_MAPS_API_KEY=AIza-your-api-key
    $ npm test

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
