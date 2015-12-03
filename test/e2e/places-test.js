var expect = require('chai').expect;

describe('places client library', function() {
  this.timeout(5000);

  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets places for a text search query', function(done) {
    googleMaps.places({
      query: 'restaurant',
      location: [-33.86746, 151.207090],
      radius: 100,
      minprice: 1,
      maxprice: 4
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.results[0]).to.have.property('name', 'Spice Temple');
      done();
    });
  });

  it('gets details for a place', function(done) {
    googleMaps.place({
      placeid: 'ChIJc6EceWquEmsRmBVAjzjXM-g'
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.result).to.have.property('name', 'Spice Temple');
      done();
    });
  });

  it('gets a places photo', function(done) {
    googleMaps.placesPhoto({
      photoreference: 'CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0',
      maxwidth: 100
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.headers['content-type']).to.equal('image/jpeg');
      done();
    });
  });

  it('gets autocomplete predictions for a query', function(done) {
    googleMaps.placesAutoComplete({
      input: 'pizza near New York'
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.predictions[0]).to.have.property(
          'description', 'pizza near New York, NY, United States');
      done();
    });
  });

});
