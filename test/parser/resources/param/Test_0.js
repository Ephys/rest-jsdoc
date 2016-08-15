/**
 * @GET /test1
 * @queryParam {!number} NonNull
 * @queryParam {number} Null
 * @queryParam {!number} NonOptional
 * @queryParam {!number} [Optional]
 *
 * @queryParam {number} Description - Param Description Here.
 * @queryParam {number} NoDescription
 *
 * @queryParam {number} PrimitiveParam
 * @queryParam {number|boolean} UnionParam
 * @queryParam {{ test: number }} RecordParam
 * @queryParam {Object} ObjectParam
 * @queryParam {Array.<string>} GenericParam
 */
export function test1() {}
