'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsdocRequire = require('requizzle')({
  requirePaths: {
    // TODO find this automatically
    before: [_path2.default.normalize(__dirname + '/../../../../node_modules/jsdoc-75lb/lib')]
  },
  infect: true
});

exports.default = jsdocRequire;