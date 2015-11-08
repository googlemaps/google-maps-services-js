var url = require('url');
var https = require('https');

exports.init = (key, requester) => {

  if (key && key.indexOf('AIza') != 0) {
    throw 'Invalid API key';
  }

  var _requester = (path, query, callback) => {

    callback = callback || () => {}
    query = query || {};
    if (key) {
      query.key = key;
    }

    requester = requester || ((url) =>
      https.get(url, (response) => {
        var data = '';
        response.on('data', (chunk) => (data += chunk));
        response.on('end', () => callback(null, JSON.parse(data)));
      }).on('error', (error) => callback(error, null)).end()
    );

    return requester(url.format({
      pathname: 'https://maps.googleapis.com' + path,
      query: query
    }));

  };

  var geocode = require('./geocode').inject(_requester);

  return {
    geocode: geocode.geocode,
    geocodeReverse: geocode.geocodeReverse
  };

};
