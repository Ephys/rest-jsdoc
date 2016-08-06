'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EcmaScriptType2 = require('./abstract/EcmaScriptType');

var _EcmaScriptType3 = _interopRequireDefault(_EcmaScriptType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Type that references a typedef.
 *
 * @class CustomType
 * @extends EcmaScriptType
 */
var CustomType = function (_EcmaScriptType) {
  _inherits(CustomType, _EcmaScriptType);

  function CustomType(typedefName) {
    _classCallCheck(this, CustomType);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomType).call(this, 'object'));

    _this.typedefReference = typedefName;
    return _this;
  }

  return CustomType;
}(_EcmaScriptType3.default);

exports.default = CustomType;