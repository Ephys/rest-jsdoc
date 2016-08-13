'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EcmaScriptType2 = require('./abstract/EcmaScriptType');

var _EcmaScriptType3 = _interopRequireDefault(_EcmaScriptType2);

var _BaseType = require('./abstract/BaseType');

var _BaseType2 = _interopRequireDefault(_BaseType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Type for Object native type.
 *
 * @class ObjectType
 * @extends EcmaScriptType
 */
var ObjectType = function (_EcmaScriptType) {
  _inherits(ObjectType, _EcmaScriptType);

  function ObjectType() {
    _classCallCheck(this, ObjectType);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectType).call(this, 'object'));

    _this.members = new Map();
    return _this;
  }

  /**
   * Add a new member to the object.
   * @param {!BaseType} type - The member to add.
   * @returns {!ObjectType} this.
   */


  /**
   * List of properties of the object, along with their types.
   */


  _createClass(ObjectType, [{
    key: 'addMember',
    value: function addMember(type) {
      if (this.members.has(type.name)) {
        throw new Error('One of your JSDoc declarations has a key "' + type.name + '" duplicated.');
      }

      this.members.set(type.name, type);

      return this;
    }
  }]);

  return ObjectType;
}(_EcmaScriptType3.default);

exports.default = ObjectType;