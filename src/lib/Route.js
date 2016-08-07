/**
 * @module restjsdoc/Route
 */

const privateFields = new WeakMap();

/**
 * @class Route
 * @classdesc Represents a JSDoc application configuration.
 * @exports Route
 */
export default class Route {

  constructor(method, path) {
    this.method = method;
    this.path = path;

    /**
     *
     * @type {!Object.<number, Map>}
     */
    const parameters = {};
    for (const key of Object.keys(Route.PARAMETER_KINDS)) {
      const map = new Map();
      parameters[Route.PARAMETER_KINDS[key]] = map;
      this[key.toLocaleLowerCase() + 'Parameters'] = map;
    }

    /**
     *
     * @type {Array.<{ httpCode: !number, type: !BaseType }>}
     */
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
  addParameter(kind, type) {
    const properties = privateFields.get(this);
    const parameterMap = properties.parameters[kind];

    if (parameterMap.has(type.name)) {
      throw new Error(`Route ${this.method} ${this.path} has a duplicate parameter name ${type.name}.`);
    }

    parameterMap.set(type.name, type);
  }

  addResponse(httpCode, type) {
    this.responses.push({ httpCode, type });
  }
}

Route.prototype.consumes = null;
Route.prototype.produces = null;
Route.prototype.description = '';

Route.PARAMETER_KINDS = {
  PATH: 0,
  QUERY: 1,
  HEADER: 2,
  BODY: 3
};

Route.METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];
