'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for types.
 *
 * @class BaseType
 * @abstract
 */
var BaseType = function BaseType() {
  _classCallCheck(this, BaseType);
};

exports.default = BaseType;


BaseType.prototype.name = '';
BaseType.prototype.description = null;
BaseType.prototype.nullable = true;
BaseType.prototype.optional = false;