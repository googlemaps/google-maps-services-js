var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * Makes a timezone request.
 *
 * @name GoogleMapsClient#timezone
 * @function
 * @param {Object} query
 * @param {LatLng} query.location
 * @param {Date|number} [query.timestamp]
 * @param {string} [query.language]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.timezone = {
	url: 'https://maps.googleapis.com/maps/api/timezone/json',
	validator: v.object({
	  location: utils.latLng,
	  timestamp: v.optional(utils.timeStamp),
	  language: v.optional(v.string),
	  retryOptions: v.optional(utils.retryOptions)
	})
}
