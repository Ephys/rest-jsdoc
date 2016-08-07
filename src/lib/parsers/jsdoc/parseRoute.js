import Route from '../../format/Route';
import { parseTypeString } from './type/parseType';

export default function (doc) {

  const route = getRoute(doc);
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
      const kindString = tag.substr(0, tag.length - 'param'.length);
      const kind = Route.PARAMETER_KINDS[kindString.toLocaleUpperCase()];

      if (kind === void 0) {
        throw new Error(`Unknown parameter tag @${tag}`);
      }

      const type = parseTypeString(value);
      route.addParameter(kind, type);
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
 * @param doc
 * @return {Route}
 */
function getRoute(doc) {
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
