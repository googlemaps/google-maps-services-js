const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here',
  Promise: Promise
});


// * Making a snap-to-roads request.
googleMapsClient.snapToRoads({
    path: [
      [60.170880, 24.942795],
      [60.170879, 24.942796],
      [60.170877, 24.942796]
    ],
  }).asPromise().then((response) => {
    console.log(response.json.snappedPoints)
  })
  .catch(err => console.log(err));


//  * Making a nearest roads request.
googleMapsClient.nearestRoads({
    points:  [
      [60.170880, 24.942795],
      [60.170879, 24.942796],
      [60.170877, 24.942796]
    ],
  }).asPromise().then((response) => {
    console.log(response.json.snappedPoints)
  })
  .catch(err => console.log(err));


/*
 * Makes a speed-limits request for a place ID. For speed-limits
 * requests using a path parameter, use the snappedSpeedLimits method.
 * Note: The Speed Limit service is only available to Google Maps APIs Premium Plan Client.
 */
googleMapsClient.speedLimits({
    placeId: [
      'ChIJ58xCoGlNFmsRUEZUbW7qABM',
      'ChIJ9RhaiGlNFmsR0IxAbW7qABM',
      'ChIJabjuhGlNFmsREIxAbW7qABM'
    ],
    units: 'MPH' // KPH
  }).asPromise().then((response) => {
    console.log(response)
  })
  .catch(err => console.log(err));


/*
 * Making a speed-limits request for a path.
 * Note: The Speed Limit service is only available to Google Maps APIs Premium Plan Client.
 */
googleMapsClient.snappedSpeedLimits({
    path: [
      [60.170880, 24.942795],
      [60.170879, 24.942796],
      [60.170877, 24.942796]
    ],
    units: 'MPH' // KPH
  }).asPromise().then((response) => {
    console.log(response)
  })
  .catch(err => console.log(err));