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
 * completes. The callback is given either:
 *
 * <ul>
 *   <li> a {@link Response} object; OR
 *   <li> an error object from the underlying <code>http</code> library.
 * </ul>
 *
 * For example:
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
 * <p>Note that API methods may also throw errors synchronously, if the query was
 * malformed. This usually indicates a programming mistake.
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
 * Cancels the request.
 *
 * <p>The {@link ResponseCallback} will not be invoked, and promises will not be
 * settled. Use the {@link RequestHandle#finally} handler will still be called.
 *
 * <pre>
 *   var requestHandle = googleMapsClient.geocode({...}, callback);
 *   // later...
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
 * Registers a callback that will be called when the response is finished,
 * either successfully, or with an error, or having been cancelled. Use this to
 * clean up resources.
 *
 * <p>Returns this handle, for chaining.
 *
 * @name  RequestHandle#finally
 * @function
 * @param {function()} callback
 * @return {RequestHandle} this
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
