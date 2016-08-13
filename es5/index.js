'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function () {
  var _ref = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];

  var _ref$files = _ref.files;
  var files = _ref$files === void 0 ? [] : _ref$files;
  var _ref$formatter = _ref.formatter;
  var formatter = _ref$formatter === void 0 ? (0, _openapi2.default)() : _ref$formatter;
  var _ref$parser = _ref.parser;
  var parser = _ref$parser === void 0 ? _jsdoc2.default : _ref$parser;


  var typedefs = new Map();
  var routes = [];

  return Promise.all(files.map(function (router) {
    return parser(router);
  })).then(function (results) {
    var formats = _lodash2.default.flatten(results);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError = void 0;

    try {
      for (var _iterator = formats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var format = _step.value;

        if (format instanceof _Route2.default) {
          routes.push(format);
          continue;
        }

        if (format instanceof _BaseType2.default) {
          var name = format.name;

          if (typedefs.has(name)) {
            throw new Error('Duplicate type definition for ' + name + '.');
          }

          typedefs.set(name, format);
        }

        throw new Error('Unknown class received ' + getName(format));
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

    return formatter({ routes: routes, types: typedefs });
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _openapi = require('./formatters/openapi');

var _openapi2 = _interopRequireDefault(_openapi);

var _jsdoc = require('./parsers/jsdoc');

var _jsdoc2 = _interopRequireDefault(_jsdoc);

var _Route = require('./lib/Route');

var _Route2 = _interopRequireDefault(_Route);

var _BaseType = require('./lib/types/abstract/BaseType');

var _BaseType2 = _interopRequireDefault(_BaseType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getName(item) {
  if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object' || item === null) {
    return JSON.stringify(item);
  }

  if (!item.prototype || !item.prototype.constructor) {
    return 'Object';
  }

  return item.prototype.constructor.name;
}