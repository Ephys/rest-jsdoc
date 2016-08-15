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

  static PARAMETER_KINDS: { [key: string]: number } = {
    PATH: 0,
    QUERY: 1,
    HEADER: 2
    // BODY: 3
  };

  static METHODS: string[] = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

  method: string;
  path: string;

  deprecated: boolean = false;
  consumes: ?(string[]) = null;
  produces: ?(string[]) = null;
  description: ?string = null;

  /** List of formatter-specific fields. These are tags not recognized by */
  customFields: Map<string, string> = new Map();

  pathParameters: Map<string, BaseType>;
  queryParameters: Map<string, BaseType>;
  headerParameters: Map<string, BaseType>;

  body: ?BaseType = null;

  // TODO body
  responses: Response[] = [];

  constructor(method: string, path: string) {
    this.method = method;
    this.path = path;

    const parameters = {};
    for (const key of Object.keys(Route.PARAMETER_KINDS)) {
      const map = new Map();
      parameters[Route.PARAMETER_KINDS[key]] = map;
      this[`${key.toLocaleLowerCase()}Parameters`] = map;
    }

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
  addParameter(kind: ParameterKind, type: BaseType): Route {

    const parameterName = type.name;

    if (kind === Route.PARAMETER_KINDS.PATH) {
      const paramRegex = new RegExp(`:${parameterName}($|\/)`);
      if (!paramRegex.test(this.path)) {
        throw new Error(`Route ${this.method} ${this.path} does not have a path parameter "${parameterName}" but 
                         does have a description for it.`);
      }
    }

    const properties = privateFields.get(this);
    const parameterMap = properties.parameters[kind];
    if (parameterMap.has(parameterName)) {
      throw new Error(`Route ${this.method} ${this.path} has a duplicate parameter name "${parameterName}".`);
    }

    parameterMap.set(parameterName, type);

    return this;
  }

  addResponse(httpCode: number,
              type: BaseType): Route {

    this.responses.push({ httpCode, type });
    return this;
  }

  validate() {
    const matches = this.path.match(/:[a-zA-Z0-9]+/g);
    if (matches === null) { // why is this not returning an empty array ?
      return true;
    }

    matches.sort();

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const paramName = match.substr(1);

      if (match === matches[i - 1]) {
        throw new Error(`Route ${this.method} ${this.path} has a duplicate path parameter"${paramName}"`);
      }

      if (!this.pathParameters.has(paramName)) {
        throw new Error(`Route ${this.method} ${this.path} is missing a path parameter description for "${paramName}"`);
      }
    }

    return true;
  }
}
