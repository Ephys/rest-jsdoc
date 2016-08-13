import BaseType from './types/abstract/BaseType';

export type Response = {
  httpCode: number,
  type: BaseType
};

export type ParameterKind = number;

/**
 * @module restjsdoc/Route
 */
const privateFields = new WeakMap();

/**
 * Represents a JSDoc application configuration.
 *
 * @class Route
 * @property {!Map.<string, BaseType>} pathParameters - The list of path parameters of the route.
 * @property {!Map.<string, BaseType>} queryParameters - The list of query parameters the route accepts.
 * @property {!Map.<string, BaseType>} headerParameters - The list of headers the route accepts.
 */
export default class Route {

  static PARAMETER_KINDS: { [key: string]: number };
  static METHODS: string[];

  method: string;
  path: string;

  consumes: ?string;
  produces: ?string;
  description: ?string;

  pathParameters: Map<string, BaseType>;
  queryParameters: Map<string, BaseType>;
  headerParameters: Map<string, BaseType>;
  // TODO body
  responses: Response[];

  constructor(method: string, path: string) {
    this.method = method;
    this.path = path;

    const parameters = {};
    for (const key of Object.keys(Route.PARAMETER_KINDS)) {
      const map = new Map();
      parameters[Route.PARAMETER_KINDS[key]] = map;
      this[`${key.toLocaleLowerCase()}Parameters`] = map;
    }

    this.responses = [];

    privateFields.set(this, {
      parameters
    });
  }

  /**
   * Adds a parameter to the route.
   *
   * @param {!number} kind - The type of parameter.
   * @param {!BaseType} type - The type of the parameter.
   * @returns {!Route} this.
   */
  addParameter(kind: ParameterKind,
               type: BaseType): Route {

    const parameterName = type.name;

    if (kind === Route.PARAMETER_KINDS.PATH) {
      const paramRegex = new RegExp(`:${parameterName}($|\/)`);
      if (!paramRegex.test(this.path)) {
        throw new Error(`Route ${this.method} ${this.path} does not have a path parameter ${parameterName} but 
                         does have a description for it.`);
      }
    }

    const properties = privateFields.get(this);
    const parameterMap = properties.parameters[kind];
    if (parameterMap.has(parameterName)) {
      throw new Error(`Route ${this.method} ${this.path} has a duplicate parameter name ${parameterName}.`);
    }

    parameterMap.set(parameterName, type);

    return this;
  }

  addResponse(httpCode: number,
              type: BaseType): Route {

    this.responses.push({ httpCode, type });
    return this;
  }
}

Route.prototype.consumes = null;
Route.prototype.produces = null;
Route.prototype.description = null;

Route.PARAMETER_KINDS = {
  PATH: 0,
  QUERY: 1,
  HEADER: 2,
  BODY: 3
};

Route.METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];
