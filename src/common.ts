export interface RequestParams {
  /**
   * You must include an API key with every API request. We strongly recommend that you restrict your API key.
   * Restrictions provide added security and help ensure only authorized requests are made with your API key.
   *
   * There are two restrictions. You should set both:
   *
   * Application restriction:  Limits usage of the API key to either websites (HTTP referrers),
   * web servers (IP addresses), or mobile apps (Android apps or iOS apps). You can select only one
   * restriction from this category, based on the platform of the API or SDK (see GMP APIs by Platform).
   *
   * API restriction: Limits usage of the API key to one or more APIs or SDKs. Requests to an API or SDK
   * associated with the API key will be processed. Requests to an API or SDK not associated with the API
   * key will fail.
   */
  key: string;
}

export interface ResponseData {
  /** contains metadata on the request. See Status Codes below. */
  status: Status;
  /**
   * When the top-level status code is other than `OK`, this field contains more detailed information
   * about the reasons behind the given status code.
   */
  error_message: string;
  /** may contain a set of attributions about this listing which must be displayed to the user (some listings may not have attribution). */
  html_attributions?: string[];
  /**
   * contains a token that can be used to return up to 20 additional results.
   * A `next_page_token` will not be returned if there are no additional results to display.
   * The maximum number of results that can be returned is 60.
   * There is a short delay between when a `next_page_token` is issued, and when it will become valid.
   */
  next_page_token?: string;
}

export type Status =
  /** indicates the response contains a valid result. */
  | "OK"
  /** indicates that the provided request was invalid. */
  | "INVALID_REQUEST"
  /**
   * indicates that too many `waypoints` were provided in the request. For applications using the Directions API as a web service,
   * or the [directions service in the Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/directions),
   * the maximum allowed number of `waypoints` is 23, plus the origin and destination.
   */
  | "MAX_WAYPOINTS_EXCEEDED"
  /**
   * indicates the requested route is too long and cannot be processed.
   * This error occurs when more complex directions are returned.
   * Try reducing the number of waypoints, turns, or instructions.
   */
  | "MAX_ROUTE_LENGTH_EXCEEDED "
  /**
   * indicates any of the following:
   *  - The API key is missing or invalid.
   *  - Billing has not been enabled on your account.
   *  - A self-imposed usage cap has been exceeded.
   *  - The provided method of payment is no longer valid (for example, a credit card has expired).
   * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.
   */
  | "OVER_DAILY_LIMIT"
  /** indicates the service has received too many requests from your application within the allowed time period. */
  | "OVER_QUERY_LIMIT"
  /** indicates that the service denied use of the Distance Matrix service by your application. */
  | "REQUEST_DENIED"
  /** indicates a Distance Matrix request could not be processed due to a server error. The request may succeed if you try again. */
  | "UNKNOWN_ERROR"
  /** indicates that the request was successful but returned no results. */
  | "ZERO_RESULTS";

export interface PlacePhoto {
  /** a string used to identify the photo when you perform a Photo request. */
  photo_reference: string;
  /** the maximum height of the image. */
  height: number;
  /** the maximum width of the image. */
  width: number;
  /** contains any required attributions. This field will always be present, but may be empty. */
  html_attributions: string[];
}

export type PlaceIdScope =
  /**
   * The place ID is recognised by your application only.
   * This is because your application added the place, and the place has not yet passed the moderation process.
   */
  | "APP"
  /** The place ID is available to other applications and on Google Maps. */
  | "GOOGLE";

export interface AlternativePlaceId {
  /**
   * The most likely reason for a place to have an alternative place ID is if your application adds a place and receives
   * an application-scoped place ID, then later receives a Google-scoped place ID after passing the moderation process.
   */
  place_id: string;
  /**
   * The scope of an alternative place ID will always be `APP`,
   * indicating that the alternative place ID is recognised by your application only.
   */
  scope: "APP";
}

export enum PlaceInputType {
  textQuery = "textquery",
  phoneNumber = "phonenumber"
}

/**
 * Table 1: Types supported in place search and addition
 *
 * You can use the following values in the types filter for place searches and when adding a place.
 *
 * @see https://developers.google.com/places/web-service/supported_types#table1
 */
export type PlaceType1 =
  | "accounting"
  | "airport"
  | "amusement_park"
  | "aquarium"
  | "art_gallery"
  | "atm"
  | "bakery"
  | "bank"
  | "bar"
  | "beauty_salon"
  | "bicycle_store"
  | "book_store"
  | "bowling_alley"
  | "bus_station"
  | "cafe"
  | "campground"
  | "car_dealer"
  | "car_rental"
  | "car_repair"
  | "car_wash"
  | "casino"
  | "cemetery"
  | "church"
  | "city_hall"
  | "clothing_store"
  | "convenience_store"
  | "courthouse"
  | "dentist"
  | "department_store"
  | "doctor"
  | "electrician"
  | "electronics_store"
  | "embassy"
  | "fire_station"
  | "florist"
  | "funeral_home"
  | "furniture_store"
  | "gas_station"
  | "gym"
  | "hair_care"
  | "hardware_store"
  | "hindu_temple"
  | "home_goods_store"
  | "hospital"
  | "insurance_agency"
  | "jewelry_store"
  | "laundry"
  | "lawyer"
  | "library"
  | "liquor_store"
  | "local_government_office"
  | "locksmith"
  | "lodging"
  | "meal_delivery"
  | "meal_takeaway"
  | "mosque"
  | "movie_rental"
  | "movie_theater"
  | "moving_company"
  | "museum"
  | "night_club"
  | "painter"
  | "park"
  | "parking"
  | "pet_store"
  | "pharmacy"
  | "physiotherapist"
  | "plumber"
  | "police"
  | "post_office"
  | "real_estate_agency"
  | "restaurant"
  | "roofing_contractor"
  | "rv_park"
  | "school"
  | "shoe_store"
  | "shopping_mall"
  | "spa"
  | "stadium"
  | "storage"
  | "store"
  | "subway_station"
  | "supermarket"
  | "synagogue"
  | "taxi_stand"
  | "train_station"
  | "transit_station"
  | "travel_agency"
  | "veterinary_care"
  | "zoo";

/**
 * Table 2: Additional types returned by the Places service
 *
 * The following types may be returned in the results of a place search, in addition to the types in table 1 above.
 * For more details on these types, refer to [Address Types](https://developers.google.com/maps/documentation/geocoding/intro#Types)
 * in Geocoding Responses.
 *
 * @see https://developers.google.com/places/web-service/supported_types#table2
 */
export type PlaceType2 =
  | "administrative_area_level_1"
  | "administrative_area_level_2"
  | "administrative_area_level_3"
  | "administrative_area_level_4"
  | "administrative_area_level_5"
  | "colloquial_area"
  | "country"
  | "establishment"
  | "finance"
  | "floor"
  | "food"
  | "general_contractor"
  | "geocode"
  | "health"
  | "intersection"
  | "locality"
  | "natural_feature"
  | "neighborhood"
  | "place_of_worship"
  | "political"
  | "point_of_interest"
  | "post_box"
  | "postal_code"
  | "postal_code_prefix"
  | "postal_code_suffix"
  | "postal_town"
  | "premise"
  | "room"
  | "route"
  | "street_address"
  | "street_number"
  | "sublocality"
  | "sublocality_level_4"
  | "sublocality_level_5"
  | "sublocality_level_3"
  | "sublocality_level_2"
  | "sublocality_level_1"
  | "subpremise";

export interface PlaceReview {
  /**
   * contains a collection of `AspectRating` objects, each of which provides a rating of a single attribute of the establishment.
   * The first object in the collection is considered the primary aspect.
   */
  aspects: AspectRating[];
  /** the name of the user who submitted the review. Anonymous reviews are attributed to "A Google user". */
  author_name: string;
  /** the URL to the user's Google Maps Local Guides profile, if available. */
  author_url?: string;
  /**
   * an IETF language code indicating the language used in the user's review.
   * This field contains the main language tag only, and not the secondary tag indicating country or region.
   * For example, all the English reviews are tagged as 'en', and not 'en-AU' or 'en-UK' and so on.
   */
  language: string;
  /** the user's overall rating for this place. This is a whole number, ranging from 1 to 5. */
  rating: number;
  /**
   * the user's review. When reviewing a location with Google Places, text reviews are considered optional.
   * Therefore, this field may by empty. Note that this field may include simple HTML markup.
   * For example, the entity reference `&amp;` may represent an ampersand character.
   */
  text: string;
  /** the time that the review was submitted, measured in the number of seconds since since midnight, January 1, 1970 UTC. */
  time: string;
}

export interface AspectRating {
  /** the name of the aspect that is being rated. */
  type: AspectRatingType;
  /** the user's rating for this particular aspect, from 0 to 3. */
  rating: number;
}

export type AspectRatingType =
  | "appeal"
  | "atmosphere"
  | "decor"
  | "facilities"
  | "food"
  | "overall"
  | "quality"
  | "service";

export type Place = Partial<PlaceData>;

interface PlaceData {
  /**
   * is an array containing the separate components applicable to this address.
   *
   * Note the following facts about the `address_components[]` array:
   *  - The array of address components may contain more components than the `formatted_address`.
   *  - The array does not necessarily include all the political entities that contain an address,
   *    apart from those included in the `formatted_address`. To retrieve all the political entities
   *    that contain a specific address, you should use reverse geocoding, passing the latitude/longitude
   *    of the address as a parameter to the request.
   *  - The format of the response is not guaranteed to remain the same between requests.
   *    In particular, the number of `address_components` varies based on the address requested
   *    and can change over time for the same address. A component can change position in the array.
   *    The type of the component can change. A particular component may be missing in a later response.
   */
  address_components: AddressComponent[];
  /**
   * is a string containing the human-readable address of this place.
   *
   * Often this address is equivalent to the postal address. Note that some countries, such as the United Kingdom,
   * do not allow distribution of true postal addresses due to licensing restrictions.
   *
   * The formatted address is logically composed of one or more address components.
   * For example, the address "111 8th Avenue, New York, NY" consists of the following components: "111"
   * (the street number), "8th Avenue" (the route), "New York" (the city) and "NY" (the US state).
   *
   * Do not parse the formatted address programmatically. Instead you should use the individual address components,
   * which the API response includes in addition to the formatted address field.
   */
  formatted_address: string;
  /**
   * contains the place's phone number in its local format.
   * For example, the `formatted_phone_number` for Google's Sydney, Australia office is `(02) 9374 4000`.
   */
  formatted_phone_number: string;
  /** is a representation of the place's address in the [adr microformat](http://microformats.org/wiki/adr). */
  adr_address: string;
  /**
   * contains the following information:
   *  - `location`: contains the geocoded latitude,longitude value for this place.
   *  - `viewport`: contains the preferred viewport when displaying this place on a map as a `LatLngBounds` if it is known.
   */
  geometry: AddressGeometry;
  /**
   * is an encoded location reference, derived from latitude and longitude coordinates, that represents an area:
   * 1/8000th of a degree by 1/8000th of a degree (about 14m x 14m at the equator) or smaller.
   * Plus codes can be used as a replacement for street addresses in places where they do not exist
   * (where buildings are not numbered or streets are not named).
   *
   * The plus code is formatted as a global code and a compound code:
   *  - `global_code` is a 4 character area code and 6 character or longer local code (849VCWC8+R9).
   *  - `compound_code` is a 6 character or longer local code with an explicit location (CWC8+R9, Mountain View, CA, USA).
   *
   * Typically, both the global code and compound code are returned.
   * However, if the result is in a remote location (for example, an ocean or desert) only the global code may be returned.
   *
   * @see [Open Location Code](https://en.wikipedia.org/wiki/Open_Location_Code)
   * @see [plus codes](https://plus.codes/)
   */
  plus_code: PlusCode;
  /** contains the URL of a suggested icon which may be displayed to the user when indicating this result on a map. */
  icon: string;
  /**
   * contains the place's phone number in international format.
   * International format includes the country code, and is prefixed with the plus (+) sign.
   * For example, the `international_phone_number` for Google's Sydney, Australia office is `+61 2 9374 4000`.
   */
  international_phone_number: string;
  /**
   * contains the human-readable name for the returned result.
   * For establishment results, this is usually the canonicalized business name.
   */
  name: string;
  /** place opening hours. */
  opening_hours: OpeningHours;
  /**
   * is a boolean flag indicating whether the place has permanently shut down (value `true`).
   * If the place is not permanently closed, the flag is absent from the response.
   */
  permanently_closed: boolean;
  /**
   * an array of photo objects, each containing a reference to an image.
   * A Place Details request may return up to ten photos.
   * More information about place photos and how you can use the images in your application can be found in the Place Photos documentation.
   */
  photos: PlacePhoto[];
  /**
   * A textual identifier that uniquely identifies a place.
   * To retrieve information about the place, pass this identifier in the `placeId` field of a Places API request.
   */
  place_id: string;
  /**
   * The price level of the place, on a scale of 0 to 4.
   * The exact amount indicated by a specific value will vary from region to region.
   *
   * Price levels are interpreted as follows:
   *  - `0`: Free
   *  - `1`: Inexpensive
   *  - `2`: Moderate
   *  - `3`: Expensive
   *  - `4`: Very Expensive
   */
  price_level: number;
  /** contains the place's rating, from 1.0 to 5.0, based on aggregated user reviews. */
  rating: number;
  /**
   * a JSON array of up to five reviews. If a `language` parameter was specified in the Place Details request,
   * the Places Service will bias the results to prefer reviews written in that language.
   */
  reviews: PlaceReview[];
  /**
   * contains an array of feature types describing the given result.
   * XML responses include multiple `<type>` elements if more than one type is assigned to the result.
   */
  types: AddressType[];
  /**
   * contains the URL of the official Google page for this place.
   * This will be the Google-owned page that contains the best available information about the place.
   * Applications must link to or embed this page on any screen that shows detailed results about the place to the user.
   */
  url: string;
  /**
   * contains the number of minutes this place’s current timezone is offset from UTC.
   * For example, for places in Sydney, Australia during daylight saving time this would be 660 (+11 hours from UTC),
   * and for places in California outside of daylight saving time this would be -480 (-8 hours from UTC).
   */
  utc_offset: number;
  /**
   * lists a simplified address for the place, including the street name, street number, and locality,
   * but not the province/state, postal code, or country. For example, Google's Sydney, Australia office
   * has a `vicinity` value of `48 Pirrama Road, Pyrmont`.
   */
  vicinity: string;
  /** lists the authoritative website for this place, such as a business' homepage. */
  website: string;
}

export type LatLngArray = [number, number];

export type LatLngString = string;

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface LatLngLiteralVerbose {
  latitude: number;
  longitude: number;
}

/**
 * A latitude, longitude pair. The API methods accept either:
 *  - a two-item array of [latitude, longitude];
 *  - a comma-separated string;
 *  - an object with 'lat', 'lng' properties; or
 *  - an object with 'latitude', 'longitude' properties.
 */
export type LatLng =
  | LatLngArray
  | LatLngString
  | LatLngLiteral
  | LatLngLiteralVerbose;

/** The bounds parameter defines the latitude/longitude coordinates of the southwest and northeast corners of this bounding box. */
export interface LatLngBounds {
  northeast: LatLngLiteral;
  southwest: LatLngLiteral;
}

/**
 * By default the API will attempt to load the most appropriate language based on the users location or browser settings.
 * Some APIs allow you to explicitly set a language when you make a request
 *
 * @see https://developers.google.com/maps/faq#languagesupport
 */
export type Language =
  /** Arabic */
  | "ar"
  /** Belarusian */
  | "be"
  /** Bulgarian */
  | "bg"
  /** Bengali */
  | "bn"
  /** Catalan */
  | "ca"
  /** Czech */
  | "cs"
  /** Danish */
  | "da"
  /** German */
  | "de"
  /** Greek */
  | "el"
  /** English */
  | "en"
  /** English (Australian) */
  | "en-Au"
  /** English (Great Britain) */
  | "en-GB"
  /** Spanish */
  | "es"
  /** Basque */
  | "eu"
  /** Farsi */
  | "fa"
  /** Finnish */
  | "fi"
  /** Filipino */
  | "fil"
  /** French */
  | "fr"
  /** Galician */
  | "gl"
  /** Gujarati */
  | "gu"
  /** Hindi */
  | "hi"
  /** Croatian */
  | "hr"
  /** Hungarian */
  | "hu"
  /** Indonesian */
  | "id"
  /** Italian */
  | "it"
  /** Hebrew */
  | "iw"
  /** Japanese */
  | "ja"
  /** Kazakh */
  | "kk"
  /** Kannada */
  | "kn"
  /** Korean */
  | "ko"
  /** Kyrgyz */
  | "ky"
  /** Lithuanian */
  | "lt"
  /** Latvian */
  | "lv"
  /** Macedonian */
  | "mk"
  /** Malayalam */
  | "ml"
  /** Marathi */
  | "mr"
  /** Burmese */
  | "my"
  /** Dutch */
  | "nl"
  /** Norwegian */
  | "no"
  /** Punjabi */
  | "pa"
  /** Polish */
  | "pl"
  /** Portuguese */
  | "pt"
  /** Portuguese (Brazil) */
  | "pt-BR"
  /** Portuguese (Portugal) */
  | "pt-PT"
  /** Romanian */
  | "ro"
  /** Russian */
  | "ru"
  /** Slovak */
  | "sk"
  /** Slovenian */
  | "sl"
  /** Albanian */
  | "sq"
  /** Serbian */
  | "sr"
  /** Swedish */
  | "sv"
  /** Tamil */
  | "ta"
  /** Telugu */
  | "te"
  /** Thai */
  | "th"
  /** Tagalog */
  | "tl"
  /** Turkish */
  | "tr"
  /** Ukrainian */
  | "uk"
  /** Uzbek */
  | "uz"
  /** Vietnamese */
  | "vi"
  /** Chinese (Simlified) */
  | "zh-CN"
  /** Chinese (Traditional) */
  | "zh-TW";

/**
 * When you calculate directions, you may specify the transportation mode to use.
 * By default, directions are calculated as `driving` directions.
 *
 * **Note:** Both walking and bicycling directions may sometimes not include clear pedestrian or bicycling paths,
 * so these directions will return warnings in the returned result which you must display to the user.
 */
export type TravelMode =
  /** (default) indicates standard driving directions using the road network. */
  | "driving"
  /** requests walking directions via pedestrian paths & sidewalks (where available). */
  | "walking"
  /** requests bicycling directions via bicycle paths & preferred streets (where available). */
  | "bicycling"
  /**
   * requests directions via public transit routes (where available).
   * If you set the mode to transit, you can optionally specify either a departure_time or an arrival_time.
   * If neither time is specified, the departure_time defaults to now (that is, the departure time defaults to the current time).
   * You can also optionally include a transit_mode and/or a transit_routing_preference.
   */
  | "transit";

export type TravelRestriction =
  /** indicates that the calculated route should avoid toll roads/bridges. */
  | "tolls"
  /** indicates that the calculated route should avoid highways. */
  | "highways"
  /** indicates that the calculated route should avoid ferries. */
  | "ferries"
  /**
   * indicates that the calculated route should avoid indoor steps for walking and transit directions.
   * Only requests that include an API key or a Google Maps APIs Premium Plan client ID will receive indoor steps by default.
   */
  | "indoor";

/**
 * Directions results contain text within distance fields that may be displayed to the user to indicate the distance of
 * a particular "step" of the route. By default, this text uses the unit system of the origin's country or region.
 */
export type UnitSystem =
  /** specifies usage of the metric system. Textual distances are returned using kilometers and meters. */
  | "metric"
  /** specifies usage of the Imperial (English) system. Textual distances are returned using miles and feet. */
  | "imperial";

export type TrafficModel =
  /**
   * indicates that the returned `duration_in_traffic` should be the best estimate of travel time given what is known about
   * both historical traffic conditions and live traffic. Live traffic becomes more important the closer the `departure_time` is to now.
   */
  | "best_guess"
  /**
   * indicates that the returned `duration_in_traffic` should be longer than the actual travel time on most days,
   * though occasional days with particularly bad traffic conditions may exceed this value.
   */
  | "pessimistic"
  /**
   * indicates that the returned `duration_in_traffic` should be shorter than the actual travel time on most days,
   * though occasional days with particularly good traffic conditions may be faster than this value.
   */
  | "optimistic";

export type TransitMode =
  /** indicates that the calculated route should prefer travel by bus. */
  | "bus"
  /** indicates that the calculated route should prefer travel by subway. */
  | "subway"
  /** indicates that the calculated route should prefer travel by train. */
  | "train"
  /** indicates that the calculated route should prefer travel by tram and light rail. */
  | "tram"
  /**
   * indicates that the calculated route should prefer travel by train, tram, light rail, and subway.
   * This is equivalent to `transit_mode=train|tram|subway`
   */
  | "rail";

export type TransitRoutingPreference =
  /** indicates that the calculated route should prefer limited amounts of walking. */
  | "less_walking"
  /** indicates that the calculated route should prefer a limited number of transfers. */
  | "fewer_transfers";

/**
 * The `status` field within the Directions response object contains the status of the request, and may contain debugging information
 * to help you track down why the Directions service failed.
 */
export type DirectionsReponseStatus =
  /** indicates the response contains a valid `result`. */
  | "OK"
  /** indicates at least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded. */
  | "NOT_FOUND"
  /** indicates no route could be found between the origin and destination. */
  | "ZERO_RESULTS"
  /**
   * indicates that too many `waypoints` were provided in the request. For applications using the Directions API as a web service,
   * or the [directions service in the Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/directions),
   * the maximum allowed number of `waypoints` is 23, plus the origin and destination.
   */
  | "MAX_WAYPOINTS_EXCEEDED"
  /**
   * indicates the requested route is too long and cannot be processed.
   * This error occurs when more complex directions are returned.
   * Try reducing the number of waypoints, turns, or instructions.
   */
  | "MAX_ROUTE_LENGTH_EXCEEDED "
  /** indicates that the provided request was invalid. Common causes of this status include an invalid parameter or parameter value. */
  | "INVALID_REQUEST"
  /**
   * indicates any of the following:
   *  - The API key is missing or invalid.
   *  - Billing has not been enabled on your account.
   *  - A self-imposed usage cap has been exceeded.
   *  - The provided method of payment is no longer valid (for example, a credit card has expired).
   * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.
   */
  | "OVER_DAILY_LIMIT"
  /** indicates the service has received too many requests from your application within the allowed time period. */
  | "OVER_QUERY_LIMIT"
  /** indicates that the service denied use of the directions service by your application. */
  | "REQUEST_DENIED"
  /** indicates a directions request could not be processed due to a server error. The request may succeed if you try again. */
  | "UNKNOWN_ERROR";

/**
 * Elements in the `geocoded_waypoints` array correspond, by their zero-based position, to the origin,
 * the waypoints in the order they are specified, and the destination.
 */
export interface GeocodedWaypoint {
  /** indicates the status code resulting from the geocoding operation. */
  geocoder_status: GeocodedWaypointStatus;
  /**
   * indicates that the geocoder did not return an exact match for the original request, though it was able to match part of the
   * requested address. You may wish to examine the original request for misspellings and/or an incomplete address.
   *
   * Partial matches most often occur for street addresses that do not exist within the locality you pass in the request.
   * Partial matches may also be returned when a request matches two or more locations in the same locality.
   * For example, "21 Henr St, Bristol, UK" will return a partial match for both Henry Street and Henrietta Street.
   * Note that if a request includes a misspelled address component, the geocoding service may suggest an alternative address.
   * Suggestions triggered in this way will also be marked as a partial match.
   */
  partial_match: boolean;
  /** unique identifier that can be used with other Google APIs. */
  place_id: string;
  /**
   * indicates the *address type* of the geocoding result used for calculating directions.
   *
   * An empty list of types indicates there are no known types for the particular address component, for example, Lieu-dit in France.
   */
  types: AddressType[];
}

export type GeocodedWaypointStatus =
  /** indicates that no errors occurred; the address was successfully parsed and at least one geocode was returned. */
  | "OK"
  /**
   * indicates that the geocode was successful but returned no results.
   * This may occur if the geocoder was passed a non-existent `address`.
   */
  | "ZERO_RESULTS";

export type AddressType =
  /** indicates a precise street address. */
  | "street_address"
  /** indicates a named route (such as "US 101"). */
  | "route"
  /** indicates a major intersection, usually of two major roads. */
  | "intersection"
  /** indicates a political entity. Usually, this type indicates a polygon of some civil administration. */
  | "political"
  /** indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
  | "country"
  /**
   * indicates a first-order civil entity below the country level. Within the United States, these administrative levels are states.
   * Not all nations exhibit these administrative levels. In most cases, `administrative_area_level_1` short names will closely match
   * ISO 3166-2 subdivisions and other widely circulated lists; however this is not guaranteed as our geocoding results are based
   * on a variety of signals and location data.
   */
  | "administrative_area_level_1"
  /**
   * indicates a second-order civil entity below the country level. Within the United States, these administrative levels are counties.
   * Not all nations exhibit these administrative levels.
   */
  | "administrative_area_level_2"
  /**
   * indicates a third-order civil entity below the country level. This type indicates a minor civil division.
   * Not all nations exhibit these administrative levels.
   */
  | "administrative_area_level_3"
  /**
   * indicates a fourth-order civil entity below the country level. This type indicates a minor civil division.
   * Not all nations exhibit these administrative levels.
   */
  | "administrative_area_level_4"
  /**
   * indicates a fifth-order civil entity below the country level. This type indicates a minor civil division.
   * Not all nations exhibit these administrative levels.
   */
  | "administrative_area_level_5"
  /** indicates a commonly-used alternative name for the entity. */
  | "colloquial_area"
  /** indicates an incorporated city or town political entity. */
  | "locality"
  /**
   * indicates a specific type of Japanese locality, to facilitate distinction between multiple locality components within a
   * Japanese address.
   */
  | "ward"
  /**
   * indicates a first-order civil entity below a locality. For some locations may receive one of the additional types:
   * `sublocality_level_1` to `sublocality_level_5`. Each sublocality level is a civil entity. Larger numbers indicate a smaller
   * geographic area.
   */
  | "sublocality"
  /** indicates a named neighborhood */
  | "neighborhood"
  /** indicates a named location, usually a building or collection of buildings with a common name */
  | "premise"
  /**
   * indicates a first-order entity below a named location, usually a singular building within a collection of buildings with a
   * common name.
   */
  | "subpremise"
  /** indicates a postal code as used to address postal mail within the country. */
  | "postal_code"
  /** indicates a prominent natural feature. */
  | "natural_feature"
  /** indicates an airport. */
  | "airport"
  /** indicates a named park. */
  | "park"
  /**
   * indicates a named point of interest. Typically, these "POI"s are prominent local entities that don't easily fit in another category,
   * such as "Empire State Building" or "Statue of Liberty".
   */
  | "point_of_interest";

/**
 * This route may consist of one or more `legs` depending on whether any waypoints were specified. As well, the route also contains
 * copyright and warning information which must be displayed to the user in addition to the routing information.
 */
export interface DirectionsRoute {
  /** contains a short textual description for the route, suitable for naming and disambiguating the route from alternatives. */
  summary: string;
  /**
   * contains an array which contains information about a leg of the route, between two locations within the given route.
   * A separate leg will be present for each waypoint or destination specified.
   * (A route with no waypoints will contain exactly one leg within the `legs` array.)
   * Each leg consists of a series of `steps`.
   */
  legs: RouteLeg[];
  /**
   * contains an array indicating the order of any waypoints in the calculated route.
   * This waypoints may be reordered if the request was passed `optimize:true` within its `waypoints` parameter.
   */
  waypoint_order: number[];
  /**
   * contains a single `points` object that holds an encoded polyline representation of the route.
   * This polyline is an approximate (smoothed) path of the resulting directions.
   */
  overview_polyline: {
    points: string;
  };
  /** contains the viewport bounding box of the `overview_polyline`. */
  bounds: LatLngBounds;
  /** contains the copyrights text to be displayed for this route. You must handle and display this information yourself. */
  copyrights: string;
  /** contains an array of warnings to be displayed when showing these directions. You must handle and display these warnings yourself. */
  warnings: string[];
  /**
   * If present, contains the total fare (that is, the total ticket costs) on this route.
   * This property is only returned for transit requests and only for routes where fare information is available for all transit legs.
   *
   * **Note:** The Directions API only returns fare information for requests that contain either an API key or a client ID
   * and digital signature.
   */
  fare: TransitFare;
  /**
   * An array of LatLngs representing the entire course of this route. The path is simplified in order to make
   * it suitable in contexts where a small number of vertices is required (such as Static Maps API URLs).
   */
  overview_path: LatLngLiteral[];
}

export interface TransitFare {
  /** An [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) indicating the currency that the amount is expressed in. */
  currency: string;
  /** The total fare amount, in the currency specified above. */
  value: number;
  /** The total fare amount, formatted in the requested language. */
  text: string;
}

/**
 * A single leg of the journey from the origin to the destination in the calculated route.
 * For routes that contain no waypoints, the route will consist of a single "leg," but for routes that define one or more waypoints,
 * the route will consist of one or more legs, corresponding to the specific legs of the journey.
 */
export interface RouteLeg {
  /** contains an array of steps denoting information about each separate step of the leg of the journey. */
  steps: DirectionsStep[];
  /**
   * indicates the total distance covered by this leg, as a field with the following elements.
   *
   * This field may be absent if the distance is unknown.
   */
  distance: Distance;
  /**
   * indicates the total duration of this leg.
   *
   * This field may be absent if the duration is unknown.
   */
  duration: Duration;
  /**
   * indicates the total duration of this leg.
   * This value is an estimate of the time in traffic based on current and historical traffic conditions.
   * See the `traffic_model` request parameter for the options you can use to request that the returned value is optimistic, pessimistic,
   * or a best-guess estimate. The duration in traffic is returned only if all of the following are true:
   *
   *  - The request includes a valid API key, or a valid Google Maps APIs Premium Plan client ID and signature.
   *  - The request does not include stopover waypoints. If the request includes waypoints, they must be prefixed with `via:`
   *    to avoid stopovers.
   *  - The request is specifically for driving directions—the `mode` parameter is set to `driving`.
   *  - The request includes a `departure_time` parameter.
   *  - Traffic conditions are available for the requested route.
   */
  duration_in_traffic: Duration;
  /** contains the estimated time of arrival for this leg. This property is only returned for transit directions. */
  arrival_time: Time;
  /**
   * contains the estimated time of departure for this leg, specified as a `Time` object.
   * The `departure_time` is only available for transit directions.
   */
  departure_time: Time;
  /**
   * contains the latitude/longitude coordinates of the origin of this leg.
   * Because the Directions API calculates directions between locations by using the nearest transportation option (usually a road)
   * at the start and end points, `start_location` may be different than the provided origin of this leg if, for example,
   * a road is not near the origin.
   */
  start_location: LatLngLiteral;
  /**
   * contains the latitude/longitude coordinates of the given destination of this leg.
   * Because the Directions API calculates directions between locations by using the nearest transportation option (usually a road)
   * at the start and end points, `end_location` may be different than the provided destination of this leg if, for example,
   * a road is not near the destination.
   */
  end_location: LatLngLiteral;
  /** contains the human-readable address (typically a street address) resulting from reverse geocoding the `start_location` of this leg. */
  start_address: string;
  /** contains the human-readable address (typically a street address) from reverse geocoding the `end_location` of this leg. */
  end_address: string;
}

/**
 * A step is the most atomic unit of a direction's route, containing a single step describing a specific, single instruction on the journey.
 * E.g. "Turn left at W. 4th St." The step not only describes the instruction but also contains distance and duration information relating to
 * how this step relates to the following step. For example, a step denoted as "Merge onto I-80 West" may contain a duration of
 * "37 miles" and "40 minutes," indicating that the next step is 37 miles/40 minutes from this step.
 *
 * When using the Directions API to search for transit directions, the steps array will include additional transit details in the form of
 * a `transit_details` array. If the directions include multiple modes of transportation, detailed directions will be provided for walking or
 * driving steps in an inner `steps` array. For example, a walking step will include directions from the start and end locations:
 * "Walk to Innes Ave & Fitch St". That step will include detailed walking directions for that route in the inner `steps` array, such as:
 * "Head north-west", "Turn left onto Arelious Walker", and "Turn left onto Innes Ave".
 */
export interface DirectionsStep {
  /** contains formatted instructions for this step, presented as an HTML text string. */
  html_instructions: string;
  /**
   * contains the distance covered by this step until the next step. (See the discussion of this field in Directions Legs)
   *
   * This field may be undefined if the distance is unknown.
   */
  distance: Distance;
  /**
   * contains the typical time required to perform the step, until the next step. (See the description in Directions Legs)
   *
   * This field may be undefined if the duration is unknown
   */
  duration: Duration;
  /** contains the location of the starting point of this step, as a single set of `lat` and `lng` fields. */
  start_location: LatLngLiteral;
  /** contains the location of the last point of this step, as a single set of `lat` and `lng` fields. */
  end_location: LatLngLiteral;
  /**
   * contains the action to take for the current step (turn left, merge, straight, etc.).
   * This field is used to determine which icon to display.
   */
  maneuver: Maneuver;
  /**
   * contains a single points object that holds an encoded polyline representation of the step.
   * This polyline is an approximate (smoothed) path of the step.
   */
  polyline: string;
  /**
   * contains detailed directions for walking or driving steps in transit directions.
   * Substeps are only available when `travel_mode` is set to "transit".
   * The inner `steps` array is of the same type as `steps`.
   */
  steps: DirectionsStep;
  /** contains transit specific information. This field is only returned with travel_mode is set to "transit". */
  transit_details: TransitDetails;
}

export interface Distance {
  /** indicates the distance in meters. */
  value: number;
  /**
   * contains a human-readable representation of the distance, displayed in units as used at the origin
   * (or as overridden within the `units` parameter in the request).
   * (For example, miles and feet will be used for any origin within the United States.)
   */
  text: string;
}

export interface Duration {
  /** indicates the duration in seconds. */
  value: number;
  /** contains a human-readable representation of the duration. */
  text: string;
}

export interface Time {
  /** the time specified as a JavaScript `Date` object. */
  value: Date;
  /** the time specified as a string. The time is displayed in the time zone of the transit stop. */
  text: string;
  /**
   * contains the time zone of this station. The value is the name of the time zone as defined in the
   * [IANA Time Zone Database](http://www.iana.org/time-zones), e.g. "America/New_York".
   */
  time_zone: string;
}

export type Maneuver =
  | "turn-slight-left"
  | "turn-sharp-left"
  | "uturn-left"
  | "turn-left"
  | "turn-slight-right"
  | "turn-sharp-right"
  | "uturn-right"
  | "turn-right"
  | "straight"
  | "ramp-left"
  | "ramp-right"
  | "merge"
  | "fork-left"
  | "fork-right"
  | "ferry"
  | "ferry-train"
  | "roundabout-left"
  | "roundabout-right";

/**
 * Transit directions return additional information that is not relevant for other modes of transportation.
 * These additional properties are exposed through the `transit_details` object, returned as a field of an element in the `steps[]` array.
 * From the `TransitDetails` object you can access additional information about the transit stop, transit line and transit agency
 */
export interface TransitDetails {
  /** contains information about the stop for this part of the trip. */
  arrival_stop: TransitStop;
  /** contains information about the station for this part of the trip. */
  departure_stop: TransitStop;
  /** contain the arrival time for this leg of the journey. */
  arrival_time: Time;
  /** contain the departure time for this leg of the journey. */
  departure_time: Time;
  /**
   * specifies the direction in which to travel on this line, as it is marked on the vehicle or at the departure stop.
   * This will often be the terminus station.
   */
  headsign: string;
  /**
   * specifies the expected number of seconds between departures from the same stop at this time.
   * For example, with a `headway` value of 600, you would expect a ten minute wait if you should miss your bus.
   */
  headway: number;
  /**
   * contains the number of stops in this step, counting the arrival stop, but not the departure stop.
   * For example, if your directions involve leaving from Stop A, passing through stops B and C, and arriving at stop D,
   * `num_stops` will return 3.
   */
  num_stops: number;
  /** contains information about the transit line used in this step. */
  line: TransitLine;
}

export interface TransitStop {
  /** the name of the transit station/stop. eg. "Union Square". */
  name: string;
  /** the location of the transit station/stop, represented as a `lat` and `lng` field. */
  location: LatLngLiteral;
}

export interface TransitLine {
  /** contains the full name of this transit line. eg. "7 Avenue Express". */
  name: string;
  /** contains the short name of this transit line. This will normally be a line number, such as "M7" or "355". */
  short_name: string;
  /** contains the color commonly used in signage for this transit line. The color will be specified as a hex string such as: #FF0033. */
  color: string;
  /**
   * is an array containing a single `TransitAgency` object.
   * The `TransitAgency` object provides information about the operator of the line
   */
  agencies: TransitAgency[];
  /** contains the URL for this transit line as provided by the transit agency. */
  url: string;
  /** contains the URL for the icon associated with this line. */
  icon: string;
  /** contains the color of text commonly used for signage of this line. The color will be specified as a hex string. */
  text_color: string;
  /** contains the type of vehicle used on this line. */
  vehicle: TransitVehicle;
}

/** You must display the names and URLs of the transit agencies servicing the trip results. */
export interface TransitAgency {
  /** contains the name of the transit agency. */
  name: string;
  /** contains the phone number of the transit agency. */
  phone: string;
  /** contains the URL for the transit agency. */
  url: string;
}

export interface TransitVehicle {
  /** contains the name of the vehicle on this line. eg. "Subway.". */
  name: string;
  /** contains the type of vehicle that runs on this line. */
  type: VehicleType;
  /** contains the URL for an icon associated with this vehicle type. */
  icon: string;
  /** contains the URL for the icon associated with this vehicle type, based on the local transport signage. */
  local_icon: string;
}

/** @see https://developers.google.com/maps/documentation/directions/intro#VehicleType. */
export type VehicleType =
  /** Rail. */
  | "RAIL"
  /** Light rail transit. */
  | "METRO_RAIL"
  /** Underground light rail. */
  | "SUBWAY"
  /** Above ground light rail. */
  | "TRAM"
  /** Monorail. */
  | "MONORAIL"
  /** Heavy rail. */
  | "HEAVY_RAIL"
  /** Commuter rail. */
  | "COMMUTER_TRAIN"
  /** High speed train. */
  | "HIGH_SPEED_TRAIN"
  /** Bus. */
  | "BUS"
  /** Intercity bus. */
  | "INTERCITY_BUS"
  /** Trolleybus. */
  | "TROLLEYBUS"
  /** Share taxi is a kind of bus with the ability to drop off and pick up passengers anywhere on its route. */
  | "SHARE_TAXI"
  /** Ferry. */
  | "FERRY"
  /** A vehicle that operates on a cable, usually on the ground. Aerial cable cars may be of the type `GONDOLA_LIFT`. */
  | "CABLE_CAR"
  /** An aerial cable car. */
  | "GONDOLA_LIFT"
  /**
   * A vehicle that is pulled up a steep incline by a cable.
   * A Funicular typically consists of two cars, with each car acting as a counterweight for the other.
   */
  | "FUNICULAR"
  /** All other vehicles will return this type. */
  | "OTHER";

/**
 * When the Distance Matrix API returns results, it places them within a JSON `rows` array.
 * Even if no results are returned (such as when the origins and/or destinations don't exist), it still returns an empty array.
 * XML responses consist of zero or more `<row>` elements.
 *
 * Rows are ordered according to the values in the `origin` parameter of the request.
 * Each row corresponds to an origin, and each `element` within that row corresponds to a pairing of the origin with a `destination` value.
 *
 * Each `row` array contains one or more `element` entries, which in turn contain the information about a single origin-destination pairing.
 */
export interface DistanceMatrixRow {
  elements: DistanceMatrixRowElement[];
}

/** The information about each origin-destination pairing is returned in an `element` entry. */
export interface DistanceMatrixRowElement {
  /** possible status codes  */
  status: Status;
  /**
   * The length of time it takes to travel this route, expressed in seconds (the `value` field) and as `text`.
   * The textual representation is localized according to the query's `language` parameter.
   */
  duration: Duration;
  /**
   * The length of time it takes to travel this route, based on current and historical traffic conditions.
   * See the `traffic_model` request parameter for the options you can use to request that the returned value is
   * `optimistic`, `pessimistic`, or a `best-guess` estimate. The duration is expressed in seconds (the `value` field) and as `text`.
   * The textual representation is localized according to the query's `language` parameter.
   * The duration in traffic is returned only if all of the following are true:
   *  - The request includes a `departure_time` parameter.
   *  - The request includes a valid API key, or a valid Google Maps APIs Premium Plan client ID and signature.
   *  - Traffic conditions are available for the requested route.
   *  - The `mode` parameter is set to `driving`.
   */
  duration_in_traffic: Duration;
  /**
   * The total distance of this route, expressed in meters (`value`) and as `text`.
   * The textual value uses the `unit` system specified with the unit parameter of the original request, or the origin's region.
   */
  distance: Distance;
  /**
   * If present, contains the total fare (that is, the total ticket costs) on this route.
   * This property is only returned for transit requests and only for transit providers where fare information is available.
   */
  fare: TransitFare;
}

export interface OpeningHours {
  /** is a boolean value indicating if the place is open at the current time. */
  open_now: boolean;
  /** is an array of opening periods covering seven days, starting from Sunday, in chronological order. */
  periods: OpeningPeriod[];
  /**
   * is an array of seven strings representing the formatted opening hours for each day of the week.
   * If a `language` parameter was specified in the Place Details request, the Places Service will format
   * and localize the opening hours appropriately for that language. The ordering of the elements in this array
   * depends on the `language` parameter. Some languages start the week on Monday while others start on Sunday.
   */
  weekday_text: string[];
}

export interface OpeningPeriod {
  /** contains a pair of day and time objects describing when the place opens. */
  open: OpeningHoursTime;
  /**
   * may contain a pair of day and time objects describing when the place closes.
   * **Note:** If a place is **always open**, the `close` section will be missing from the response.
   * Clients can rely on always-open being represented as an `open` period containing `day` with value 0
   * and `time` with value 0000, and no `close`.
   */
  close?: OpeningHoursTime;
}

export interface OpeningHoursTime {
  /** a number from 0–6, corresponding to the days of the week, starting on Sunday. For example, 2 means Tuesday. */
  day: number;
  /**
   *  may contain a time of day in 24-hour hhmm format. Values are in the range 0000–2359. The `time`
   * will be reported in the place's time zone.
   */
  time?: string;
}

export interface GeocodeResult {
  /**
   * array indicates the type of the returned result.
   * This array contains a set of zero or more tags identifying the type of feature returned in the result.
   * For example, a geocode of "Chicago" returns "locality" which indicates that "Chicago" is a city,
   * and also returns "political" which indicates it is a political entity.
   */
  types: AddressType[];
  /**
   * is a string containing the human-readable address of this location.
   *
   * Often this address is equivalent to the postal address. Note that some countries, such as the United Kingdom,
   * do not allow distribution of true postal addresses due to licensing restrictions.
   *
   * The formatted address is logically composed of one or more address components.
   * For example, the address "111 8th Avenue, New York, NY" consists of the following components: "111" (the street number),
   * "8th Avenue" (the route), "New York" (the city) and "NY" (the US state).
   *
   * Do not parse the formatted address programmatically. Instead you should use the individual address components,
   * which the API response includes in addition to the formatted address field.
   */
  formatted_address: string;
  /**
   * is an array containing the separate components applicable to this address.
   *
   * Note the following facts about the `address_components[]` array:
   *  - The array of address components may contain more components than the `formatted_address`.
   *  - The array does not necessarily include all the political entities that contain an address,
   *    apart from those included in the `formatted_address`. To retrieve all the political entities that contain a specific address,
   *    you should use reverse geocoding, passing the latitude/longitude of the address as a parameter to the request.
   *  - The format of the response is not guaranteed to remain the same between requests.
   *    In particular, the number of `address_components` varies based on the address requested and can change
   *    over time for the same address. A component can change position in the array.
   *    The type of the component can change. A particular component may be missing in a later response.
   */
  address_components: AddressComponent[];
  /**
   * is an array denoting all the localities contained in a postal code.
   * This is only present when the result is a postal code that contains multiple localities.
   */
  postcode_localities: string[];
  /** address geometry. */
  geometry: AddressGeometry;
  /**
   * is an encoded location reference, derived from latitude and longitude coordinates,
   * that represents an area: 1/8000th of a degree by 1/8000th of a degree (about 14m x 14m at the equator) or smaller.
   * Plus codes can be used as a replacement for street addresses in places where they do not exist
   * (where buildings are not numbered or streets are not named).
   *
   * The plus code is formatted as a global code and a compound code:
   *  - `global_code` is a 4 character area code and 6 character or longer local code (849VCWC8+R9).
   *  - `compound_code` is a 6 character or longer local code with an explicit location (CWC8+R9, Mountain View, CA, USA).
   * Typically, both the global code and compound code are returned. However, if the result is in a remote location
   * (for example, an ocean or desert) only the global code may be returned.
   *
   * @see [Open Location Code](https://en.wikipedia.org/wiki/Open_Location_Code)
   * @see [plus codes](https://plus.codes/)
   */
  plus_code: PlusCode;
  /**
   * indicates that the geocoder did not return an exact match for the original request,
   * though it was able to match part of the requested address.
   * You may wish to examine the original request for misspellings and/or an incomplete address.
   *
   * Partial matches most often occur for street addresses that do not exist within the locality you pass in the request.
   * Partial matches may also be returned when a request matches two or more locations in the same locality.
   * For example, "21 Henr St, Bristol, UK" will return a partial match for both Henry Street and Henrietta Street.
   * Note that if a request includes a misspelled address component, the geocoding service may suggest an alternative address.
   * Suggestions triggered in this way will also be marked as a partial match.
   */
  partial_match: boolean;
  /** is a unique identifier that can be used with other Google APIs. */
  place_id: string;
}

export type GeocodingAddressComponentType =
  /** indicates the floor of a building address. */
  | "floor"
  /** typically indicates a place that has not yet been categorized. */
  | "establishment"
  /** indicates a named point of interest. */
  | "point_of_interest"
  /** indicates a parking lot or parking structure. */
  | "parking"
  /** indicates a specific postal box. */
  | "post_box"
  /** indicates a grouping of geographic areas, such as locality and sublocality, used for mailing addresses in some countries. */
  | "postal_town"
  /** indicates the room of a building address. */
  | "room"
  /** indicates the precise street number. */
  | "street_number"
  /**  indicate the location of a bus. */
  | "bus_station"
  /**  indicate the location of a train. */
  | "train_station"
  /**  indicate the location of a public transit stop. */
  | "transit_station";

export interface AddressComponent {
  /** is an array indicating the *type* of the address component. */
  types: Array<AddressType | GeocodingAddressComponentType>;
  /** is the full text description or name of the address component as returned by the Geocoder. */
  long_name: string;
  /**
   * is an abbreviated textual name for the address component, if available.
   * For example, an address component for the state of Alaska may have a `long_name` of "Alaska" and a `short_name` of "AK"
   * using the 2-letter postal abbreviation.
   */
  short_name: string;
}

export interface AddressGeometry {
  /** contains the geocoded latitude, longitude value. For normal address lookups, this field is typically the most important. */
  location: LatLngLiteral;
  /** stores additional data about the specified location. */
  location_type: LocationType;
  /**
   * contains the recommended viewport for displaying the returned result, specified as two latitude, longitude values
   * defining the `southwest` and `northeast` corner of the viewport bounding box.
   * Generally the viewport is used to frame a result when displaying it to a user.
   */
  viewport: LatLngBounds;
  /**
   * (optionally returned) stores the bounding box which can fully contain the returned result.
   * Note that these bounds may not match the recommended viewport.
   * (For example, San Francisco includes the [Farallon islands](https://en.wikipedia.org/wiki/Farallon_Islands),
   * which are technically part of the city, but probably should not be returned in the viewport.)
   */
  bounds: LatLngBounds;
}

export type LocationType =
  /**
   * indicates that the returned result is a precise geocode for which we have location information
   * accurate down to street address precision
   */
  | "ROOFTOP"
  /**
   * indicates that the returned result reflects an approximation (usually on a road) interpolated between two precise points
   * (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.
   */
  | "RANGE_INTERPOLATED"
  /**
   * indicates that the returned result is the geometric center of a result such as a polyline
   * (for example, a street) or polygon (region).
   */
  | "GEOMETRIC_CENTER"
  /** indicates that the returned result is approximate. */
  | "APPROXIMATE";

export interface PlusCode {
  /** is a 4 character area code and 6 character or longer local code (849VCWC8+R9). */
  global_code: string;
  /** is a 6 character or longer local code with an explicit location (CWC8+R9, Mountain View, CA, USA). */
  compound_code: string;
}

export type RadioType = "lte" | "gsm" | "cdma" | "wcdma";

export interface CellTower {
  /**
   * Unique identifier of the cell.
   * On GSM, this is the Cell ID (CID);
   * CDMA networks use the Base Station ID (BID).
   * WCDMA networks use the UTRAN/GERAN Cell Identity (UC-Id), which is a 32-bit value concatenating the Radio Network Controller (RNC)
   * and Cell ID. Specifying only the 16-bit Cell ID value in WCDMA networks may return inaccurate results.
   */
  cellId: number;
  /** The Location Area Code (LAC) for GSM and WCDMA networks. The Network ID (NID) for CDMA networks. */
  locationAreaCode: number;
  /** The cell tower's Mobile Country Code (MCC). */
  mobileCountryCode: number;
  /** The cell tower's Mobile Network Code. This is the MNC for GSM and WCDMA; CDMA uses the System ID (SID). */
  mobileNetworkCode: number;
  /** The number of milliseconds since this cell was primary. If age is 0, the `cellId` represents a current measurement. */
  age?: number;
  /** Radio signal strength measured in dBm. */
  signalStrength?: number;
  /** The [timing advance](https://en.wikipedia.org/wiki/Timing_advance) value. */
  timingAdvance?: number;
}

export interface WifiAccessPoint {
  /** The MAC address of the WiFi node. It's typically called a BSS, BSSID or MAC address. Separators must be `:` (colon). */
  macAddress: string;
  /** The current signal strength measured in dBm. */
  signalStrength?: number;
  /** The number of milliseconds since this access point was detected. */
  age?: number;
  /** The channel over which the client is communicating with the acces. */
  channel?: number;
  /** The current signal to noise ratio measured in dB. */
  signalToNoiseRatio?: number;
}

export interface PredictionTerm {
  /** containing the text of the term. */
  value: string;
  /** start position of this term in the description, measured in Unicode characters. */
  offset: number;
}

export interface PredictionSubstring {
  /** location of the entered term. */
  offset: number;
  /** length of the entered term. */
  length: number;
}

export interface StructuredFormatting {
  /** contains the main text of a prediction, usually the name of the place. */
  main_text: string;
  /**
   * contains an array with `offset` value and `length`. These describe the location of
   * the entered term in the prediction result text, so that the term can be highlighted if desired.
   */
  main_text_matched_substrings: PredictionSubstring[];
  /** contains the secondary text of a prediction, usually the location of the place. */
  secondary_text: string;
}

export interface SnappedPoint {
  /** Contains a `latitude` and `longitude` value. */
  location: LatLngLiteralVerbose;
  /**
   * An integer that indicates the corresponding value in the original request.
   * Each point in the request maps to at most two segmentsin the response:
   *  - If there are no nearby roads, no segment is returned.
   *  - If the nearest road is one-way, one segment is returned.
   *  - If the nearest road is bidirectional, two segments are returned.
   */
  originalIndex: number;
  /**
   * A unique identifier for a place. All place IDs returned by the Roads API correspond to road segments.
   * Place IDs can be used with other Google APIs, including the Places SDK and the Maps JavaScript API.
   * For example, if you need to get road names for the snapped points returned by the Roads API,
   * you can pass the `placeId` to the Places SDK or the Geocoding API. Within the Roads API,
   * you can pass the `placeId` in a speed limits request to determine the speed limit along that road segment.
   */
  placeId: string;
}
