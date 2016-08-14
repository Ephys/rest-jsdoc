/**
 * @GET /body
 * @body {!{ !color: number }}
 */
export function test1() {}

/**
 * @GET /bodyParam
 * @bodyParam {!number} color
 */
export function test2() {}
