"use strict";
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioType = exports.LocationType = exports.GeocodingAddressComponentType = exports.VehicleType = exports.Maneuver = exports.AddressType = exports.GeocodedWaypointStatus = exports.DirectionsReponseStatus = exports.DirectionsResponseStatus = exports.TransitRoutingPreference = exports.TransitMode = exports.TrafficModel = exports.UnitSystem = exports.TravelRestriction = exports.TravelMode = exports.Language = exports.AspectRatingType = exports.PlaceType2 = exports.PlaceType1 = exports.PlaceInputType = exports.PlaceIdScope = exports.Status = void 0;
var Status;
(function (Status) {
    /** indicates the response contains a valid result. */
    Status["OK"] = "OK";
    /** indicates that the provided request was invalid. */
    Status["INVALID_REQUEST"] = "INVALID_REQUEST";
    /**
     * indicates that too many `waypoints` were provided in the request. For applications using the Directions API as a web service,
     * or the [directions service in the Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/directions),
     * the maximum allowed number of `waypoints` is 23, plus the origin and destination.
     */
    Status["MAX_WAYPOINTS_EXCEEDED"] = "MAX_WAYPOINTS_EXCEEDED";
    /**
     * indicates the requested route is too long and cannot be processed.
     * This error occurs when more complex directions are returned.
     * Try reducing the number of waypoints, turns, or instructions.
     */
    Status["MAX_ROUTE_LENGTH_EXCEEDED"] = "MAX_ROUTE_LENGTH_EXCEEDED";
    /**
     * indicates any of the following:
     *  - The API key is missing or invalid.
     *  - Billing has not been enabled on your account.
     *  - A self-imposed usage cap has been exceeded.
     *  - The provided method of payment is no longer valid (for example, a credit card has expired).
     * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.
     */
    Status["OVER_DAILY_LIMIT"] = "OVER_DAILY_LIMIT";
    /** indicates the service has received too many requests from your application within the allowed time period. */
    Status["OVER_QUERY_LIMIT"] = "OVER_QUERY_LIMIT";
    /** indicates that the service denied use of the Distance Matrix service by your application. */
    Status["REQUEST_DENIED"] = "REQUEST_DENIED";
    /** indicates a Distance Matrix request could not be processed due to a server error. The request may succeed if you try again. */
    Status["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    /** indicates that the request was successful but returned no results. */
    Status["ZERO_RESULTS"] = "ZERO_RESULTS";
    /** indicates that the referenced location (place_id) was not found in the Places database. */
    Status["NOT_FOUND"] = "NOT_FOUND";
})(Status || (exports.Status = Status = {}));
var PlaceIdScope;
(function (PlaceIdScope) {
    /**
     * The place ID is recognised by your application only.
     * This is because your application added the place, and the place has not yet passed the moderation process.
     */
    PlaceIdScope["APP"] = "APP";
    /** The place ID is available to other applications and on Google Maps. */
    PlaceIdScope["GOOGLE"] = "GOOGLE";
})(PlaceIdScope || (exports.PlaceIdScope = PlaceIdScope = {}));
var PlaceInputType;
(function (PlaceInputType) {
    PlaceInputType["textQuery"] = "textquery";
    PlaceInputType["phoneNumber"] = "phonenumber";
})(PlaceInputType || (exports.PlaceInputType = PlaceInputType = {}));
/**
 * Table 1: Types supported in place search and addition
 *
 * You can use the following values in the types filter for place searches and when adding a place.
 *
 * @see https://developers.google.com/places/web-service/supported_types#table1
 */
var PlaceType1;
(function (PlaceType1) {
    PlaceType1["accounting"] = "accounting";
    /** indicates an airport. */
    PlaceType1["airport"] = "airport";
    PlaceType1["amusement_park"] = "amusement_park";
    PlaceType1["aquarium"] = "aquarium";
    PlaceType1["art_gallery"] = "art_gallery";
    PlaceType1["atm"] = "atm";
    PlaceType1["bakery"] = "bakery";
    PlaceType1["bank"] = "bank";
    PlaceType1["bar"] = "bar";
    PlaceType1["beauty_salon"] = "beauty_salon";
    PlaceType1["bicycle_store"] = "bicycle_store";
    PlaceType1["book_store"] = "book_store";
    PlaceType1["bowling_alley"] = "bowling_alley";
    PlaceType1["bus_station"] = "bus_station";
    PlaceType1["cafe"] = "cafe";
    PlaceType1["campground"] = "campground";
    PlaceType1["car_dealer"] = "car_dealer";
    PlaceType1["car_rental"] = "car_rental";
    PlaceType1["car_repair"] = "car_repair";
    PlaceType1["car_wash"] = "car_wash";
    PlaceType1["casino"] = "casino";
    PlaceType1["cemetery"] = "cemetery";
    PlaceType1["church"] = "church";
    PlaceType1["city_hall"] = "city_hall";
    PlaceType1["clothing_store"] = "clothing_store";
    PlaceType1["convenience_store"] = "convenience_store";
    PlaceType1["courthouse"] = "courthouse";
    PlaceType1["dentist"] = "dentist";
    PlaceType1["department_store"] = "department_store";
    PlaceType1["doctor"] = "doctor";
    PlaceType1["drugstore"] = "drugstore";
    PlaceType1["electrician"] = "electrician";
    PlaceType1["electronics_store"] = "electronics_store";
    PlaceType1["embassy"] = "embassy";
    PlaceType1["fire_station"] = "fire_station";
    PlaceType1["florist"] = "florist";
    PlaceType1["funeral_home"] = "funeral_home";
    PlaceType1["furniture_store"] = "furniture_store";
    PlaceType1["gas_station"] = "gas_station";
    PlaceType1["gym"] = "gym";
    PlaceType1["hair_care"] = "hair_care";
    PlaceType1["hardware_store"] = "hardware_store";
    PlaceType1["hindu_temple"] = "hindu_temple";
    PlaceType1["home_goods_store"] = "home_goods_store";
    PlaceType1["hospital"] = "hospital";
    PlaceType1["insurance_agency"] = "insurance_agency";
    PlaceType1["jewelry_store"] = "jewelry_store";
    PlaceType1["laundry"] = "laundry";
    PlaceType1["lawyer"] = "lawyer";
    PlaceType1["library"] = "library";
    PlaceType1["light_rail_station"] = "light_rail_station";
    PlaceType1["liquor_store"] = "liquor_store";
    PlaceType1["local_government_office"] = "local_government_office";
    PlaceType1["locksmith"] = "locksmith";
    PlaceType1["lodging"] = "lodging";
    PlaceType1["meal_delivery"] = "meal_delivery";
    PlaceType1["meal_takeaway"] = "meal_takeaway";
    PlaceType1["mosque"] = "mosque";
    PlaceType1["movie_rental"] = "movie_rental";
    PlaceType1["movie_theater"] = "movie_theater";
    PlaceType1["moving_company"] = "moving_company";
    PlaceType1["museum"] = "museum";
    PlaceType1["night_club"] = "night_club";
    PlaceType1["painter"] = "painter";
    /** indicates a named park. */
    PlaceType1["park"] = "park";
    PlaceType1["parking"] = "parking";
    PlaceType1["pet_store"] = "pet_store";
    PlaceType1["pharmacy"] = "pharmacy";
    PlaceType1["physiotherapist"] = "physiotherapist";
    PlaceType1["plumber"] = "plumber";
    PlaceType1["police"] = "police";
    PlaceType1["post_office"] = "post_office";
    PlaceType1["real_estate_agency"] = "real_estate_agency";
    PlaceType1["restaurant"] = "restaurant";
    PlaceType1["roofing_contractor"] = "roofing_contractor";
    PlaceType1["rv_park"] = "rv_park";
    PlaceType1["school"] = "school";
    PlaceType1["secondary_school"] = "secondary_school";
    PlaceType1["shoe_store"] = "shoe_store";
    PlaceType1["shopping_mall"] = "shopping_mall";
    PlaceType1["spa"] = "spa";
    PlaceType1["stadium"] = "stadium";
    PlaceType1["storage"] = "storage";
    PlaceType1["store"] = "store";
    PlaceType1["subway_station"] = "subway_station";
    PlaceType1["supermarket"] = "supermarket";
    PlaceType1["synagogue"] = "synagogue";
    PlaceType1["taxi_stand"] = "taxi_stand";
    PlaceType1["tourist_attraction"] = "tourist_attraction";
    PlaceType1["train_station"] = "train_station";
    PlaceType1["transit_station"] = "transit_station";
    PlaceType1["travel_agency"] = "travel_agency";
    PlaceType1["university"] = "university";
    PlaceType1["veterinary_care"] = "veterinary_care";
    PlaceType1["zoo"] = "zoo";
})(PlaceType1 || (exports.PlaceType1 = PlaceType1 = {}));
/**
 * Table 2: Additional types returned by the Places service
 *
 * The following types may be returned in the results of a place search, in addition to the types in table 1 above.
 * For more details on these types, refer to [Address Types](https://developers.google.com/maps/documentation/geocoding/intro#Types)
 * in Geocoding Responses.
 *
 * @see https://developers.google.com/places/web-service/supported_types#table2
 */
var PlaceType2;
(function (PlaceType2) {
    /**
     * indicates a first-order civil entity below the country level. Within the United States, these administrative levels are states.
     * Not all nations exhibit these administrative levels. In most cases, `administrative_area_level_1` short names will closely match
     * ISO 3166-2 subdivisions and other widely circulated lists; however this is not guaranteed as our geocoding results are based
     * on a variety of signals and location data.
     */
    PlaceType2["administrative_area_level_1"] = "administrative_area_level_1";
    /**
     * indicates a second-order civil entity below the country level. Within the United States, these administrative levels are counties.
     * Not all nations exhibit these administrative levels.
     */
    PlaceType2["administrative_area_level_2"] = "administrative_area_level_2";
    /**
     * indicates a third-order civil entity below the country level. This type indicates a minor civil division.
     * Not all nations exhibit these administrative levels.
     */
    PlaceType2["administrative_area_level_3"] = "administrative_area_level_3";
    /**
     * indicates a fourth-order civil entity below the country level. This type indicates a minor civil division.
     * Not all nations exhibit these administrative levels.
     */
    PlaceType2["administrative_area_level_4"] = "administrative_area_level_4";
    /**
     * indicates a fifth-order civil entity below the country level. This type indicates a minor civil division.
     * Not all nations exhibit these administrative levels.
     */
    PlaceType2["administrative_area_level_5"] = "administrative_area_level_5";
    PlaceType2["archipelago"] = "archipelago";
    /** indicates a commonly-used alternative name for the entity. */
    PlaceType2["colloquial_area"] = "colloquial_area";
    PlaceType2["continent"] = "continent";
    /** indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
    PlaceType2["country"] = "country";
    PlaceType2["establishment"] = "establishment";
    PlaceType2["finance"] = "finance";
    PlaceType2["floor"] = "floor";
    PlaceType2["food"] = "food";
    PlaceType2["general_contractor"] = "general_contractor";
    PlaceType2["geocode"] = "geocode";
    PlaceType2["health"] = "health";
    /** indicates a major intersection, usually of two major roads. */
    PlaceType2["intersection"] = "intersection";
    PlaceType2["landmark"] = "landmark";
    /** indicates an incorporated city or town political entity. */
    PlaceType2["locality"] = "locality";
    /** indicates a prominent natural feature. */
    PlaceType2["natural_feature"] = "natural_feature";
    /** indicates a named neighborhood */
    PlaceType2["neighborhood"] = "neighborhood";
    PlaceType2["place_of_worship"] = "place_of_worship";
    PlaceType2["plus_code"] = "plus_code";
    PlaceType2["point_of_interest"] = "point_of_interest";
    /** indicates a political entity. Usually, this type indicates a polygon of some civil administration. */
    PlaceType2["political"] = "political";
    PlaceType2["post_box"] = "post_box";
    /** indicates a postal code as used to address postal mail within the country. */
    PlaceType2["postal_code"] = "postal_code";
    PlaceType2["postal_code_prefix"] = "postal_code_prefix";
    PlaceType2["postal_code_suffix"] = "postal_code_suffix";
    PlaceType2["postal_town"] = "postal_town";
    /** indicates a named location, usually a building or collection of buildings with a common name */
    PlaceType2["premise"] = "premise";
    PlaceType2["room"] = "room";
    /** indicates a named route (such as "US 101"). */
    PlaceType2["route"] = "route";
    PlaceType2["street_address"] = "street_address";
    PlaceType2["street_number"] = "street_number";
    /**
     * indicates a first-order civil entity below a locality. For some locations may receive one of the additional types:
     * `sublocality_level_1` to `sublocality_level_5`. Each sublocality level is a civil entity. Larger numbers indicate a smaller
     * geographic area.
     */
    PlaceType2["sublocality"] = "sublocality";
    PlaceType2["sublocality_level_1"] = "sublocality_level_1";
    PlaceType2["sublocality_level_2"] = "sublocality_level_2";
    PlaceType2["sublocality_level_3"] = "sublocality_level_3";
    PlaceType2["sublocality_level_4"] = "sublocality_level_4";
    PlaceType2["sublocality_level_5"] = "sublocality_level_5";
    /**
     * indicates a first-order entity below a named location, usually a singular building within a collection of buildings with a
     * common name.
     */
    PlaceType2["subpremise"] = "subpremise";
    PlaceType2["town_square"] = "town_square";
})(PlaceType2 || (exports.PlaceType2 = PlaceType2 = {}));
var AspectRatingType;
(function (AspectRatingType) {
    AspectRatingType["appeal"] = "appeal";
    AspectRatingType["atmosphere"] = "atmosphere";
    AspectRatingType["decor"] = "decor";
    AspectRatingType["facilities"] = "facilities";
    AspectRatingType["food"] = "food";
    AspectRatingType["overall"] = "overall";
    AspectRatingType["quality"] = "quality";
    AspectRatingType["service"] = "service";
})(AspectRatingType || (exports.AspectRatingType = AspectRatingType = {}));
/**
 * By default the API will attempt to load the most appropriate language based on the users location or browser settings.
 * Some APIs allow you to explicitly set a language when you make a request
 *
 * @see https://developers.google.com/maps/faq#languagesupport
 */
var Language;
(function (Language) {
    /** Arabic */
    Language["ar"] = "ar";
    /** Belarusian */
    Language["be"] = "be";
    /** Bulgarian */
    Language["bg"] = "bg";
    /** Bengali */
    Language["bn"] = "bn";
    /** Catalan */
    Language["ca"] = "ca";
    /** Czech */
    Language["cs"] = "cs";
    /** Danish */
    Language["da"] = "da";
    /** German */
    Language["de"] = "de";
    /** Greek */
    Language["el"] = "el";
    /** English */
    Language["en"] = "en";
    /** English (Australian) */
    Language["en_Au"] = "en-Au";
    /** English (Great Britain) */
    Language["en_GB"] = "en-GB";
    /** Spanish */
    Language["es"] = "es";
    /** Basque */
    Language["eu"] = "eu";
    /** Farsi */
    Language["fa"] = "fa";
    /** Finnish */
    Language["fi"] = "fi";
    /** Filipino */
    Language["fil"] = "fil";
    /** French */
    Language["fr"] = "fr";
    /** Galician */
    Language["gl"] = "gl";
    /** Gujarati */
    Language["gu"] = "gu";
    /** Hindi */
    Language["hi"] = "hi";
    /** Croatian */
    Language["hr"] = "hr";
    /** Hungarian */
    Language["hu"] = "hu";
    /** Indonesian */
    Language["id"] = "id";
    /** Italian */
    Language["it"] = "it";
    /** Hebrew */
    Language["iw"] = "iw";
    /** Japanese */
    Language["ja"] = "ja";
    /** Kazakh */
    Language["kk"] = "kk";
    /** Kannada */
    Language["kn"] = "kn";
    /** Korean */
    Language["ko"] = "ko";
    /** Kyrgyz */
    Language["ky"] = "ky";
    /** Lithuanian */
    Language["lt"] = "lt";
    /** Latvian */
    Language["lv"] = "lv";
    /** Macedonian */
    Language["mk"] = "mk";
    /** Malayalam */
    Language["ml"] = "ml";
    /** Marathi */
    Language["mr"] = "mr";
    /** Burmese */
    Language["my"] = "my";
    /** Dutch */
    Language["nl"] = "nl";
    /** Norwegian */
    Language["no"] = "no";
    /** Punjabi */
    Language["pa"] = "pa";
    /** Polish */
    Language["pl"] = "pl";
    /** Portuguese */
    Language["pt"] = "pt";
    /** Portuguese (Brazil) */
    Language["pt_BR"] = "pt-BR";
    /** Portuguese (Portugal) */
    Language["pt_PT"] = "pt-PT";
    /** Romanian */
    Language["ro"] = "ro";
    /** Russian */
    Language["ru"] = "ru";
    /** Slovak */
    Language["sk"] = "sk";
    /** Slovenian */
    Language["sl"] = "sl";
    /** Albanian */
    Language["sq"] = "sq";
    /** Serbian */
    Language["sr"] = "sr";
    /** Swedish */
    Language["sv"] = "sv";
    /** Tamil */
    Language["ta"] = "ta";
    /** Telugu */
    Language["te"] = "te";
    /** Thai */
    Language["th"] = "th";
    /** Tagalog */
    Language["tl"] = "tl";
    /** Turkish */
    Language["tr"] = "tr";
    /** Ukrainian */
    Language["uk"] = "uk";
    /** Uzbek */
    Language["uz"] = "uz";
    /** Vietnamese */
    Language["vi"] = "vi";
    /** Chinese (Simlified) */
    Language["zh_CN"] = "zh-CN";
    /** Chinese (Traditional) */
    Language["zh_TW"] = "zh-TW";
})(Language || (exports.Language = Language = {}));
/**
 * When you calculate directions, you may specify the transportation mode to use.
 * By default, directions are calculated as `driving` directions.
 *
 * **Note:** Both walking and bicycling directions may sometimes not include clear pedestrian or bicycling paths,
 * so these directions will return warnings in the returned result which you must display to the user.
 */
var TravelMode;
(function (TravelMode) {
    /** (default) indicates standard driving directions using the road network. */
    TravelMode["driving"] = "driving";
    /** requests walking directions via pedestrian paths & sidewalks (where available). */
    TravelMode["walking"] = "walking";
    /** requests bicycling directions via bicycle paths & preferred streets (where available). */
    TravelMode["bicycling"] = "bicycling";
    /**
     * requests directions via public transit routes (where available).
     * If you set the mode to transit, you can optionally specify either a departure_time or an arrival_time.
     * If neither time is specified, the departure_time defaults to now (that is, the departure time defaults to the current time).
     * You can also optionally include a transit_mode and/or a transit_routing_preference.
     */
    TravelMode["transit"] = "transit";
})(TravelMode || (exports.TravelMode = TravelMode = {}));
var TravelRestriction;
(function (TravelRestriction) {
    /** indicates that the calculated route should avoid toll roads/bridges. */
    TravelRestriction["tolls"] = "tolls";
    /** indicates that the calculated route should avoid highways. */
    TravelRestriction["highways"] = "highways";
    /** indicates that the calculated route should avoid ferries. */
    TravelRestriction["ferries"] = "ferries";
    /**
     * indicates that the calculated route should avoid indoor steps for walking and transit directions.
     * Only requests that include an API key or a Google Maps APIs Premium Plan client ID will receive indoor steps by default.
     */
    TravelRestriction["indoor"] = "indoor";
})(TravelRestriction || (exports.TravelRestriction = TravelRestriction = {}));
/**
 * Directions results contain text within distance fields that may be displayed to the user to indicate the distance of
 * a particular "step" of the route. By default, this text uses the unit system of the origin's country or region.
 */
var UnitSystem;
(function (UnitSystem) {
    /** specifies usage of the metric system. Textual distances are returned using kilometers and meters. */
    UnitSystem["metric"] = "metric";
    /** specifies usage of the Imperial (English) system. Textual distances are returned using miles and feet. */
    UnitSystem["imperial"] = "imperial";
})(UnitSystem || (exports.UnitSystem = UnitSystem = {}));
var TrafficModel;
(function (TrafficModel) {
    /**
     * indicates that the returned `duration_in_traffic` should be the best estimate of travel time given what is known about
     * both historical traffic conditions and live traffic. Live traffic becomes more important the closer the `departure_time` is to now.
     */
    TrafficModel["best_guess"] = "best_guess";
    /**
     * indicates that the returned `duration_in_traffic` should be longer than the actual travel time on most days,
     * though occasional days with particularly bad traffic conditions may exceed this value.
     */
    TrafficModel["pessimistic"] = "pessimistic";
    /**
     * indicates that the returned `duration_in_traffic` should be shorter than the actual travel time on most days,
     * though occasional days with particularly good traffic conditions may be faster than this value.
     */
    TrafficModel["optimistic"] = "optimistic";
})(TrafficModel || (exports.TrafficModel = TrafficModel = {}));
var TransitMode;
(function (TransitMode) {
    /** indicates that the calculated route should prefer travel by bus. */
    TransitMode["bus"] = "bus";
    /** indicates that the calculated route should prefer travel by subway. */
    TransitMode["subway"] = "subway";
    /** indicates that the calculated route should prefer travel by train. */
    TransitMode["train"] = "train";
    /** indicates that the calculated route should prefer travel by tram and light rail. */
    TransitMode["tram"] = "tram";
    /**
     * indicates that the calculated route should prefer travel by train, tram, light rail, and subway.
     * This is equivalent to `transit_mode=train|tram|subway`
     */
    TransitMode["rail"] = "rail";
})(TransitMode || (exports.TransitMode = TransitMode = {}));
var TransitRoutingPreference;
(function (TransitRoutingPreference) {
    /** indicates that the calculated route should prefer limited amounts of walking. */
    TransitRoutingPreference["less_walking"] = "less_walking";
    /** indicates that the calculated route should prefer a limited number of transfers. */
    TransitRoutingPreference["fewer_transfers"] = "fewer_transfers";
})(TransitRoutingPreference || (exports.TransitRoutingPreference = TransitRoutingPreference = {}));
/**
 * The `status` field within the Directions response object contains the status of the request, and may contain debugging information
 * to help you track down why the Directions service failed.
 */
var DirectionsResponseStatus;
(function (DirectionsResponseStatus) {
    /** indicates the response contains a valid `result`. */
    DirectionsResponseStatus["OK"] = "OK";
    /** indicates at least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded. */
    DirectionsResponseStatus["NOT_FOUND"] = "NOT_FOUND";
    /** indicates no route could be found between the origin and destination. */
    DirectionsResponseStatus["ZERO_RESULTS"] = "ZERO_RESULTS";
    /**
     * indicates that too many `waypoints` were provided in the request. For applications using the Directions API as a web service,
     * or the [directions service in the Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/directions),
     * the maximum allowed number of `waypoints` is 23, plus the origin and destination.
     */
    DirectionsResponseStatus["MAX_WAYPOINTS_EXCEEDED"] = "MAX_WAYPOINTS_EXCEEDED";
    /**
     * indicates the requested route is too long and cannot be processed.
     * This error occurs when more complex directions are returned.
     * Try reducing the number of waypoints, turns, or instructions.
     */
    DirectionsResponseStatus["MAX_ROUTE_LENGTH_EXCEEDED"] = "MAX_ROUTE_LENGTH_EXCEEDED";
    /** indicates that the provided request was invalid. Common causes of this status include an invalid parameter or parameter value. */
    DirectionsResponseStatus["INVALID_REQUEST"] = "INVALID_REQUEST";
    /**
     * indicates any of the following:
     *  - The API key is missing or invalid.
     *  - Billing has not been enabled on your account.
     *  - A self-imposed usage cap has been exceeded.
     *  - The provided method of payment is no longer valid (for example, a credit card has expired).
     * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.
     */
    DirectionsResponseStatus["OVER_DAILY_LIMIT"] = "OVER_DAILY_LIMIT";
    /** indicates the service has received too many requests from your application within the allowed time period. */
    DirectionsResponseStatus["OVER_QUERY_LIMIT"] = "OVER_QUERY_LIMIT";
    /** indicates that the service denied use of the directions service by your application. */
    DirectionsResponseStatus["REQUEST_DENIED"] = "REQUEST_DENIED";
    /** indicates a directions request could not be processed due to a server error. The request may succeed if you try again. */
    DirectionsResponseStatus["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
})(DirectionsResponseStatus || (exports.DirectionsResponseStatus = DirectionsResponseStatus = {}));
/**
 * The `status` field within the Directions response object contains the status of the request, and may contain debugging information
 * to help you track down why the Directions service failed.
 * @deprecated
 */
var DirectionsReponseStatus;
(function (DirectionsReponseStatus) {
    /** indicates the response contains a valid `result`. */
    DirectionsReponseStatus["OK"] = "OK";
    /** indicates at least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded. */
    DirectionsReponseStatus["NOT_FOUND"] = "NOT_FOUND";
    /** indicates no route could be found between the origin and destination. */
    DirectionsReponseStatus["ZERO_RESULTS"] = "ZERO_RESULTS";
    /**
     * indicates that too many `waypoints` were provided in the request. For applications using the Directions API as a web service,
     * or the [directions service in the Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/directions),
     * the maximum allowed number of `waypoints` is 23, plus the origin and destination.
     */
    DirectionsReponseStatus["MAX_WAYPOINTS_EXCEEDED"] = "MAX_WAYPOINTS_EXCEEDED";
    /**
     * indicates the requested route is too long and cannot be processed.
     * This error occurs when more complex directions are returned.
     * Try reducing the number of waypoints, turns, or instructions.
     */
    DirectionsReponseStatus["MAX_ROUTE_LENGTH_EXCEEDED"] = "MAX_ROUTE_LENGTH_EXCEEDED";
    /** indicates that the provided request was invalid. Common causes of this status include an invalid parameter or parameter value. */
    DirectionsReponseStatus["INVALID_REQUEST"] = "INVALID_REQUEST";
    /**
     * indicates any of the following:
     *  - The API key is missing or invalid.
     *  - Billing has not been enabled on your account.
     *  - A self-imposed usage cap has been exceeded.
     *  - The provided method of payment is no longer valid (for example, a credit card has expired).
     * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.
     */
    DirectionsReponseStatus["OVER_DAILY_LIMIT"] = "OVER_DAILY_LIMIT";
    /** indicates the service has received too many requests from your application within the allowed time period. */
    DirectionsReponseStatus["OVER_QUERY_LIMIT"] = "OVER_QUERY_LIMIT";
    /** indicates that the service denied use of the directions service by your application. */
    DirectionsReponseStatus["REQUEST_DENIED"] = "REQUEST_DENIED";
    /** indicates a directions request could not be processed due to a server error. The request may succeed if you try again. */
    DirectionsReponseStatus["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
})(DirectionsReponseStatus || (exports.DirectionsReponseStatus = DirectionsReponseStatus = {}));
var GeocodedWaypointStatus;
(function (GeocodedWaypointStatus) {
    /** indicates that no errors occurred; the address was successfully parsed and at least one geocode was returned. */
    GeocodedWaypointStatus["OK"] = "OK";
    /**
     * indicates that the geocode was successful but returned no results.
     * This may occur if the geocoder was passed a non-existent `address`.
     */
    GeocodedWaypointStatus["ZERO_RESULTS"] = "ZERO_RESULTS";
})(GeocodedWaypointStatus || (exports.GeocodedWaypointStatus = GeocodedWaypointStatus = {}));
exports.AddressType = Object.assign({}, PlaceType1, PlaceType2);
var Maneuver;
(function (Maneuver) {
    Maneuver["turn_slight_left"] = "turn-slight-left";
    Maneuver["turn_sharp_left"] = "turn-sharp-left";
    Maneuver["uturn_left"] = "uturn-left";
    Maneuver["turn_left"] = "turn-left";
    Maneuver["turn_slight_right"] = "turn-slight-right";
    Maneuver["turn_sharp_right"] = "turn-sharp-right";
    Maneuver["uturn_right"] = "uturn-right";
    Maneuver["turn_right"] = "turn-right";
    Maneuver["straight"] = "straight";
    Maneuver["ramp_left"] = "ramp-left";
    Maneuver["ramp_right"] = "ramp-right";
    Maneuver["merge"] = "merge";
    Maneuver["fork_left"] = "fork-left";
    Maneuver["fork_right"] = "fork-right";
    Maneuver["ferry"] = "ferry";
    Maneuver["ferry_train"] = "ferry-train";
    Maneuver["roundabout_left"] = "roundabout-left";
    Maneuver["roundabout_right"] = "roundabout-right";
})(Maneuver || (exports.Maneuver = Maneuver = {}));
/** @see https://developers.google.com/maps/documentation/directions/intro#VehicleType. */
var VehicleType;
(function (VehicleType) {
    /** Rail. */
    VehicleType["RAIL"] = "RAIL";
    /** Light rail transit. */
    VehicleType["METRO_RAIL"] = "METRO_RAIL";
    /** Underground light rail. */
    VehicleType["SUBWAY"] = "SUBWAY";
    /** Above ground light rail. */
    VehicleType["TRAM"] = "TRAM";
    /** Monorail. */
    VehicleType["MONORAIL"] = "MONORAIL";
    /** Heavy rail. */
    VehicleType["HEAVY_RAIL"] = "HEAVY_RAIL";
    /** Commuter rail. */
    VehicleType["COMMUTER_TRAIN"] = "COMMUTER_TRAIN";
    /** High speed train. */
    VehicleType["HIGH_SPEED_TRAIN"] = "HIGH_SPEED_TRAIN";
    /** Bus. */
    VehicleType["BUS"] = "BUS";
    /** Intercity bus. */
    VehicleType["INTERCITY_BUS"] = "INTERCITY_BUS";
    /** Trolleybus. */
    VehicleType["TROLLEYBUS"] = "TROLLEYBUS";
    /** Share taxi is a kind of bus with the ability to drop off and pick up passengers anywhere on its route. */
    VehicleType["SHARE_TAXI"] = "SHARE_TAXI";
    /** Ferry. */
    VehicleType["FERRY"] = "FERRY";
    /** A vehicle that operates on a cable, usually on the ground. Aerial cable cars may be of the type `GONDOLA_LIFT`. */
    VehicleType["CABLE_CAR"] = "CABLE_CAR";
    /** An aerial cable car. */
    VehicleType["GONDOLA_LIFT"] = "GONDOLA_LIFT";
    /**
     * A vehicle that is pulled up a steep incline by a cable.
     * A Funicular typically consists of two cars, with each car acting as a counterweight for the other.
     */
    VehicleType["FUNICULAR"] = "FUNICULAR";
    /** All other vehicles will return this type. */
    VehicleType["OTHER"] = "OTHER";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
var GeocodingAddressComponentType;
(function (GeocodingAddressComponentType) {
    /** indicates the floor of a building address. */
    GeocodingAddressComponentType["floor"] = "floor";
    /** typically indicates a place that has not yet been categorized. */
    GeocodingAddressComponentType["establishment"] = "establishment";
    /** indicates a named point of interest. */
    GeocodingAddressComponentType["point_of_interest"] = "point_of_interest";
    /** indicates a parking lot or parking structure. */
    GeocodingAddressComponentType["parking"] = "parking";
    /** indicates a specific postal box. */
    GeocodingAddressComponentType["post_box"] = "post_box";
    /** indicates a grouping of geographic areas, such as locality and sublocality, used for mailing addresses in some countries. */
    GeocodingAddressComponentType["postal_town"] = "postal_town";
    /** indicates the room of a building address. */
    GeocodingAddressComponentType["room"] = "room";
    /** indicates the precise street number. */
    GeocodingAddressComponentType["street_number"] = "street_number";
    /**  indicate the location of a bus. */
    GeocodingAddressComponentType["bus_station"] = "bus_station";
    /**  indicate the location of a train. */
    GeocodingAddressComponentType["train_station"] = "train_station";
    /**  indicate the location of a public transit stop. */
    GeocodingAddressComponentType["transit_station"] = "transit_station";
})(GeocodingAddressComponentType || (exports.GeocodingAddressComponentType = GeocodingAddressComponentType = {}));
var LocationType;
(function (LocationType) {
    /**
     * indicates that the returned result is a precise geocode for which we have location information
     * accurate down to street address precision
     */
    LocationType["ROOFTOP"] = "ROOFTOP";
    /**
     * indicates that the returned result reflects an approximation (usually on a road) interpolated between two precise points
     * (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.
     */
    LocationType["RANGE_INTERPOLATED"] = "RANGE_INTERPOLATED";
    /**
     * indicates that the returned result is the geometric center of a result such as a polyline
     * (for example, a street) or polygon (region).
     */
    LocationType["GEOMETRIC_CENTER"] = "GEOMETRIC_CENTER";
    /** indicates that the returned result is approximate. */
    LocationType["APPROXIMATE"] = "APPROXIMATE";
})(LocationType || (exports.LocationType = LocationType = {}));
var RadioType;
(function (RadioType) {
    RadioType["lte"] = "lte";
    RadioType["gsm"] = "gsm";
    RadioType["cdma"] = "cdma";
    RadioType["wcdma"] = "wcdma";
})(RadioType || (exports.RadioType = RadioType = {}));
//# sourceMappingURL=common.js.map