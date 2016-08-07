'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module restjsdoc/Route
 */

var privateFields = new WeakMap();

/**
 * @class Route
 * @classdesc Represents a JSDoc application configuration.
 * @exports Route
 */

var Route = function () {
  function Route(method, path) {
    _classCallCheck(this, Route);

    this.method = method;
    this.path = path;

    /**
     *
     * @type {!Object.<number, Map>}
     */
    var parameters = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError = void 0;

    try {
      for (var _iterator = Object.keys(Route.PARAMETER_KINDS)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var map = new Map();
        parameters[Route.PARAMETER_KINDS[key]] = map;
        this[key.toLocaleLowerCase() + 'Parameters'] = map;
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


  _createClass(Route, [{
    key: 'addParameter',
    value: function addParameter(kind, type) {
      var properties = privateFields.get(this);
      var parameterMap = properties.parameters[kind];

      if (parameterMap.has(type.name)) {
        throw new Error('Route ' + this.method + ' ' + this.path + ' has a duplicate parameter name ' + type.name + '.');
      }

      parameterMap.set(type.name, type);
    }
  }, {
    key: 'addResponse',
    value: function addResponse(httpCode, type) {
      this.responses.push({ httpCode: httpCode, type: type });
    }
  }]);

  return Route;
}();

exports.default = Route;


Route.prototype.consumes = 'application/octet-stream';
Route.prototype.produces = 'application/octet-stream';

Route.PARAMETER_KINDS = {
  PATH: 0,
  QUERY: 1,
  HEADER: 2,
  BODY: 3
};

Route.METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];