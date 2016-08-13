import BaseType from './abstract/BaseType';
import AnyType from './AnyType';

/**
 * Decorator for types that allow multiple types.
 *
 * @class UnionType
 * @extends BaseType
 */
export default class UnionType extends BaseType {

  /**
   * List of elements accepted by the union type.
   */
  elements: BaseType[];

  constructor() {
    super();

    this.elements = [];
  }

  addElement(element: BaseType) : UnionType {
    if (element instanceof AnyType) {
      throw new Error('Cannot put type "Any" in union, it would not make sense.');
    }

    this.elements.push(element);

    return this;
  }
}
