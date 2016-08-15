import type { ParameterKind } from '../../lib/Route';
import Route from '../../lib/Route';
import { parseTypeString } from './type/parseType';
import BaseType from '../../lib/types/abstract/BaseType';
import ObjectType from '../../lib/types/ObjectType';

function tokenize(str) {
  return str.replace(/\s+/g, ' ').trim().split(' ');
}

const TAG_HANDLERS = {
  consumes(val: string, route: Route) {
    route.consumes = tokenize(val);
  },

  produces(val: string, route: Route) {
    route.produces = tokenize(val);
  },

  responds(val: string, route: Route) {
    const type = parseTypeString(val);

    const httpCode = Number(type.name);
    if (Number.isNaN(httpCode)) {
      throw new Error(`Invalid HTTP code in @responds ${val}. Format is @responds <type> <code> - <description>`);
    }

    route.addResponse(httpCode, type);
  },

  body(val: string, route: Route) {
    if (route.body !== null) {
      throw new Error(`Route ${route.method} ${route.path} has a duplicate body description.`);
    }

    route.body = parseTypeString(val);
  },

  bodyparam(val: string, route: Route) {
    if (route.body === null) {
      route.body = new ObjectType();
    }

    const body: ObjectType = route.body;
    if (!(body instanceof ObjectType)) {
      throw new Error(`Trying to add a body parameter to ${route.method} ${route.path}, but body is not an object.`);
    }

    const type = parseTypeString(val);
    body.addMember(type);
  }
};

/**
 * Extracts a route from a parsed JSDoc comment.
 *
 * @param {!JsDocFunction} doc - The JSDoc comment.
 * @returns {Route} The route or null if the comment does not contain a valid tag.
 */
export default function (doc: JsDocFunction): ?Route {

  const route: ?Route = getRoute(doc);
  if (!route) {
    return null;
  }

  route.deprecated = doc.deprecated === true;
  route.description = doc.description || null;

  for (const tagMeta of doc.customTags) {
    const { tag, value } = tagMeta;

    if (Route.METHODS.includes(tag)) {
      continue;
    }

    if (TAG_HANDLERS[tag]) {
      TAG_HANDLERS[tag](value, route);
      continue;
    }

    if (tag.endsWith('param')) {
      const parameterKindName: string = tag.substr(0, tag.length - 'param'.length);
      const parameterKind: ?ParameterKind = Route.PARAMETER_KINDS[parameterKindName.toLocaleUpperCase()];

      if (parameterKind === void 0) {
        continue;
      }

      const type: BaseType = parseTypeString(value);
      route.addParameter(parameterKind, type);
    }
  }

  return route;
}

/**
 * Attempts creating a route using the JSDoc comment.
 *
 * @param {!Object} doc - The JSDoc comment.
 * @returns {Route} The route or null if none could be created.
 */
function getRoute(doc: Object): ?Route {
  if (!doc.customTags) {
    return null;
  }

  for (const tag of doc.customTags) {
    const method = tag.tag;
    if (!Route.METHODS.includes(method)) {
      continue;
    }

    const path = tag.value;
    if (!path) {
      throw new Error(`Tag "@${method.toUpperCase()}" is missing its path.`);
    }

    return new Route(method, path);
  }

  return null;
}
