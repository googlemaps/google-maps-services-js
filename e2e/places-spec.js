var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;

describe('places client library', function() {
  var googleMaps = require('./service');

  it('gets places for a text search query', function(done) {
    googleMaps.places({
      query: 'restaurant',
      location: [-33.86746, 151.207090],
      radius: 100,
      minprice: 1,
      maxprice: 4
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.results).toEqual(
          arrayContaining([
            objectContaining({
              name: 'Spice Temple'
            })
          ]));
    })
    .then(done, fail);
  });

  it('gets details for a place', function(done) {
    googleMaps.place({
      placeid: 'ChIJc6EceWquEmsRmBVAjzjXM-g'
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.result).toEqual(
          objectContaining({
            name: 'Spice Temple'
          }));
    })
    .then(done, fail);
  });

  it('gets a places photo', function(done) {
    googleMaps.placesPhoto({
      photoreference: 'CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0',
      maxwidth: 100
    })
    .asPromise()
    .then(function(response) {
      expect(response.headers['content-type']).toBe('image/jpeg');
    })
    .then(done, fail);
  });

  it('gets autocomplete predictions for a query', function(done) {
    googleMaps.placesAutoComplete({
      input: 'pizza near New York'
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.predictions).toEqual(
          arrayContaining([
            objectContaining({
              description: 'pizza near New York, NY, United States'
            })
          ]));
    })
    .then(done, fail);
  });

});
