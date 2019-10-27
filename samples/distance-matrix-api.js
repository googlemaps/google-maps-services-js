const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here',
  Promise: Promise
});


// * Making a distance matrix request.
const coordinates = {
  origins: {
    lat: '6.535578',
    long: '3.368550'
  },
  destinations: {
    lat: '6.535578',
    long: '3.368550'
  }
}
googleMapsClient.distanceMatrix({
    origins: `${coordinates.origins.lat},${coordinates.origins.long}`,
    destinations: `${coordinates.destinations.lat},${coordinates.destinations.long}`,
    mode: 'driving' //other mode include "walking" , "bicycling", "transit"
  }).asPromise().then((response) => {
    console.log(response)
  })
  .catch(err => console.log(err));