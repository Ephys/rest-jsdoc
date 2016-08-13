'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseType2 = require('./abstract/BaseType');

var _BaseType3 = _interopRequireDefault(_BaseType2);

var _AnyType = require('./AnyType');

var _AnyType2 = _interopRequireDefault(_AnyType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Decorator for types that allow multiple types.
 *
 * @class UnionType
 * @extends BaseType
 */
var UnionType = function (_BaseType) {
  _inherits(UnionType, _BaseType);

  function UnionType() {
    _classCallCheck(this, UnionType);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnionType).call(this));

    _this.elements = [];
    return _this;
  }

  /**
   * List of elements accepted by the union type.
   */


  _createClass(UnionType, [{
    key: 'addElement',
    value: function addElement(element) {
      if (element instanceof _AnyType2.default) {
        throw new Error('Cannot put type "Any" in union, it would not make sense.');
      }

      this.elements.push(element);

      return this;
    }
  }]);

  return UnionType;
}(_BaseType3.default);

exports.default = UnionType;