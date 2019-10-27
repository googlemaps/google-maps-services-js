const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here',
  Promise: Promise
});


// * Making a directions request.
googleMapsClient.directions({
  origin: 'Town Hall, Sydney, NSW',
  destination: 'Parramatta, NSW',
}).asPromise().then((response) => {
  console.log(response.json)
})
.catch(err => console.log(err));
