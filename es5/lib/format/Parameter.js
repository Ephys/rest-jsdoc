"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parameter = function Parameter(_ref) {
  var kind = _ref.kind;
  var type = _ref.type;

  _classCallCheck(this, Parameter);

  this.kind = kind;
  this.type = type;
};

exports.default = Parameter;


Parameter.KIND = {
  PATH: 0,
  QUERY: 1
};