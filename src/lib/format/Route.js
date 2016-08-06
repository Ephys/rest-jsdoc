/**
 * @module restjsdoc/Route
 */

/**
 * @class Route
 * @classdesc Represents a JSDoc application configuration.
 * @exports Route
 */
export default class Route {

  constructor(method, path) {
    this.method = method;
    this.path = path;

    this.pathParameters = new Map();
    this.queryParameters = new Map();

    this.responses = [];

    // BODY TODO
  }

  setDescription(description) {
    this.description = description;
  }

  setProduces(produces) {

  }

  setConsumes(consumes) {

  }

  addParameter(kind, name, description, type) {

  }

  addResponse(httpCode, description, type) {

  }
}

Route.METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];
