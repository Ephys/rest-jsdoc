'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = openApi;

var _UnionType = require('../../lib/types/UnionType');

var _UnionType2 = _interopRequireDefault(_UnionType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openApi() {
  var _ref = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];

  var _ref$baseDefinition = _ref.baseDefinition;
  var baseDefinition = _ref$baseDefinition === void 0 ? {} : _ref$baseDefinition;


  return function format(_ref2) {
    var types = _ref2.types;
    var routes = _ref2.routes;

    var specification = buildSpecification(types, routes);

    // TODO REPLACE BY DEEP MERGE:
    return Object.assign(specification, baseDefinition);
  };
};

/**
 *
 * @param {Array.<Route>} types
 * @param routes
 * @returns {{}}
 */
function buildSpecification(types, routes) {
  var specification = {};

  specification.swagger = '2.0';

  specification.paths = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError = void 0;

  try {
    for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;

      if (!specification.paths[route.path]) {
        specification.paths[route.path] = {};
      }

      var path = specification.paths[route.path];
      if (path[route.method]) {
        throw new Error('Duplicate route definition ' + route.method + ' ' + route.path);
      }

      path[route.method] = buildRoute(types, route);
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

  return specification;
}

/**
 *
 * @param types
 * @param {!Route} route
 * @returns {{}}
 */
function buildRoute(types, route) {

  var swaggerRoute = {
    summary: route.description
  };

  if (route.consumes) {
    swaggerRoute.consumes = route.consumes;
  }

  if (route.produces) {
    swaggerRoute.produces = route.produces;
  }

  swaggerRoute.responses = {};

  var responses = formatResponses(route.responses);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;

  var _iteratorError2 = void 0;

  try {
    for (var _iterator2 = Object.getOwnPropertyNames(responses)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var code = _step2.value;

      var response = responses[code];
      var swaggerResponse = {};

      swaggerResponse.description = response.description;
      swaggerResponse.schema = typeToSchema(response);

      swaggerRoute.responses[code] = swaggerResponse;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return swaggerRoute;
}

/**
 * Builds a {@link http://swagger.io/specification/#schemaObject} schema object using a {@link BaseType} object.
 * @param {!BaseType} type - The type to transform into a schema.
 */
function typeToSchema(type) {
  return { todo: true }; // TODO
}

/**
 * Formats the responses in a more swagger-compliant format.
 *
 * @param {!Array.<{ httpCode: !number, type: !BaseType }>} libResponses
 */
function formatResponses(libResponses) {
  var swaggerResponses = {};

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;

  var _iteratorError3 = void 0;

  try {
    for (var _iterator3 = libResponses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var libResponse = _step3.value;

      var code = libResponse.httpCode;
      var type = libResponse.type;

      var currentResponse = swaggerResponses[code];

      if (!currentResponse) {
        swaggerResponses[code] = type;
      } else {
        // Already has a response: transform into uniontype and add new response.
        if (!(currentResponse instanceof _UnionType2.default)) {
          var newResponse = new _UnionType2.default();
          newResponse.addElement(currentResponse);
          newResponse.description = currentResponse.description;

          currentResponse = newResponse;
          swaggerResponses[code] = newResponse;
        }

        currentResponse.description = ' | ' + libResponse.type.description;
        currentResponse.addElement(libResponse);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return swaggerResponses;
}