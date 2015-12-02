Welcome to the reference docs for the [Node.js Client for Google Maps
Services](https://github.com/googlemaps/google-maps-services-js).

Quickstart
----------

Create a new client object by calling `init`:

```js
var config = {key: 'Add your API key here'};
var googlemaps = require('@google/maps').init(config);
```

All of the API methods are then available on the client object:

```
// Geocoding an address.
var query = {address: '1600 Amphitheatre Parkway, Mountain View, CA'};
googlemaps.geocode(query, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});

// Request directions via public transit.
var query = {
  origin: 'Sydney Town Hall',
  destination: 'Parramatta, NSW',
  mode: 'transit',
  departure_time: (new Date()).getTime()
};
googlemaps.directions(query, function(err, response) {
  if (!err) {
    console.log(response.json.routes);
  }
});
```

Each API method accepts two arguments, a `query` object containing each
of the parameters for the API, and a `callback` function which will run
on completion of the API call, and receives an `error` (with a null value
on success) and a `response` object.

Next Steps
----------

* Browse each of the API methods to the right for detail on each of
  their `query` argument's parameters.
* Detailed documentation on JSON responses can be found on the [Google
  Maps API Web Services site](https://developers.google.com/maps/documentation/webservices/).
