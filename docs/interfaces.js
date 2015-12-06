/**
 * The client object returned by the {@link init}() method.
 *
 * @interface GoogleMapsClient
 */

/**
 * @typedef {Object} Response
 * @property {number} status HTTP status.
 * @property {Object} headers HTTP headers.
 * @property {Object} json Deserialized JSON object for the API response.
 */

/**
 * The callback function triggered when an API call completes.
 *
 * @callback ResponseCallback
 * @param {*} error Error detail when an error occurs, otherwise null.
 * @param {Response} response Response object returned on success.
 */


/**
 * A handle that allows cancelling a request, or obtaining a {@code Promise}.
 *
 * @interface RequestHandle
 */

/**
 * Cancels the request. This is best-effort, and only has an effect if the
 * request is not already in-flight.
 *
 * Note: Requests may be delayed due to rate-limiting. Also, requests that fail
 * with a retryable status code will be retried after an backoff delay.
 *
 * If the request is successfully cancelled, the {@link ResponseCallback} will
 * be invoked with <code>new Error('cancelled')</code> as the first argument.
 * The promises will be rejected.
 *
 * @name  RequestHandle#cancel
 * @function
 */

/**
 * Returns the response as a Promise. This method is only available if you
 * supplied the Promise constructor to the {@link init}() method when you
 * constructed the {@link GoogleMapsClient}.
 *
 * @name  RequestHandle#asPromise
 * @function
 * @return {Promise<Response>}
 */


/**
 * A latitude/longitude pair - can be specified as a two-item array,
 * a comma-separated string, or an object with lat/lng or
 * latitude/longitude properties.
 * @typedef {(Object|number[]|string)} LatLng
 * @property {number} [lat] latitude.
 * @property {number} [lng] longitude.
 * @property {number} [latitude] latitude.
 * @property {number} [longitude] longitude.
 */
