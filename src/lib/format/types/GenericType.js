import BaseType from './abstract/BaseType';

/**
 * Decorator for types that have one or more generics in their signature.
 *
 * @class GenericType
 * @extends BaseType
 */
export default class GenericType extends BaseType {

  constructor(type) {
    super();

    this.type = type;
    this.generics = [];
  }

  addGeneric(generic) {
    this.generics.push(generic);
  }
}
