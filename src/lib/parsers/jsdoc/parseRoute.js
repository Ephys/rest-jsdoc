import Route from '../../format/Route';
import Parameter from '../../format/Parameter';
import { parseTypeString } from './type/parseType';

export default function (doc) {

  const route = getRoute(doc);
  if (!route) {
    return null;
  }

  route.setDescription(doc.description);
  for (const tagMeta of doc.customTags) {
    const { tag, value } = tagMeta;

    if (tag.endsWith('param')) {
      // TODO differenciate path and query and body and header
      const type = parseTypeString(value);
      const kind = Parameter.KIND.PATH;

      const param = new Parameter({ kind, type });

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
