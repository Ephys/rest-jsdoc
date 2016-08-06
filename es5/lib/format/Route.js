'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module restjsdoc/Route
 */

/**
 * @class Route
 * @classdesc Represents a JSDoc application configuration.
 * @exports Route
 */
var Route = function () {
  function Route(method, path) {
    _classCallCheck(this, Route);

    this.method = method;
    this.path = path;

    this.pathParameters = new Map();
    this.queryParameters = new Map();

    this.responses = [];

    // BODY TODO
  }

  _createClass(Route, [{
    key: 'setDescription',
    value: function setDescription(description) {
      this.description = description;
    }
  }, {
    key: 'setProduces',
    value: function setProduces(produces) {}
  }, {
    key: 'setConsumes',
    value: function setConsumes(consumes) {}
  }, {
    key: 'addParameter',
    value: function addParameter(kind, name, description, type) {}
  }, {
    key: 'addResponse',
    value: function addResponse(httpCode, description, type) {}
  }]);

  return Route;
}();

exports.default = Route;


Route.METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];