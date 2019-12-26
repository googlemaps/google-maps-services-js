const googleMapsClient = require('@google/maps').createClient({
  key:  'your API key here',
  Promise: Promise
});


/*
* A Find Place request takes a text input, and returns a place.
 * The text input can be any kind of Places data, for example,
 * a name, address, or phone number.
*/
googleMapsClient.findPlace({
  input: 'McDonald\'s',
  inputtype: 'textquery',
  language: 'en',
  fields: [
    'formatted_address', 'geometry', 'geometry/location', 'geometry/location/lat',
    'geometry/location/lng', 'geometry/viewport', 'geometry/viewport/northeast',
    'geometry/viewport/northeast/lat', 'geometry/viewport/northeast/lng',
    'geometry/viewport/southwest', 'geometry/viewport/southwest/lat',
    'geometry/viewport/southwest/lng', 'icon', 'id', 'name',
    'permanently_closed', 'photos', 'place_id', 'types',
    'opening_hours', 'price_level', 'rating', 'plus_code'
  ]
}).asPromise().then((response) => {
console.log(response.json)
})
.catch(err => console.log(err));


// * Making a nearby places request.
googleMapsClient.placesNearby({
    language: 'en',
    location: [-33.865, 151.038],
    radius: 5000,
    minprice: 1,
    maxprice: 4,
    opennow: true,
    type: 'restaurant'
  }).asPromise().then((response) => {
    console.log(response.json)
  })
  .catch(err => console.log(err));


// * Making a place photos request.
googleMapsClient.placesPhoto({
    photoreference: 'CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0',
    maxwidth: 100,
    maxheight: 100,
  }).asPromise().then((response) => {
    console.log(response)
  })
  .catch(err => console.log(err));


// * Making a place detail request.
googleMapsClient.place({
  placeid: 'ChIJc6EceWquEmsRmBVAjzjXM-g',
  language: 'fr'
}).asPromise().then((response) => {
  console.log(response.json)
})
.catch(err => console.log(err));


// * Making a places request.
googleMapsClient.places({
  query: 'restaurant',
  language: 'en',
  location: [-33.86746, 151.207090],
  radius: 5000
}).asPromise().then((response) => {
  console.log(response.json)
})
.catch(err => console.log(err));


// * Making a places autocomplete request.
googleMapsClient.placesAutoComplete({
  input: 'pizza',
  language: 'en',
  location: [40.724, -74.013],
  radius: 5000,
  components: { country: 'us' }
}).asPromise().then((response) => {
  console.log(response.json.predictions)
})
.catch(err => console.log(err));


// * Making a places query autocomplete request.
googleMapsClient.placesQueryAutoComplete({
    input: 'pizza near New York',
    language: 'en',
    location: [40.724, -74.013],
    radius: 5000
}).asPromise().then((response) => {
  console.log(response.json)
})
.catch(err => console.log(err));