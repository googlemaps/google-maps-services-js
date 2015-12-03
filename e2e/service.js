// Shared Google Maps service, for use by end-to-end tests.
// Using the same service will enforce rate-limiting for the tests.

// NOTE: Set the GOOGLE_MAPS_API_KEY variable to run these tests.
module.exports = require('../lib/index').init({
  Promise: require('q').Promise
});
