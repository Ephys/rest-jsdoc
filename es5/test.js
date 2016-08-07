'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _openapi = require('./formatters/openapi');

var _openapi2 = _interopRequireDefault(_openapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)({
  files: [__dirname + '/test.js'],
  formatter: (0, _openapi2.default)({
    baseDefinition: {
      info: {
        title: 'JSdoc->OpenAPI Test',
        description: 'A test formatting JSDoc api doc into an OpenAPI document.',
        version: '0.0.1'
      },
      host: 'test.github.io',
      basePath: '/v1',
      schemes: ['http']
    }
  })
}).then(function (result) {
  return console.log(JSON.stringify(result, null, 2));
}).catch(function (e) {
  return console.error(e);
});

exports.default = {

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
  createUser: function createUser() {}
};