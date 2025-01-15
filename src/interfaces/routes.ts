import { LatLng } from "../common";

/**
 * Encapsulates a location (a geographic point, and an optional heading).
 */
export interface RouteLocation {
  /**
   * The waypoint's geographic coordinates.
   */
  latLng: LatLng;

  /**
   * The compass heading associated with the direction of the flow of traffic.
   * This value specifies the side of the road for pickup and drop-off.
   * Heading values can be from 0 to 360, where 0 specifies a heading of due North,
   * 90 specifies a heading of due East, and so on.
   * You can use this field only for DRIVE and TWO_WHEELER RouteTravelMode.
   */
  heading?: number;
}

/**
 * Information related to how and why a fallback result was used. If this field is set,
 * then it means the server used a different routing mode from your preferred mode as fallback.
 */
export interface FallbackInfo {
  /**
   * Routing mode used for the response. If fallback was triggered, the mode may be different
   * from the routing preference set in the original client request.
   */
  routingMode: FallbackRoutingMode;

  /**
   * The reason why a fallback response was used instead of the original response.
   * This field is only populated when the fallback mode is triggered and the fallback response is returned.
   */
  reason: FallbackReason;
}

/**
 * Enums representing the possible routing modes used in fallback scenarios.
 */
export enum FallbackRoutingMode {
  /** Not used. */
  FALLBACK_ROUTING_MODE_UNSPECIFIED = "FALLBACK_ROUTING_MODE_UNSPECIFIED",
  /** Indicates the TRAFFIC_UNAWARE RoutingPreference was used to compute the response. */
  FALLBACK_TRAFFIC_UNAWARE = "FALLBACK_TRAFFIC_UNAWARE",
  /** Indicates the TRAFFIC_AWARE RoutingPreference was used to compute the response. */
  FALLBACK_TRAFFIC_AWARE = "FALLBACK_TRAFFIC_AWARE",
}

/**
 * Enums representing the possible reasons for using a fallback response.
 */
export enum FallbackReason {
  /** No fallback reason specified. */
  FALLBACK_REASON_UNSPECIFIED = "FALLBACK_REASON_UNSPECIFIED",
  /** A server error happened while calculating routes with your preferred routing mode, but an alternative mode was used. */
  SERVER_ERROR = "SERVER_ERROR",
  /** Calculation with your preferred routing mode exceeded latency limits, so an alternative mode was used. */
  LATENCY_EXCEEDED = "LATENCY_EXCEEDED",
}

/**
 * Encapsulates a waypoint. Waypoints mark both the beginning and end of a route, and include intermediate stops along the route. (Routes API)
 */
export interface Waypoint {
  /**
   * Marks this waypoint as a milestone rather than a stopping point.
   * For each non-via waypoint in the request, the response appends an entry to the legs array
   * to provide the details for stopovers on that leg of the trip. Set this value to true when
   * you want the route to pass through this waypoint without stopping over. Via waypoints
   * don't cause an entry to be added to the legs array, but they do route the journey through
   * the waypoint.
   *
   * If ComputeRoutesRequest.optimize_waypoint_order is set to true then this field cannot be
   * set to true; otherwise, the request fails.
   */
  via?: boolean;

  /**
   * Indicates that the waypoint is meant for vehicles to stop at, where the intention is to
   * either pickup or drop-off. When you set this value, the calculated route won't include
   * non-via waypoints on roads that are unsuitable for pickup and drop-off.
   *
   * This option works only for DRIVE and TWO_WHEELER travel modes, and when the locationType
   * is `location`.
   */
  vehicleStopover?: boolean;

  /**
   * Indicates that the location of this waypoint is meant to have a preference for the vehicle
   * to stop at a particular side of the road. When you set this value, the route will pass
   * through the location so that the vehicle can stop at the side of the road that the
   * location is biased towards from the center of the road.
   *
   * This option works only for DRIVE and TWO_WHEELER RouteTravelMode.
   */
  sideOfRoad?: boolean;

  // Union field location_type can be only one of the following:

  /**
   * A point specified using geographic coordinates, including an optional heading.
   */
  location?: {
    latLng: LatLng;
    heading?: number;
  };

  /**
   * The POI Place ID associated with the waypoint.
   */
  placeId?: string;

  /**
   * Human-readable address or a plus code. See https://plus.codes for details.
   */
  address?: string;
}

/**
 * Specifies the preferred type of polyline to be returned. (Routes API)
 */
export enum PolylineEncoding {
  /**
   * No polyline type preference specified. Defaults to ENCODED_POLYLINE.
   */
  POLYLINE_ENCODING_UNSPECIFIED = "POLYLINE_ENCODING_UNSPECIFIED",

  /**
   * Specifies a polyline encoded using the polyline encoding algorithm.
   */
  ENCODED_POLYLINE = "ENCODED_POLYLINE",

  /**
   * Specifies a polyline using the GeoJSON LineString format.
   */
  GEO_JSON_LINESTRING = "GEO_JSON_LINESTRING",
}

/**
 * A supported reference route on the ComputeRoutesRequest. (Routes API)
 */
export enum ReferenceRoute {
  /**
   * Not used. Requests containing this value will fail.
   */
  REFERENCE_ROUTE_UNSPECIFIED = "REFERENCE_ROUTE_UNSPECIFIED",

  /**
   * Fuel-efficient route. Routes labeled with this value are optimized for parameters such as fuel consumption.
   */
  FUEL_EFFICIENT = "FUEL_EFFICIENT",
}

/**
 * A set of values that specify the quality of the polyline. (Routes API)
 */
export enum PolylineQuality {
  /**
   * No polyline quality preference specified. Defaults to OVERVIEW.
   */
  POLYLINE_QUALITY_UNSPECIFIED = "POLYLINE_QUALITY_UNSPECIFIED",

  /**
   * Specifies a high-quality polyline, which is composed using more points than OVERVIEW,
   * at the cost of increased response size. Use this value when you need more precision.
   */
  HIGH_QUALITY = "HIGH_QUALITY",

  /**
   * Specifies an overview polyline, which is composed using a small number of points.
   * Use this value when displaying an overview of the route.
   * Using this option has a lower request latency compared to using the HIGH_QUALITY option.
   */
  OVERVIEW = "OVERVIEW",
}

/**
 * A set of values that specify factors to take into consideration when calculating the route. (Routes API)
 */
export enum RoutingPreference {
  /**
   * No routing preference specified. Defaults to TRAFFIC_UNAWARE.
   */
  ROUTING_PREFERENCE_UNSPECIFIED = "ROUTING_PREFERENCE_UNSPECIFIED",

  /**
   * Computes routes without taking live traffic conditions into consideration.
   * - Suitable when traffic conditions don't matter or are not applicable.
   * - Produces the lowest latency.
   * - Note: For `RouteTravelMode.DRIVE` and `RouteTravelMode.TWO_WHEELER`, the route and duration are based on the road network and average time-independent traffic conditions, not current road conditions.
   * - May include roads that are temporarily closed.
   * - Results may vary over time due to changes in the road network, updated average traffic conditions, and the distributed nature of the service.
   * - Results may also vary between nearly-equivalent routes at any time or frequency.
   */
  TRAFFIC_UNAWARE = "TRAFFIC_UNAWARE",

  /**
   * Calculates routes taking live traffic conditions into consideration.
   * - Some optimizations are applied to significantly reduce latency.
   * - Provides a balance between accuracy and performance.
   */
  TRAFFIC_AWARE = "TRAFFIC_AWARE",

  /**
   * Calculates routes taking live traffic conditions into consideration, without applying most performance optimizations.
   * - Produces the highest latency.
   * - Best for scenarios where the most accurate route based on current traffic is required, and latency is not a concern.
   */
  TRAFFIC_AWARE_OPTIMAL = "TRAFFIC_AWARE_OPTIMAL",
}

/**
 * Enum representing the vehicle's emission type.
 * Applies only to the `DRIVE` RouteTravelMode. (Routes API)
 */
export enum VehicleEmissionType {
  /** Not specified. Defaults to GASOLINE. */
  VEHICLE_EMISSION_TYPE_UNSPECIFIED = "VEHICLE_EMISSION_TYPE_UNSPECIFIED",
  /** Gasoline powered vehicle. */
  GASOLINE = "GASOLINE",
  /** Electric powered vehicle. */
  ELECTRIC = "ELECTRIC",
  /** Hybrid vehicle. */
  HYBRID = "HYBRID",
  /** Diesel powered vehicle. */
  DIESEL = "DIESEL",
}

/**
 * Contains the vehicle information, such as the vehicle emission type. (Routes API)
 */
export interface VehicleInfo {
  /**
   * Describes the vehicle's emission type.
   * - Applies only to the `DRIVE` RouteTravelMode.
   */
  emissionType?: VehicleEmissionType;
}

/**
 * Enum representing the list of toll passes supported around the world. (Routes API)
 */
export enum TollPass {
  /** Not used. If this value is used, the request will fail. */
  TOLL_PASS_UNSPECIFIED = "TOLL_PASS_UNSPECIFIED",

  /** Sydney toll pass. See additional details at https://www.myetoll.com.au. */
  AU_ETOLL_TAG = "AU_ETOLL_TAG",

  /** Sydney toll pass. See additional details at https://www.tollpay.com.au. */
  AU_EWAY_TAG = "AU_EWAY_TAG",

  /** Australia-wide toll pass. See additional details at https://www.linkt.com.au/. */
  AU_LINKT = "AU_LINKT",

  /** Argentina toll pass. See additional details at https://telepase.com.ar. */
  AR_TELEPASE = "AR_TELEPASE",

  /** Brazil toll pass. See additional details at https://www.autoexpreso.com. */
  BR_AUTO_EXPRESO = "BR_AUTO_EXPRESO",

  /** Brazil toll pass. See additional details at https://conectcar.com. */
  BR_CONECTCAR = "BR_CONECTCAR",

  /** Brazil toll pass. See additional details at https://movemais.com. */
  BR_MOVE_MAIS = "BR_MOVE_MAIS",

  /** Brazil toll pass. See additional details at https://pasorapido.gob.do/. */
  BR_PASSA_RAPIDO = "BR_PASSA_RAPIDO",

  /** Brazil toll pass. See additional details at https://www.semparar.com.br. */
  BR_SEM_PARAR = "BR_SEM_PARAR",

  /** Brazil toll pass. See additional details at https://taggy.com.br. */
  BR_TAGGY = "BR_TAGGY",

  /** Brazil toll pass. See additional details at https://veloe.com.br/site/onde-usar. */
  BR_VELOE = "BR_VELOE",

  /** Canada to United States border crossing. */
  CA_US_AKWASASNE_SEAWAY_CORPORATE_CARD = "CA_US_AKWASASNE_SEAWAY_CORPORATE_CARD",

  /** Canada to United States border crossing. */
  CA_US_AKWASASNE_SEAWAY_TRANSIT_CARD = "CA_US_AKWASASNE_SEAWAY_TRANSIT_CARD",

  /** Ontario, Canada to Michigan, United States border crossing. */
  CA_US_BLUE_WATER_EDGE_PASS = "CA_US_BLUE_WATER_EDGE_PASS",

  /** Ontario, Canada to Michigan, United States border crossing. */
  CA_US_CONNEXION = "CA_US_CONNEXION",

  /** Canada to United States border crossing. */
  CA_US_NEXUS_CARD = "CA_US_NEXUS_CARD",

  /** Indonesia toll pass. E-card provided by multiple banks. */
  ID_E_TOLL = "ID_E_TOLL",

  /** India toll pass. */
  IN_FASTAG = "IN_FASTAG",

  /** India, HP state plate exemption. */
  IN_LOCAL_HP_PLATE_EXEMPT = "IN_LOCAL_HP_PLATE_EXEMPT",

  /** Japan ETC. Electronic wireless system to collect tolls. See https://www.go-etc.jp/ */
  JP_ETC = "JP_ETC",

  /** Japan ETC2.0. New version of ETC with further discounts. See https://www.go-etc.jp/etc2/index.html */
  JP_ETC2 = "JP_ETC2",

  /** Mexico toll pass. See https://iave.capufe.gob.mx/#/ */
  MX_IAVE = "MX_IAVE",

  /** Mexico toll pass. See https://www.pase.com.mx */
  MX_PASE = "MX_PASE",

  /** Mexico toll pass. See https://operadoravial.com/quick-pass/ */
  MX_QUICKPASS = "MX_QUICKPASS",

  /** Mexico toll pass. */
  MX_SISTEMA_TELEPEAJE_CHIHUAHUA = "MX_SISTEMA_TELEPEAJE_CHIHUAHUA",

  /** Mexico toll pass. */
  MX_TAG_IAVE = "MX_TAG_IAVE",

  /** Mexico toll pass company. See https://www.televia.com.mx. */
  MX_TAG_TELEVIA = "MX_TAG_TELEVIA",

  /** Mexico toll pass company. See https://www.televia.com.mx */
  MX_TELEVIA = "MX_TELEVIA",

  /** Mexico toll pass. See https://www.viapass.com.mx/viapass/web_home.aspx */
  MX_VIAPASS = "MX_VIAPASS",

  /** AL, USA toll pass. */
  US_AL_FREEDOM_PASS = "US_AL_FREEDOM_PASS",

  /** AK, USA tunnel pass. */
  US_AK_ANTON_ANDERSON_TUNNEL_BOOK_OF_10_TICKETS = "US_AK_ANTON_ANDERSON_TUNNEL_BOOK_OF_10_TICKETS",

  /** CA, USA toll pass. */
  US_CA_FASTRAK = "US_CA_FASTRAK",

  /** CA, USA FasTrak with Clean Air Vehicle (CAV) sticker. */
  US_CA_FASTRAK_CAV_STICKER = "US_CA_FASTRAK_CAV_STICKER",

  /** CO, USA toll pass. */
  US_CO_EXPRESSTOLL = "US_CO_EXPRESSTOLL",

  /** CO, USA toll pass. */
  US_CO_GO_PASS = "US_CO_GO_PASS",

  /** DE, USA toll pass. */
  US_DE_EZPASSDE = "US_DE_EZPASSDE",

  /** FL, USA toll bridge pass. */
  US_FL_BOB_SIKES_TOLL_BRIDGE_PASS = "US_FL_BOB_SIKES_TOLL_BRIDGE_PASS",

  /** FL, USA community express card. */
  US_FL_DUNES_COMMUNITY_DEVELOPMENT_DISTRICT_EXPRESSCARD = "US_FL_DUNES_COMMUNITY_DEVELOPMENT_DISTRICT_EXPRESSCARD",

  /** FL, USA toll pass. */
  US_FL_EPASS = "US_FL_EPASS",

  /** FL, USA toll pass. */
  US_FL_GIBA_TOLL_PASS = "US_FL_GIBA_TOLL_PASS",

  /** FL, USA toll pass. */
  US_FL_LEEWAY = "US_FL_LEEWAY",

  /** FL, USA toll pass. */
  US_FL_SUNPASS = "US_FL_SUNPASS",

  /** FL, USA toll pass. */
  US_FL_SUNPASS_PRO = "US_FL_SUNPASS_PRO",

  /** IL, USA toll pass. */
  US_IL_EZPASSIL = "US_IL_EZPASSIL",

  /** IL, USA toll pass. */
  US_IL_IPASS = "US_IL_IPASS",

  /** IN, USA toll pass. */
  US_IN_EZPASSIN = "US_IN_EZPASSIN",

  /** KS, USA toll pass. */
  US_KS_BESTPASS_HORIZON = "US_KS_BESTPASS_HORIZON",

  /** KS, USA toll pass. */
  US_KS_KTAG = "US_KS_KTAG",

  /** KS, USA toll pass. */
  US_KS_NATIONALPASS = "US_KS_NATIONALPASS",

  /** KS, USA toll pass. */
  US_KS_PREPASS_ELITEPASS = "US_KS_PREPASS_ELITEPASS",

  /** KY, USA toll pass. */
  US_KY_RIVERLINK = "US_KY_RIVERLINK",

  /** LA, USA toll pass. */
  US_LA_GEAUXPASS = "US_LA_GEAUXPASS",

  /** LA, USA toll pass. */
  US_LA_TOLL_TAG = "US_LA_TOLL_TAG",

  /** MA, USA toll pass. */
  US_MA_EZPASSMA = "US_MA_EZPASSMA",

  /** MD, USA toll pass. */
  US_MD_EZPASSMD = "US_MD_EZPASSMD",

  /** ME, USA toll pass. */
  US_ME_EZPASSME = "US_ME_EZPASSME",

  /** MI, USA toll pass. */
  US_MI_AMBASSADOR_BRIDGE_PREMIER_COMMUTER_CARD = "US_MI_AMBASSADOR_BRIDGE_PREMIER_COMMUTER_CARD",

  /** MI, USA toll pass. */
  US_MI_BCPASS = "US_MI_BCPASS",

  /** MI, USA toll bridge pass tag. */
  US_MI_GROSSE_ILE_TOLL_BRIDGE_PASS_TAG = "US_MI_GROSSE_ILE_TOLL_BRIDGE_PASS_TAG",

  /** MI, USA toll pass. */
  US_MI_IQ_TAG = "US_MI_IQ_TAG",

  /** MI, USA toll pass. */
  US_MI_MACKINAC_BRIDGE_MAC_PASS = "US_MI_MACKINAC_BRIDGE_MAC_PASS",

  /** MI, USA toll pass. */
  US_MI_NEXPRESS_TOLL = "US_MI_NEXPRESS_TOLL",

  /** MN, USA toll pass. */
  US_MN_EZPASSMN = "US_MN_EZPASSMN",

  /** NC, USA toll pass. */
  US_NC_EZPASSNC = "US_NC_EZPASSNC",

  /** NC, USA toll pass. */
  US_NC_PEACH_PASS = "US_NC_PEACH_PASS",

  /** NC, USA toll pass. */
  US_NC_QUICK_PASS = "US_NC_QUICK_PASS",

  /** NH, USA toll pass. */
  US_NH_EZPASSNH = "US_NH_EZPASSNH",

  /** NJ, USA toll pass. */
  US_NJ_DOWNBEACH_EXPRESS_PASS = "US_NJ_DOWNBEACH_EXPRESS_PASS",

  /** NJ, USA toll pass. */
  US_NJ_EZPASSNJ = "US_NJ_EZPASSNJ",

  /** NY, USA toll pass. */
  US_NY_EXPRESSPASS = "US_NY_EXPRESSPASS",

  /** NY, USA toll pass. */
  US_NY_EZPASSNY = "US_NY_EZPASSNY",

  /** OH, USA toll pass. */
  US_OH_EZPASSOH = "US_OH_EZPASSOH",

  /** PA, USA toll pass. */
  US_PA_EZPASSPA = "US_PA_EZPASSPA",

  /** RI, USA toll pass. */
  US_RI_EZPASSRI = "US_RI_EZPASSRI",

  /** SC, USA toll pass. */
  US_SC_PALPASS = "US_SC_PALPASS",

  /** TX, USA toll pass. */
  US_TX_AVI_TAG = "US_TX_AVI_TAG",

  /** TX, USA toll pass. */
  US_TX_BANCPASS = "US_TX_BANCPASS",

  /** TX, USA toll pass. */
  US_TX_DEL_RIO_PASS = "US_TX_DEL_RIO_PASS",

  /** TX, USA toll pass. */
  US_TX_EFAST_PASS = "US_TX_EFAST_PASS",

  /** TX, USA toll pass. */
  US_TX_EAGLE_PASS_EXPRESS_CARD = "US_TX_EAGLE_PASS_EXPRESS_CARD",

  /** TX, USA toll pass. */
  US_TX_EPTOLL = "US_TX_EPTOLL",

  /** TX, USA toll pass. */
  US_TX_EZ_CROSS = "US_TX_EZ_CROSS",

  /** TX, USA toll pass. */
  US_TX_EZTAG = "US_TX_EZTAG",

  /** TX, USA toll pass. */
  US_TX_FUEGO_TAG = "US_TX_FUEGO_TAG",

  /** TX, USA toll pass. */
  US_TX_LAREDO_TRADE_TAG = "US_TX_LAREDO_TRADE_TAG",

  /** TX, USA toll pass. */
  US_TX_PLUSPASS = "US_TX_PLUSPASS",

  /** TX, USA toll pass. */
  US_TX_TOLLTAG = "US_TX_TOLLTAG",

  /** TX, USA toll pass. */
  US_TX_TXTAG = "US_TX_TXTAG",

  /** TX, USA toll pass. */
  US_TX_XPRESS_CARD = "US_TX_XPRESS_CARD",

  /** UT, USA toll pass. */
  US_UT_ADAMS_AVE_PARKWAY_EXPRESSCARD = "US_UT_ADAMS_AVE_PARKWAY_EXPRESSCARD",

  /** VA, USA toll pass. */
  US_VA_EZPASSVA = "US_VA_EZPASSVA",

  /** WA, USA toll pass. */
  US_WA_BREEZEBY = "US_WA_BREEZEBY",

  /** WA, USA toll pass. */
  US_WA_GOOD_TO_GO = "US_WA_GOOD_TO_GO",

  /** WV, USA toll pass. */
  US_WV_EZPASSWV = "US_WV_EZPASSWV",

  /** WV, USA toll bridge ticket. */
  US_WV_MEMORIAL_BRIDGE_TICKETS = "US_WV_MEMORIAL_BRIDGE_TICKETS",

  /** WV, USA toll pass. */
  US_WV_MOV_PASS = "US_WV_MOV_PASS",

  /** WV, USA toll bridge ticket. */
  US_WV_NEWELL_TOLL_BRIDGE_TICKET = "US_WV_NEWELL_TOLL_BRIDGE_TICKET",
}

/**
 * Encapsulates a set of optional conditions to satisfy when calculating the routes. (Routes API)
 */
export interface RouteModifiers {
  /**
   * When set to true, avoids toll roads where reasonable, giving preference to routes not containing toll roads.
   * - Applies only to the `DRIVE` and `TWO_WHEELER` RouteTravelMode.
   */
  avoidTolls?: boolean;

  /**
   * When set to true, avoids highways where reasonable, giving preference to routes not containing highways.
   * - Applies only to the `DRIVE` and `TWO_WHEELER` RouteTravelMode.
   */
  avoidHighways?: boolean;

  /**
   * When set to true, avoids ferries where reasonable, giving preference to routes not containing ferries.
   * - Applies only to the `DRIVE` and `TWO_WHEELER` RouteTravelMode.
   */
  avoidFerries?: boolean;

  /**
   * When set to true, avoids navigating indoors where reasonable, giving preference to routes not containing indoor navigation.
   * - Applies only to the `WALK` RouteTravelMode.
   */
  avoidIndoor?: boolean;

  /**
   * Specifies the vehicle information to consider when calculating routes.
   */
  vehicleInfo?: VehicleInfo;

  /**
   * Encapsulates information about toll passes.
   * - If toll passes are provided, the API tries to return the pass price.
   * - If toll passes are not provided, the API treats the toll pass as unknown and tries to return the cash price.
   * - Applies only to the `DRIVE` and `TWO_WHEELER` RouteTravelMode.
   */
  tollPasses?: TollPass[];
}

/**
 * Enum representing extra computations that can be performed while completing the request. (Routes API)
 */
export enum ExtraComputation {
  /** Not used. Requests containing this value will fail. */
  EXTRA_COMPUTATION_UNSPECIFIED = "EXTRA_COMPUTATION_UNSPECIFIED",

  /** Toll information for the route(s). */
  TOLLS = "TOLLS",

  /** Estimated fuel consumption for the route(s). */
  FUEL_CONSUMPTION = "FUEL_CONSUMPTION",

  /** Traffic aware polylines for the route(s). */
  TRAFFIC_ON_POLYLINE = "TRAFFIC_ON_POLYLINE",

  /**
   * Navigation instructions presented as a formatted HTML text string.
   * This content is meant to be read as-is and is for display only.
   * Do not programmatically parse this content.
   */
  HTML_FORMATTED_NAVIGATION_INSTRUCTIONS = "HTML_FORMATTED_NAVIGATION_INSTRUCTIONS",
}

/**
 * Enum representing the transit travel modes that can be used when getting a TRANSIT route. (Routes API)
 */
export enum TransitTravelMode {
  /** Not specified. Defaults to all supported modes of travel. */
  TRANSIT_TRAVEL_MODE_UNSPECIFIED = "TRANSIT_TRAVEL_MODE_UNSPECIFIED",

  /** Travel mode by bus. */
  BUS = "BUS",

  /** Travel mode by subway. */
  SUBWAY = "SUBWAY",

  /** Travel mode by train. */
  TRAIN = "TRAIN",

  /** Travel mode by tram/light rail. */
  TRAM = "TRAM",

  /** Travel mode by rail. */
  RAIL = "RAIL",
}

/**
 * Enum representing the routing preference for TRANSIT routes. (Routes API)
 */
export enum TransitRoutingPreference {
  /** No routing preference specified. */
  ROUTING_PREFERENCE_UNSPECIFIED = "ROUTING_PREFERENCE_UNSPECIFIED",

  /** Prefers routes with less walking. */
  LESS_WALKING = "LESS_WALKING",

  /** Prefers routes with fewer transfers. */
  FEWER_TRANSFERS = "FEWER_TRANSFERS",
}

/**
 * Interface representing preferences for TRANSIT-based routes that influence the route that is returned. (Routes API)
 */
export interface TransitPreferences {
  /**
   * A set of travel modes to use when getting a TRANSIT route.
   * Defaults to all supported modes of travel if not specified.
   */
  allowedTravelModes?: TransitTravelMode[];

  /**
   * A routing preference that, when specified, influences the TRANSIT route returned.
   */
  routingPreference?: TransitRoutingPreference;
}

/**
 * Enum representing the mode of travel for route calculations. (Routes API)
 *
 * NOTE: WALK, BICYCLE, and TWO_WHEELER routes are in beta and might sometimes be missing clear sidewalks, pedestrian paths,
 * or bicycling paths. You must display this warning to the user for all walking, bicycling, and two-wheel routes
 * that you display in your app.
 */
export enum RouteTravelMode {
  /** No travel mode specified. Defaults to DRIVE. */
  TRAVEL_MODE_UNSPECIFIED = "TRAVEL_MODE_UNSPECIFIED",

  /** Travel by passenger car. */
  DRIVE = "DRIVE",

  /** Travel by bicycle. */
  BICYCLE = "BICYCLE",

  /** Travel by walking. */
  WALK = "WALK",

  /** Travel by a two-wheeled, motorized vehicle (e.g., motorcycle). */
  TWO_WHEELER = "TWO_WHEELER",

  /** Travel by public transit routes, where available. */
  TRANSIT = "TRANSIT",
}

/**
 * Enum representing the unit of measure, used by Routes Api, used in the display. (Routes API)
 */
export enum RouteUnits {
  /** Units of measure not specified. Defaults to the unit of measure inferred from the request. */
  UNITS_UNSPECIFIED = "UNITS_UNSPECIFIED",

  /** Metric units of measure (e.g., kilometers, meters). */
  METRIC = "METRIC",

  /** Imperial (English) units of measure (e.g., miles, feet). */
  IMPERIAL = "IMPERIAL",
}

/**
 * Enum representing the assumptions to use when calculating time in traffic.
 * This setting affects the value returned in the `duration` field in the response,
 * which contains the predicted time in traffic based on historical averages. (Routes API)
 */
export enum RouteTrafficModel {
  /** Unused. If specified, will default to BEST_GUESS. */
  TRAFFIC_MODEL_UNSPECIFIED = "TRAFFIC_MODEL_UNSPECIFIED",

  /**
   * Indicates that the returned duration should be the best estimate of travel time
   * given what is known about both historical traffic conditions and live traffic.
   * Live traffic becomes more important the closer the `departureTime` is to now. (Routes API)
   */
  BEST_GUESS = "BEST_GUESS",

  /**
   * Indicates that the returned duration should be longer than the actual travel time
   * on most days, though occasional days with particularly bad traffic conditions may exceed this value.
   */
  PESSIMISTIC = "PESSIMISTIC",

  /**
   * Indicates that the returned duration should be shorter than the actual travel time
   * on most days, though occasional days with particularly good traffic conditions may be faster than this value.
   */
  OPTIMISTIC = "OPTIMISTIC",
}

/**
 * Interface representing an encoded polyline.  (Routes API)
 *
 * Encapsulates the type of polyline, which can be either an encoded polyline string
 * or a GeoJSON LineString object.
 */
export interface Polyline {
  /**
   * The string encoding of the polyline using the polyline encoding algorithm.
   */
  encodedPolyline?: string;

  /**
   * Specifies a polyline using the GeoJSON LineString format.
   */
  geoJsonLinestring?: GeoJsonLineString;
}

/**
 * Interface representing a GeoJSON LineString.  (Routes API)
 *
 * This is a simplified version of the GeoJSON LineString structure.
 */
export interface GeoJsonLineString {
  type: "LineString";
  coordinates: [number, number][];
}

/**
 * Enum representing labels for the Route that are useful to identify
 * specific properties of the route to compare against others. (Routes API)
 */
export enum RouteLabel {
  /** Default - not used. */
  ROUTE_LABEL_UNSPECIFIED = "ROUTE_LABEL_UNSPECIFIED",

  /** The default "best" route returned for the route computation. */
  DEFAULT_ROUTE = "DEFAULT_ROUTE",

  /** An alternative to the default "best" route. */
  DEFAULT_ROUTE_ALTERNATE = "DEFAULT_ROUTE_ALTERNATE",

  /** Fuel efficient route optimized for parameters such as fuel consumption. */
  FUEL_EFFICIENT = "FUEL_EFFICIENT",
}

/**
 * Represents a latitude-longitude viewport, defined by two diagonally opposite points: low and high. (Routes API)
 * The viewport is considered a closed region, meaning it includes its boundary.
 * The latitude bounds must range between -90 to 90 degrees inclusive,
 * and the longitude bounds must range between -180 to 180 degrees inclusive.
 */
export interface Viewport {
  /**
   * The low point of the viewport.
   * Must be populated and cannot be higher than the high point in latitude or further east in longitude.
   */
  low: LatLng;

  /**
   * The high point of the viewport.
   * Must be populated and cannot be lower than the low point in latitude or further west in longitude.
   */
  high: LatLng;
}

/**
 * Represents an amount of money with its currency type. (Routes API)
 */
export interface Money {
  /**
   * The three-letter currency code defined in ISO 4217.
   */
  currencyCode: string;

  /**
   * The whole units of the amount. For example, if `currencyCode` is "USD",
   * then 1 unit is one US dollar.
   */
  units: string; // Using string to handle int64 format

  /**
   * Number of nano (10^-9) units of the amount.
   * The value must be between -999,999,999 and +999,999,999 inclusive.
   * If `units` is positive, `nanos` must be positive or zero.
   * If `units` is zero, `nanos` can be positive, zero, or negative.
   * If `units` is negative, `nanos` must be negative or zero.
   * For example, $-1.75 is represented as `units=-1` and `nanos=-750,000,000`.
   */
  nanos: number;
}

/**
 * Encapsulates toll information on a Route or on a RouteLeg. (Routes API)
 */
export interface TollInfo {
  /**
   * The monetary amount of tolls for the corresponding Route or RouteLeg.
   * This list contains a money amount for each currency that is expected to be charged by the toll stations.
   * Typically this list will contain only one item for routes with tolls in one currency.
   * For international trips, this list may contain multiple items to reflect tolls in different currencies.
   */
  estimatedPrice?: Money[];
}

/**
 * Traffic density indicator on a contiguous segment of a polyline or path. (Routes API)
 * Describes traffic using various categories.
 */
export interface SpeedReadingInterval {
  /**
   * The starting index of this interval in the polyline.
   */
  startPolylinePointIndex: number;

  /**
   * The ending index of this interval in the polyline.
   */
  endPolylinePointIndex: number;

  /**
   * Traffic speed in this interval.
   * This field can hold one of the values from the Speed enum.
   */
  speed: Speed;
}

/**
 * Contains additional information that the user should be informed about, such as possible traffic zone restrictions. (Routes API)
 */
export interface RouteTravelAdvisory {
  /**
   * Information about tolls on the route. This field is populated if tolls are expected on the route.
   * If this field is set, but the estimatedPrice subfield is not populated, then the route contains tolls,
   * but the estimated price is unknown. If this field is not set, then there are no tolls expected on the route.
   */
  tollInfo?: TollInfo;

  /**
   * Speed reading intervals detailing traffic density. Applicable in case of TRAFFIC_AWARE and TRAFFIC_AWARE_OPTIMAL
   * routing preferences. The intervals cover the entire polyline of the route without overlap. The start point of a specified
   * interval is the same as the end point of the preceding interval.
   */
  speedReadingIntervals?: SpeedReadingInterval[];

  /**
   * The predicted fuel consumption in microliters.
   */
  fuelConsumptionMicroliters?: string;

  /**
   * Indicates whether the returned route may have restrictions that are not suitable for the requested travel mode
   * or route modifiers.
   */
  routeRestrictionsPartiallyIgnored?: boolean;

  /**
   * If present, contains the total fare or ticket costs on this route. This property is only returned for TRANSIT requests
   * and only for routes where fare information is available for all transit steps.
   */
  transitFare?: Money;
}

/**
 * Interface representing a localized variant of a text in a particular language. (Routes API)
 */
export interface LocalizedText {
  /**
   * Localized string in the language corresponding to languageCode.
   */
  text: string;

  /**
   * The text's BCP-47 language code, such as "en-US" or "sr-Latn".
   * For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode: string;
}

/**
 * Interface representing text representations of certain route properties. (Routes API)
 */
export interface RouteLocalizedValues {
  /**
   * Travel distance represented in text form.
   */
  distance?: LocalizedText;

  /**
   * Duration taking traffic conditions into consideration, represented in text form.
   * Note: If traffic information was not requested, this value will be the same as staticDuration.
   */
  duration?: LocalizedText;

  /**
   * Duration without taking traffic conditions into consideration, represented in text form.
   */
  staticDuration?: LocalizedText;

  /**
   * Transit fare represented in text form.
   */
  transitFare?: LocalizedText;
}

/**
 * Interface representing a route, which consists of a series of connected road segments
 * that join beginning, ending, and intermediate waypoints. (Routes API)
 */
export interface Route {
  /**
   * Labels for the Route that are useful to identify specific properties of the route
   * to compare against others.
   */
  routeLabels?: RouteLabel[];

  /**
   * A collection of legs (path segments between waypoints) that make up the route.
   * Each leg corresponds to the trip between two non-via Waypoints.
   */
  legs: RouteLeg[];

  /**
   * The travel distance of the route, in meters.
   */
  distanceMeters?: number;

  /**
   * The length of time needed to navigate the route.
   * If routingPreference is TRAFFIC_UNAWARE, this value is the same as staticDuration.
   * If routingPreference is TRAFFIC_AWARE or TRAFFIC_AWARE_OPTIMAL,
   * this value takes traffic conditions into account.
   */
  duration?: string; // Duration format, e.g., "3.5s"

  /**
   * The duration of travel through the route without taking traffic conditions into consideration.
   */
  staticDuration?: string; // Duration format, e.g., "3.5s"

  /**
   * The overall route polyline. This polyline is the combined polyline of all legs.
   */
  polyline?: Polyline;

  /**
   * A description of the route.
   */
  description?: string;

  /**
   * An array of warnings to show when displaying the route.
   */
  warnings?: string[];

  /**
   * The viewport bounding box of the polyline.
   */
  viewport?: Viewport;

  /**
   * Additional information about the route.
   */
  travelAdvisory?: RouteTravelAdvisory;

  /**
   * If optimizeWaypointOrder is true, this field contains the optimized ordering
   * of intermediate waypoints. Otherwise, this field is empty.
   */
  optimizedIntermediateWaypointIndex?: number[];

  /**
   * Text representations of properties of the Route.
   */
  localizedValues?: RouteLocalizedValues;

  /**
   * A web-safe, base64-encoded route token for use with the Navigation SDK,
   * allowing it to reconstruct the route during navigation and honor the original
   * route intention in the event of rerouting.
   */
  routeToken?: string;
}

/**
 * Enum representing traffic speed in a SpeedReadingInterval. (Routes Api)
 */
export enum Speed {
  /** Traffic is moving freely. */
  NORMAL = "NORMAL",
  /** Traffic is slightly slow. */
  SLOW = "SLOW",
  /** Traffic is congested. */
  TRAFFIC_JAM = "TRAFFIC_JAM",
  /** Traffic is stopped or nearly stopped. */
  STOP_AND_GO = "STOP_AND_GO",
}

/**
 * Enum representing the various types of navigation maneuvers.
 * Specifies the action to take for the current step, such as turning or merging.
 */
export enum Maneuver {
  /** Not used. */
  MANEUVER_UNSPECIFIED = "MANEUVER_UNSPECIFIED",

  /** Turn slightly to the left. */
  TURN_SLIGHT_LEFT = "TURN_SLIGHT_LEFT",

  /** Turn sharply to the left. */
  TURN_SHARP_LEFT = "TURN_SHARP_LEFT",

  /** Make a left u-turn. */
  UTURN_LEFT = "UTURN_LEFT",

  /** Turn left. */
  TURN_LEFT = "TURN_LEFT",

  /** Turn slightly to the right. */
  TURN_SLIGHT_RIGHT = "TURN_SLIGHT_RIGHT",

  /** Turn sharply to the right. */
  TURN_SHARP_RIGHT = "TURN_SHARP_RIGHT",

  /** Make a right u-turn. */
  UTURN_RIGHT = "UTURN_RIGHT",

  /** Turn right. */
  TURN_RIGHT = "TURN_RIGHT",

  /** Go straight. */
  STRAIGHT = "STRAIGHT",

  /** Take the left ramp. */
  RAMP_LEFT = "RAMP_LEFT",

  /** Take the right ramp. */
  RAMP_RIGHT = "RAMP_RIGHT",

  /** Merge into traffic. */
  MERGE = "MERGE",

  /** Take the left fork. */
  FORK_LEFT = "FORK_LEFT",

  /** Take the right fork. */
  FORK_RIGHT = "FORK_RIGHT",

  /** Take the ferry. */
  FERRY = "FERRY",

  /** Take the train leading onto the ferry. */
  FERRY_TRAIN = "FERRY_TRAIN",

  /** Turn left at the roundabout. */
  ROUNDABOUT_LEFT = "ROUNDABOUT_LEFT",

  /** Turn right at the roundabout. */
  ROUNDABOUT_RIGHT = "ROUNDABOUT_RIGHT",

  /** Initial maneuver, such as leaving a location. */
  DEPART = "DEPART",

  /** Used to indicate a street name change. */
  NAME_CHANGE = "NAME_CHANGE",
}

/**
 * Interface representing navigation instructions for a RouteLegStep.
 */
export interface NavigationInstruction {
  /**
   * Encapsulates the navigation instructions for the current step.
   * Determines which icon or visual cue to display.
   */
  maneuver?: Maneuver;

  /**
   * Instructions for navigating this step, typically presented as text.
   */
  instructions?: string;
}

/**
 * Text representations of certain properties of a RouteLegStep.
 */
export interface RouteLegStepLocalizedValues {
  /**
   * Travel distance represented in text form.
   */
  distance?: LocalizedText;

  /**
   * Duration without taking traffic conditions into consideration,
   * represented in text form.
   */
  staticDuration?: LocalizedText;
}

/**
 * Contains additional information that the user should be informed about,
 * such as possible traffic zone restrictions on a leg step.
 */
export interface RouteLegStepTravelAdvisory {
  /**
   * Speed reading intervals detailing traffic density.
   * NOTE: This field is not currently populated.
   */
  speedReadingIntervals?: SpeedReadingInterval[];
}

/**
 * A transit agency that operates a transit line.
 */
export interface TransitAgency {
  /**
   * The name of this transit agency.
   */
  name: string;

  /**
   * The transit agency's locale-specific formatted phone number.
   */
  phoneNumber?: string;

  /**
   * The transit agency's URI.
   */
  uri?: string;
}

/**
 * The type of vehicles for transit routes.
 */
export enum TransitVehicleType {
  /** Unused. */
  TRANSIT_VEHICLE_TYPE_UNSPECIFIED = "TRANSIT_VEHICLE_TYPE_UNSPECIFIED",
  /** Bus. */
  BUS = "BUS",
  /** A vehicle that operates on a cable, usually on the ground. Aerial cable cars may be of the type GONDOLA_LIFT. */
  CABLE_CAR = "CABLE_CAR",
  /** Commuter rail. */
  COMMUTER_TRAIN = "COMMUTER_TRAIN",
  /** Ferry. */
  FERRY = "FERRY",
  /** A vehicle that is pulled up a steep incline by a cable. A Funicular typically consists of two cars, with each car acting as a counterweight for the other. */
  FUNICULAR = "FUNICULAR",
  /** An aerial cable car. */
  GONDOLA_LIFT = "GONDOLA_LIFT",
  /** Heavy rail. */
  HEAVY_RAIL = "HEAVY_RAIL",
  /** High-speed train. */
  HIGH_SPEED_TRAIN = "HIGH_SPEED_TRAIN",
  /** Intercity bus. */
  INTERCITY_BUS = "INTERCITY_BUS",
  /** Long distance train. */
  LONG_DISTANCE_TRAIN = "LONG_DISTANCE_TRAIN",
  /** Light rail transit. */
  METRO_RAIL = "METRO_RAIL",
  /** Monorail. */
  MONORAIL = "MONORAIL",
  /** All other vehicles. */
  OTHER = "OTHER",
  /** Rail. */
  RAIL = "RAIL",
  /** Share taxi is a kind of bus with the ability to drop off and pick up passengers anywhere on its route. */
  SHARE_TAXI = "SHARE_TAXI",
  /** Underground light rail. */
  SUBWAY = "SUBWAY",
  /** Above ground light rail. */
  TRAM = "TRAM",
  /** Trolleybus. */
  TROLLEYBUS = "TROLLEYBUS",
}

/**
 * Information about a vehicle used in transit routes.
 */
export interface TransitVehicle {
  /**
   * The name of this vehicle, capitalized.
   */
  name?: LocalizedText;

  /**
   * The type of vehicle used.
   */
  type?: TransitVehicleType;

  /**
   * The URI for an icon associated with this vehicle type.
   */
  iconUri?: string;

  /**
   * The URI for the icon associated with this vehicle type, based on the local transport signage.
   */
  localIconUri?: string;
}

/**
 * Contains information about the transit line used in this step.
 */
export interface TransitLine {
  /**
   * The transit agency (or agencies) that operates this transit line.
   */
  agencies?: TransitAgency[];

  /**
   * The full name of this transit line. For example, "8 Avenue Local".
   */
  name?: string;

  /**
   * The URI for this transit line as provided by the transit agency.
   */
  uri?: string;

  /**
   * The color commonly used in signage for this line. Represented in hexadecimal.
   */
  color?: string;

  /**
   * The URI for the icon associated with this line.
   */
  iconUri?: string;

  /**
   * The short name of this transit line. This name will normally be a line number, such as "M7" or "355".
   */
  nameShort?: string;

  /**
   * The color commonly used in text on signage for this line. Represented in hexadecimal.
   */
  textColor?: string;

  /**
   * The type of vehicle that operates on this transit line.
   */
  vehicle?: TransitVehicle;
}

/**
 * Information about a transit stop.
 */
export interface TransitStop {
  /**
   * The name of the transit stop.
   */
  name: string;

  /**
   * The location of the stop expressed in latitude/longitude coordinates.
   */
  location: RouteLocation;
}

/**
 * Details about the transit stops for the RouteLegStep.
 */
export interface TransitStopDetails {
  /**
   * Information about the arrival stop for the step.
   */
  arrivalStop?: TransitStop;

  /**
   * The estimated time of arrival for the step.
   * A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits.
   * Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z".
   */
  arrivalTime?: string;

  /**
   * Information about the departure stop for the step.
   */
  departureStop?: TransitStop;

  /**
   * The estimated time of departure for the step.
   * A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits.
   * Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z".
   */
  departureTime?: string;
}

/**
 * Localized descriptions of values for RouteTransitDetails.
 */
export interface TransitDetailsLocalizedValues {
  /**
   * Localized time information for the arrival time.
   * Contains the time in its formatted text representation along with the time zone.
   */
  arrivalTime?: LocalizedTime;

  /**
   * Localized time information for the departure time.
   * Contains the time in its formatted text representation along with the time zone.
   */
  departureTime?: LocalizedTime;
}

/**
 * Localized description of time.
 */
export interface LocalizedTime {
  /**
   * The time specified as a string in a given time zone, localized for different regions.
   */
  time: LocalizedText;

  /**
   * The time zone in which the time is specified.
   * The value is the name of the time zone as defined in the IANA Time Zone Database (e.g., "America/New_York").
   */
  timeZone: string;
}

/**
 * Additional information for the RouteLegStep related to TRANSIT routes.
 */
export interface RouteLegStepTransitDetails {
  /**
   * Information about the arrival and departure stops for the step.
   */
  stopDetails?: TransitStopDetails;

  /**
   * Text representations of properties of the RouteLegStepTransitDetails.
   */
  localizedValues?: TransitDetailsLocalizedValues;

  /**
   * Specifies the direction in which to travel on this line as marked on the vehicle or at the departure stop.
   * The direction is often the terminus station.
   */
  headsign?: string;

  /**
   * Specifies the expected time as a duration between departures from the same stop at this time.
   * For example, with a headway seconds value of 600, you would expect a ten-minute wait if you should miss your bus.
   */
  headway?: string;

  /**
   * Information about the transit line used in this step.
   */
  transitLine?: TransitLine;

  /**
   * The number of stops from the departure to the arrival stop.
   * This count includes the arrival stop but excludes the departure stop.
   */
  stopCount?: number;

  /**
   * The text that appears in schedules and signboards to identify a transit trip to passengers.
   * The text should uniquely identify a trip within a service day.
   */
  tripShortText?: string;
}

/**
 * Represents a single step within a RouteLeg.
 */
export interface RouteLegStep {
  /** The travel distance of the route leg step, in meters. */
  distanceMeters?: number;

  /**
   * The duration of travel through the leg step, calculated without taking traffic conditions into consideration.
   * A duration in seconds with up to nine fractional digits, ending with 's'.
   * Example: "3.5s".
   */
  staticDuration?: string;

  /** The polyline for this leg step. */
  polyline?: Polyline;

  /**
   * The start location of this leg step. This location might be different from the provided origin.
   * For example, when the provided origin is not near a road, this is a point on the road.
   */
  startLocation?: RouteLocation;

  /**
   * The end location of this leg step. This location might be different from the provided destination.
   * For example, when the provided destination is not near a road, this is a point on the road.
   */
  endLocation?: RouteLocation;

  /** The navigation instruction associated with this leg step. */
  navigationInstruction?: NavigationInstruction;

  /** Contains additional information about the leg step, such as possible traffic zone restrictions. */
  travelAdvisory?: RouteLegStepTravelAdvisory;

  /** Text representations of properties of the RouteLegStep. */
  localizedValues?: RouteLegStepLocalizedValues;

  /** Details specific to transit steps, such as the line, stop, and agency information. */
  transitDetails?: RouteLegStepTransitDetails;

  /** The mode of travel used for this leg step. */
  travelMode?: RouteTravelMode;
}

/**
 * Represents a segment between non-via waypoints.
 */
export interface RouteLeg {
  /** The travel distance of the route leg, in meters. */
  distanceMeters?: number;

  /**
   * The length of time needed to navigate the leg.
   * A duration in seconds with up to nine fractional digits, ending with 's'.
   * Example: "3.5s".
   */
  duration?: string;

  /**
   * The duration of travel through the leg, calculated without taking traffic conditions into consideration.
   * A duration in seconds with up to nine fractional digits, ending with 's'.
   * Example: "3.5s".
   */
  staticDuration?: string;

  /** The overall polyline for this leg that includes each step's polyline. */
  polyline?: Polyline;

  /**
   * The start location of this leg. This location might be different from the provided origin.
   * For example, when the provided origin is not near a road, this is a point on the road.
   */
  startLocation?: RouteLocation;

  /**
   * The end location of this leg. This location might be different from the provided destination.
   * For example, when the provided destination is not near a road, this is a point on the road.
   */
  endLocation?: RouteLocation;

  /** An array of steps denoting segments within this leg. Each step represents one navigation instruction. */
  steps?: RouteLegStep[];

  /** Contains the additional information that the user should be informed about, such as possible traffic zone restrictions, on a route leg. */
  travelAdvisory?: RouteLegTravelAdvisory;

  /** Text representations of properties of the RouteLeg. */
  localizedValues?: RouteLegLocalizedValues;

  /** Overview information about the steps in this RouteLeg. This field is only populated for TRANSIT routes. */
  stepsOverview?: StepsOverview;
}

/**
 * Contains additional information that the user should be informed about on a leg step,
 * such as possible traffic zone restrictions.
 */
export interface RouteLegTravelAdvisory {
  /**
   * Information about tolls on the specific RouteLeg.
   * This field is populated only if there are expected tolls on the RouteLeg.
   * If the estimatedPrice subfield is not populated, it means tolls are expected but the estimated price is unknown.
   * If this field does not exist, there are no tolls on the RouteLeg.
   */
  tollInfo?: TollInfo;

  /**
   * Speed reading intervals detailing traffic density.
   * Applicable in case of TRAFFIC_AWARE and TRAFFIC_AWARE_OPTIMAL routing preferences.
   * The intervals cover the entire polyline of the RouteLeg without overlap.
   * The start point of a specified interval is the same as the end point of the preceding interval.
   */
  speedReadingIntervals?: SpeedReadingInterval[];
}

/**
 * Text representations of certain properties for a RouteLeg.
 */
export interface RouteLegLocalizedValues {
  /**
   * Travel distance represented in text form.
   */
  distance?: LocalizedText;

  /**
   * Duration taking traffic conditions into consideration represented in text form.
   * Note: If traffic information was not requested, this value will be the same as staticDuration.
   */
  duration?: LocalizedText;

  /**
   * Duration without taking traffic conditions into consideration, represented in text form.
   */
  staticDuration?: LocalizedText;
}

/**
 * Provides overview information about a list of RouteLegSteps.
 */
export interface StepsOverview {
  /**
   * Summarized information about different multi-modal segments of the RouteLeg.steps.
   * This field is not populated if the RouteLeg does not contain any multi-modal segments in the steps.
   */
  multiModalSegments?: MultiModalSegment[];
}

/**
 * Provides summarized information about different multi-modal segments of the RouteLeg.steps.
 * A multi-modal segment is defined as one or more contiguous RouteLegStep that have the same RouteTravelMode.
 */
export interface MultiModalSegment {
  /**
   * Navigation instructions for the multi-modal segment.
   */
  navigationInstruction?: NavigationInstruction;

  /**
   * The travel mode of the multi-modal segment.
   */
  travelMode: RouteTravelMode;

  /**
   * The corresponding RouteLegStep index that is the start of a multi-modal segment.
   */
  stepStartIndex: number;

  /**
   * The corresponding RouteLegStep index that is the end of a multi-modal segment.
   */
  stepEndIndex: number;
}
