import UnionType from '../../lib/types/UnionType';

export default function openApi({ baseDefinition = {} } = {}) {

  return function format({ types, routes }) {
    const specification = buildSpecification(types, routes);

    // TODO REPLACE BY DEEP MERGE:
    return Object.assign(specification, baseDefinition);
  };
};

/**
 *
 * @param {Array.<Route>} types
 * @param routes
 * @returns {{}}
 */
function buildSpecification(types, routes) {
  const specification = {};

  specification.swagger = '2.0';

  specification.paths = {};

  for (const route of routes) {
    if (!specification.paths[route.path]) {
      specification.paths[route.path] = {};
    }

    const path = specification.paths[route.path];
    if (path[route.method]) {
      throw new Error(`Duplicate route definition ${route.method} ${route.path}`);
    }

    path[route.method] = buildRoute(types, route);
  }

  return specification;
}

/**
 *
 * @param types
 * @param {!Route} route
 * @returns {{}}
 */
function buildRoute(types, route) {

  const swaggerRoute = {
    summary: route.description
  };

  if (route.consumes) {
    swaggerRoute.consumes = route.consumes;
  }

  if (route.produces) {
    swaggerRoute.produces = route.produces;
  }

  swaggerRoute.responses = {};

  const responses = formatResponses(route.responses);
  for (const code of Object.getOwnPropertyNames(responses)) {
    const response = responses[code];
    const swaggerResponse = {};

    swaggerResponse.description = response.description;
    swaggerResponse.schema = typeToSchema(response);

    swaggerRoute.responses[code] = swaggerResponse;
  }

  return swaggerRoute;
}

/**
 * Builds a {@link http://swagger.io/specification/#schemaObject} schema object using a {@link BaseType} object.
 * @param {!BaseType} type - The type to transform into a schema.
 */
function typeToSchema(type) {
  return { todo: true }; // TODO
}

/**
 * Formats the responses in a more swagger-compliant format.
 *
 * @param {!Array.<{ httpCode: !number, type: !BaseType }>} libResponses
 */
function formatResponses(libResponses) {
  const swaggerResponses = {};

  for (const libResponse of libResponses) {
    const code = libResponse.httpCode;
    const type = libResponse.type;

    let currentResponse = swaggerResponses[code];

    if (!currentResponse) {
      swaggerResponses[code] = type;
    } else {
      // Already has a response: transform into uniontype and add new response.
      if (!(currentResponse instanceof UnionType)) {
        const newResponse = new UnionType();
        newResponse.addElement(currentResponse);
        newResponse.description = currentResponse.description;

        currentResponse = newResponse;
        swaggerResponses[code] = newResponse;
      }

      currentResponse.description = ' | ' + libResponse.type.description;
      currentResponse.addElement(libResponse);
    }
  }

  return swaggerResponses;
}
