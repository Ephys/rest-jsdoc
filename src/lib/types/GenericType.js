import BaseType from './abstract/BaseType';

/**
 * Decorator for types that have one or more generics in their signature.
 *
 * @class GenericType
 * @extends BaseType
 */
export default class GenericType extends BaseType {

  type: BaseType;
  generics: BaseType[];

  constructor(type: BaseType): GenericType {
    super();

    this.type = type;
    this.generics = [];

    return this;
  }

  addGeneric(generic: BaseType): GenericType {
    this.generics.push(generic);

    return this;
  }
}
