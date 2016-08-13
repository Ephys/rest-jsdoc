'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseType = require('./types/abstract/BaseType');

var _BaseType2 = _interopRequireDefault(_BaseType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module restjsdoc/Route
 */
var privateFields = new WeakMap();

/**
 * Represents a JSDoc application configuration.
 *
 * @class Route
 * @property {!Map.<string, BaseType>} pathParameters - The list of path parameters of the route.
 * @property {!Map.<string, BaseType>} queryParameters - The list of query parameters the route accepts.
 * @property {!Map.<string, BaseType>} headerParameters - The list of headers the route accepts.
 */

var Route = function () {
  function Route(method, path) {
    _classCallCheck(this, Route);

    this.method = method;
    this.path = path;

    var parameters = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError = void 0;

    try {
      for (var _iterator = Object.keys(Route.PARAMETER_KINDS)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _key = _step.value;

        var map = new Map();
        parameters[Route.PARAMETER_KINDS[_key]] = map;
        this[_key.toLocaleLowerCase() + 'Parameters'] = map;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.responses = [];

    privateFields.set(this, {
      parameters: parameters
    });
  }

  /**
   * Adds a parameter to the route.
   *
   * @param {!number} kind - The type of parameter.
   * @param {!BaseType} type - The type of the parameter.
   * @returns {!Route} this.
   */

  // TODO body


  _createClass(Route, [{
    key: 'addParameter',
    value: function addParameter(kind, type) {

      var parameterName = type.name;

      if (kind === Route.PARAMETER_KINDS.PATH) {
        var paramRegex = new RegExp(':' + parameterName + '($|/)');
        if (!paramRegex.test(this.path)) {
          throw new Error('Route ' + this.method + ' ' + this.path + ' does not have a path parameter ' + parameterName + ' but \n                         does have a description for it.');
        }
      }

      var properties = privateFields.get(this);
      var parameterMap = properties.parameters[kind];
      if (parameterMap.has(parameterName)) {
        throw new Error('Route ' + this.method + ' ' + this.path + ' has a duplicate parameter name ' + parameterName + '.');
      }

      parameterMap.set(parameterName, type);

      return this;
    }
  }, {
    key: 'addResponse',
    value: function addResponse(httpCode, type) {

      this.responses.push({ httpCode: httpCode, type: type });
      return this;
    }
  }]);

  return Route;
}();

exports.default = Route;


Route.prototype.consumes = null;
Route.prototype.produces = null;
Route.prototype.description = null;

Route.PARAMETER_KINDS = {
  PATH: 0,
  QUERY: 1,
  HEADER: 2,
  BODY: 3
};

Route.METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];