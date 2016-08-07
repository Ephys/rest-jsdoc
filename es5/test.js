'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)({
  files: [__dirname + '/test.js']
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