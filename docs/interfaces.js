/**
 * The client object returned by the {@link createClient}() method.
 *
 * @interface GoogleMapsClient
 */

/**
 * The object given to the {@link ResponseCallback}, containing the HTTP status
 * and headers, as well as the response JSON.
 *
 * @interface Response
 */
/**
 * The HTTP status.
 * @name  Response#status
 * @type {number}
 */
/**
 * The HTTP headers.
 * @name  Response#headers
 * @type {Object}
 */
/**
 * Deserialized JSON object for the API response.
 * @name  Response#json
 * @type {Object}
 */

/**
 * A callback function, which is called asynchronously when an API method
 * completes. The callback is given two arguments:
 *
 * <ul>
 *   <li> an error object, which is <code>null</code> unless there was an error.
 *   <li> a {@link Response} object, unless there was an error.
 * </ul>
 *
 * Note that API methods may also throw errors synchronously, if the query was
 * malformed.
 *
 * <pre>
 *   googleMapsClient.geocode({...}, function(err, response) {
 *     if (err) {
 *       // Handle error.
 *     } else {
 *       // Handle response.
 *     }
 *   });
 * </pre>
 *
 * <p>API methods don't require a callback function, if you use the Promise API.
 * See {@link RequestHandle#asPromise}().
 *
 * @interface ResponseCallback
 */


/**
 * A handle that allows cancelling a request, or obtaining a
 * <code>Promise</code>.
 *
 * @interface RequestHandle
 */

/**
 * Cancels the request. This is best-effort, and only has an effect if the
 * request is not already in-flight.
 *
 * <p>Note: Requests may be delayed due to rate-limiting. Also, requests that
 * fail with a retryable status code will be retried after a backoff delay.
 *
 * <p>If the request is successfully cancelled, the {@link ResponseCallback}
 * will be invoked with <code>new Error('cancelled')</code> as the first
 * argument. The promises will be rejected.
 *
 * <pre>
 *   var requestHandle = googleMapsClient.geocode({...}, callback);
 *   requestHandle.cancel();
 * </pre>
 *
 * @name  RequestHandle#cancel
 * @function
 */

/**
 * Returns the response as a
 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank"><code>Promise</code></a>.
 * This method is only available if you
 * supplied the Promise constructor to the <code>createClient()</code> method
 * when you constructed the client object.
 *
 * <pre>
 *   var googleMapsClient = require('@google/maps').createClient({Promise: Promise, ...});
 *   googleMapsClient.geocode({...}).asPromise()
 *       .then(function(response) {
 *         console.dir(response.json.results);
 *       });
 * </pre>
 *
 * @name  RequestHandle#asPromise
 * @function
 * @return {Promise<Response>}
 */


/**
 * A latitude, longitude pair. The API methods accept either:
 * <ul>
 *   <li> a two-item array of [latitude, longitude];
 *   <li> a comma-separated string;
 *   <li> an object with 'lat', 'lng' properties; or
 *   <li> an object with 'latitude', 'longitude' properties.
 * </ul>
 *
 * @interface LatLng
 */
