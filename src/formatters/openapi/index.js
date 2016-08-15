import merge from 'lodash.merge';
import UnionType from '../../lib/types/UnionType';
import BaseType from '../../lib/types/abstract/BaseType';
import Route from '../../lib/Route';
import { FormatterParameter } from '../../flowtypes';
import CustomType from '../../lib/types/CustomType';
import EcmaScriptType from '../../lib/types/abstract/EcmaScriptType';
import ObjectType from '../../lib/types/ObjectType';
import GenericType from '../../lib/types/GenericType';
import { SwaggerDefinition } from './typedef';
import PrimitiveType from '../../lib/types/PrimitiveType';

export default function openApi({
  baseDefinition = {},
  consumes = 'application/json',
  produces = 'application/json'
} = {}) {

  return function format({ types, routes }: FormatterParameter) {
    const formatter = new OpenApiFormatter(types, routes, consumes, produces);
    const specification = formatter.build();

    return merge(specification, baseDefinition);
  };
}

class OpenApiFormatter {

  routes: Route[];

  typeDefinitions: Map<string, BaseType>;
  usedTypeDefinitions: Set<string> = new Set();

  specification: SwaggerDefinition = {
    swagger: '2.0',
    paths: {}
  };

  constructor(types, routes, defaultConsumes, defaultProduces) {
    this.typeDefinitions = types;
    this.routes = routes;

    if (defaultProduces) {
      this.specification.produces = Array.isArray(defaultProduces) ? defaultProduces : [defaultProduces];
    }

    if (defaultConsumes) {
      this.specification.consumes = Array.isArray(defaultConsumes) ? defaultConsumes : [defaultConsumes];
    }
  }

  build() {
    this.buildRoutes();
    this.buildDefinitions();

    return this.specification;
  }

  buildRoutes() {
    for (const route: Route of this.routes) {
      if (!this.specification.paths[route.path]) {
        this.specification.paths[route.path] = {};
      }

      const path = this.specification.paths[route.path];
      if (path[route.method]) {
        throw new Error(`Duplicate route definition ${route.method} ${route.path}`);
      }

      path[route.method] = this.buildRoute(route);
    }
  }

  buildRoute(route: Route) {
    const routeSchema = {};

    const description = route.description;
    if (description) {
      routeSchema.description = description;
    }

    const summary = route.customFields.get('summary');
    if (summary) {
      routeSchema.summary = summary.length > 120 ? `${summary.substr(0, 119)}…` : summary;
    }

    const tags = route.customFields.get('tags');
    if (tags) {
      routeSchema.tags = tags.split(' ');
    }

    routeSchema.deprecated = route.deprecated;

    if (route.consumes) {
      routeSchema.consumes = route.consumes;
    }

    if (route.produces) {
      routeSchema.produces = route.produces;
    }

    routeSchema.responses = {};
    const responses = formatResponses(route.responses);
    for (const code of Object.getOwnPropertyNames(responses)) {
      const response = responses[code];
      const swaggerResponse = {};

      swaggerResponse.description = response.description;
      swaggerResponse.schema = this.typeToJsonSchema(response);
      delete swaggerResponse.schema.description;
      delete swaggerResponse.schema.title;

      routeSchema.responses[code] = swaggerResponse;
    }

    routeSchema.parameters = [];
    route.pathParameters.forEach(type => {
      routeSchema.parameters.push(this.buildParameter(type, 'path'));
    });

    route.queryParameters.forEach(type => {
      routeSchema.parameters.push(this.buildParameter(type, 'query'));
    });

    route.headerParameters.forEach(type => {
      routeSchema.parameters.push(this.buildParameter(type, 'header'));
    });

    if (route.body) {
      const consumes = route.consumes || this.specification.consumes;

      if (!Array.isArray(consumes)) {
        throw new Error(`Consumes not defined for route ${route.method} ${route.path}.`);
      }

      if (consumes.includes('application/x-www-form-urlencoded')) {
        // Form data body version.

        let body: BaseType = route.body;
        if (body instanceof CustomType) {
          body = this.getTypedef(body.typedefReference);
        }

        if (body instanceof ObjectType) {
          body.members.forEach(bodyProperty => {
            routeSchema.parameters.push(this.buildParameter(bodyProperty, 'formData'));
          });
        } else {
          routeSchema.parameters.push(this.buildParameter(route.body, 'formData'));
        }
      } else {
        // Actual body version.
        routeSchema.parameters.push({
          in: 'body',
          schema: this.typeToJsonSchema(route.body),
          required: !route.body.optional,
          name: route.body.name
        });
      }
    }

    return routeSchema;
  }

  buildParameter(parameter: BaseType, parameterKind: string) {
    if (!isTypeArray(parameter) && !(parameter instanceof PrimitiveType)) {
      throw new Error(`OpenAPI only support array and primitives for ${parameterKind} parameters.`);
    }

    const parameterSchema = this.typeToJsonSchema(parameter);

    parameterSchema.name = parameterSchema.title;
    delete parameterSchema.title;
    parameterSchema.in = parameterKind;
    parameterSchema.required = !parameter.optional;

    return parameterSchema;
  }

  /**
   * Builds a {@link http://swagger.io/specification/#schemaObject} schema object using a {@link BaseType} object.
   * @param {!BaseType} type - The type to transform into a schema.
   * @returns {!Object}
   */
  typeToJsonSchema(type: BaseType): Object {

    if (type instanceof UnionType) {
      throw new Error('Union types are not supported by OpenAPI.');
    }

    const jsonSchema = {};
    if (type.description) {
      jsonSchema.description = type.description;
    }

    if (type.name) {
      jsonSchema.title = type.name;
    }

    if (isTypeArray(type)) {
      jsonSchema.type = 'array';

      if (type instanceof GenericType) {
        jsonSchema.items = this.typeToJsonSchema(type.generics[0]);
      }

      return jsonSchema;
    }

    if (type instanceof CustomType) {
      const definitionName: string = type.typedefReference;

      jsonSchema.$ref = `#/definitions/${definitionName}`;
      this.usedTypeDefinitions.add(definitionName);

      return jsonSchema;
    }

    if (type instanceof EcmaScriptType) {
      // TODO support for type 'integer' and 'file'
      // TODO support for formats int32, int64, float, double, byte, binary, date, date-time, password
      // http://swagger.io/specification/#dataTypeFormat
      jsonSchema.type = type.nativeType;
    }

    if (type instanceof ObjectType) {
      jsonSchema.properties = {};

      type.members.forEach((value: BaseType, key: string) => {
        jsonSchema.properties[key] = this.typeToJsonSchema(value);
      });
    }

    return jsonSchema;
  }

  buildDefinitions() {

  }

  getTypedef(name) {
    const type = this.typeDefinitions.get(name);

    if (type instanceof CustomType) {
      // FIXME infinite recursion.
      return this.getTypedef(name);
    }
  }
}

/**
 * Returns whether a type is an array type (with or without generic).
 *
 * @param {!BaseType} type - The type to check.
 * @returns {boolean} Whether the type is an array type.
 */
function isTypeArray(type: BaseType) {
  const actualType = type instanceof GenericType ? type.type : type;

  if (!(actualType instanceof CustomType)) {
    return false;
  }

  return actualType.typedefReference.toLocaleLowerCase() === 'array';
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

      currentResponse.description = ` | ${libResponse.type.description}`;
      currentResponse.addElement(libResponse);
    }
  }

  return swaggerResponses;
}
