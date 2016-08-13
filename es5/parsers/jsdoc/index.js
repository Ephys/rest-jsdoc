'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (file) {

  return (0, _streamToPromise2.default)((0, _jsdocParse2.default)({ src: file })).then(function (response) {
    return JSON.parse(response[0]).map(function (doc) {
      return parseJsDoc(doc);
    }).filter(function (doc) {
      return doc !== null;
    });
  });
};

var _jsdocParse = require('jsdoc-parse');

var _jsdocParse2 = _interopRequireDefault(_jsdocParse);

var _streamToPromise = require('stream-to-promise');

var _streamToPromise2 = _interopRequireDefault(_streamToPromise);

var _parseRoute = require('./parseRoute');

var _parseRoute2 = _interopRequireDefault(_parseRoute);

var _parseTypedef = require('./type/parseTypedef');

var _parseTypedef2 = _interopRequireDefault(_parseTypedef);

var _BaseType = require('../../lib/types/abstract/BaseType');

var _BaseType2 = _interopRequireDefault(_BaseType);

var _Route = require('../../lib/Route');

var _Route2 = _interopRequireDefault(_Route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseJsDoc(doc) {
  var route = (0, _parseRoute2.default)(doc);
  if (route) {
    return route;
  }

  var type = (0, _parseTypedef2.default)(doc);
  if (type) {
    return type;
  }

  return null;
}

/**
 * Receives a file path and returns the JSDoc inside it.
 * @param {!string} file - The file to parse.
 * @returns {!Promise.<!Array.<Object>>} The JSDoc inside the file.
 */