Welcome to the reference docs for the [Node.js Client for Google Maps
Services](https://github.com/googlemaps/google-maps-services-js).


Quick Start
-----------

Create a new client object by calling
[`createClient()`](module-@google_maps.html#.createClient):

```js
var googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here'
});
```

Make requests to the Google Maps APIs by calling methods on the
[client object](GoogleMapsClient.html):

```
// Geocode an address.
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});
```


Initializing the client library
-------------------------------

You can specify a number of options to the
[`createClient()`](module-@google_maps.html#.createClient)
function:
* Specify an API key or a client ID (required)
* Customize the rate limit on requests (default limit is 10 requests per second)
* Specify a Promise constructor, so that you can receive responses via the
  [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  API. This leaves you free to choose your Promise implementation.


Making API requests
-------------------

Each [API method](GoogleMapsClient.html) accepts two arguments:
* a `query` object; and
* a [`callback` function](ResponseCallback.html). The callback is called
  with either the JSON response object or an error object.

Each API method returns a [`RequestHandle`](RequestHandle.html). The handle can
be used to cancel the request, or to obtain a Promise for the response.

NOTE: Promises are only available if you supply a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
constructor to the [`createClient()`](module-@google_maps.html#.createClient) method.


Learn More
----------

* Browse the documentation for each of the
  [API methods](GoogleMapsClient.html)
* Detailed documentation on the underlying web services and the JSON responses can be found on the
  [Google Maps API Web Services site](https://developers.google.com/maps/documentation/webservices/).
* Read the source code on
  [github](https://github.com/googlemaps/google-maps-services-js).
