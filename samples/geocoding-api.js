const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here',
  Promise: Promise
});


//   * Making a geocode request.
googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  })
  .asPromise()
  .then((response) => {
    console.log(response.json.results);
  })
  .catch((err) => {
    console.log(err);
  });


// * Making a reverse geocode request.
googleMapsClient.reverseGeocode({
    latlng: '0.714224,-73.961452'  // latlong format
  })
  .asPromise()
  .then((response) => {
    console.log(response.json.results);
  })
  .catch((err) => {
    console.log(err);
  });