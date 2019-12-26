const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here',
  Promise: Promise
});


// * Making a timezone request.
googleMapsClient.timezone({
  location: '6.535578,3.368550',  //latlong format separated by ','
  timestamp: '1458000000',
}).asPromise().then((response) => {
  console.log(response.json)
})
.catch(err => console.log(err));
