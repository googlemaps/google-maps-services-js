var url = require('url');
var https = require('https');

exports.init = (key, makeUrlRequest) => {

  if (key && key.indexOf('AIza') != 0) {
    throw 'Invalid API key';
  }

  var makeApiCall = (path, query, callback) => {

    callback = callback || () => {}
    query = query || {};
    if (key) {
      query.key = key;
    }

    makeUrlRequest = makeUrlRequest || ((url) =>
      https.get(url, (response) => {
        var data = '';
        response.on('data', (chunk) => {data += chunk;});
        response.on('end', () => callback(null, JSON.parse(data)));
      }).on('error', (error) => callback(error, null)).end()
    );

    return makeUrlRequest(url.format({
      pathname: 'https://maps.googleapis.com' + path,
      query: query
    }));

  };

  var geocode = require('./geocode').inject(makeApiCall);

  return {
    geocode: geocode.geocode,
    reverseGeocode: geocode.reverseGeocode
  };

};
