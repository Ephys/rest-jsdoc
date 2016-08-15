/**
 * @GET /consumes
 * @consumes application/json
*/
export function test1() {}

/**
 * @GET /produces
 * @produces application/json
 */
export function test2() {}

/**
 * @GET /none
 */
export function test3() {}

/**
 * @GET /multiple
 * @consumes application/x-www-form-urlencoded    multipart/form-data
 */
export function test4() {}
