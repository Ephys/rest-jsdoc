'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _ref = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];

  var _ref$files = _ref.files;
  var files = _ref$files === void 0 ? [] : _ref$files;
  var _ref$formatter = _ref.formatter;
  var formatter = _ref$formatter === void 0 ? _openapi2.default : _ref$formatter;
  var _ref$parser = _ref.parser;
  var parser = _ref$parser === void 0 ? _jsdoc2.default : _ref$parser;


  return Promise.all(files.map(function (router) {
    return parser(router);
  })).then(function (results) {
    return _lodash2.default.flatten(results);
  }).then(function (formats) {
    console.log(formats[0]);
  }).catch(function (e) {
    return console.error(e);
  });
};

var _openapi = require('./lib/formatters/openapi');

var _openapi2 = _interopRequireDefault(_openapi);

var _jsdoc = require('./lib/parsers/jsdoc');

var _jsdoc2 = _interopRequireDefault(_jsdoc);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }