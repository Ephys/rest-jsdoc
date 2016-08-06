'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (doc) {

  var route = getRoute(doc);
  if (!route) {
    return null;
  }

  route.setDescription(doc.description);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError = void 0;

  try {
    for (var _iterator = doc.customTags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var tagMeta = _step.value;
      var tag = tagMeta.tag;
      var value = tagMeta.value;


      if (tag.endsWith('param')) {
        // TODO differenciate path and query and body and header
        var type = (0, _parseType.parseTypeString)(value);
        var kind = _Parameter2.default.KIND.PATH;

        var param = new _Parameter2.default({ kind: kind, type: type });

        route.addParameter(param);
        continue;
      }

      if (tag === 'responds') {
        // TODO parse value.
        route.addResponse(value);
        continue;
      }

      // console.log('UNKNOWN TAG', tag);
    }

    // console.log(route);
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var _Route = require('../../format/Route');

var _Route2 = _interopRequireDefault(_Route);

var _Parameter = require('../../format/Parameter');

var _Parameter2 = _interopRequireDefault(_Parameter);

var _parseType = require('./type/parseType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param doc
 * @return {Route}
 */
function getRoute(doc) {
  if (!doc.customTags) {
    return null;
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;

  var _iteratorError2 = void 0;

  try {
    for (var _iterator2 = doc.customTags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var tag = _step2.value;

      if (_Route2.default.METHODS.includes(tag.tag)) {
        return new _Route2.default(tag.tag, tag.value);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return null;
}