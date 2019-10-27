const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here',
  Promise: Promise
});

// * Making an elevation request.
  googleMapsClient.elevation({
    locations:  ['39.7391536,-104.9847034'],  //latlong format
  }).asPromise().then((response) => {
    console.log(response.json.results)
  })
    .catch(err => console.log(err));


    //* Making an elevation-along-path request.
    googleMapsClient.elevationAlongPath({
      path: ['36.578581,-118.291994|36.23998,-116.83171'],  //latlong format 
      samples: 3
    }).asPromise().then((response) => {
      console.log(response.json.results)
    })
      .catch(err => console.log(err));
