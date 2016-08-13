import type { ParameterKind } from '../../lib/Route';
import Route from '../../lib/Route';
import { parseTypeString } from './type/parseType';
import BaseType from '../../lib/types/abstract/BaseType';

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

  route.description = doc.description;
  for (const tagMeta of doc.customTags) {
    const { tag, value } = tagMeta;

    if (Route.METHODS.includes(tag)) {
      continue;
    }

    if (tag.endsWith('param')) {
      const parameterKindName: string = tag.substr(0, tag.length - 'param'.length);
      const parameterKind: ?ParameterKind = Route.PARAMETER_KINDS[parameterKindName.toLocaleUpperCase()];

      if (parameterKind === void 0) {
        throw new Error(`Unknown parameter tag @${tag}`);
      }

      const type: BaseType = parseTypeString(value);
      route.addParameter(parameterKind, type);
      continue;
    }

    if (tag === 'consumes') {
      route.consumes = value;
      continue;
    }

    if (tag === 'produces') {
      route.produces = value;
      continue;
    }

    if (tag === 'responds') {
      const type = parseTypeString(value);

      const httpCode = Number(type.name);
      if (Number.isNaN(httpCode)) {
        throw new Error(`Invalid HTTP code in @responds ${value}. Format is @responds <type> <code> - <description>`);
      }

      route.addResponse(httpCode, type);
      continue;
    }

    // TODO authenticate
    console.log('UNKNOWN TAG', tag);
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
    if (Route.METHODS.includes(tag.tag)) {
      return new Route(tag.tag, tag.value);
    }
  }

  return null;
}
