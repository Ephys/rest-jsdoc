'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseType2 = require('./abstract/BaseType');

var _BaseType3 = _interopRequireDefault(_BaseType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Decorator for types that have one or more generics in their signature.
 *
 * @class GenericType
 * @extends BaseType
 */
var GenericType = function (_BaseType) {
  _inherits(GenericType, _BaseType);

  function GenericType(type) {
    var _ret;

    _classCallCheck(this, GenericType);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GenericType).call(this));

    _this.type = type;
    _this.generics = [];

    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GenericType, [{
    key: 'addGeneric',
    value: function addGeneric(generic) {
      this.generics.push(generic);

      return this;
    }
  }]);

  return GenericType;
}(_BaseType3.default);

exports.default = GenericType;