import extractRouteDoc from './index';

extractRouteDoc({
  files: [__dirname + '/test.js']
});

export default {

  /**
   * Creates a new account.
   *
   * @POST /users
   * @bodyParam {!string} username - The name of the user.
   * @bodyParam {!string} email - The email of the new user, unique.
   * @bodyParam {!string} password - The password of the user.
   * @responds {{ data: boolean }} 201 - The created user.
   * @consumes application/json
   * @produces application/json
   * @authenticated
   */
  createUser() {},
};
