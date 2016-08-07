import extractRouteDoc from './index';
import openApi from './formatters/openapi';

extractRouteDoc({
  files: [`${__dirname}/test.js`],
  formatter: openApi({
    baseDefinition: {
      info: {
        title: 'JSdoc->OpenAPI Test',
        description: 'A test formatting JSDoc api doc into an OpenAPI document.',
        version: '0.0.1'
      },
      host: 'test.github.io',
      basePath: '/v1',
      schemes: ['http'],
    }
  })
})
  .then(result => console.log(JSON.stringify(result, null, 2)))
  .catch(e => console.error(e));

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
  createUser() {
  },
};
