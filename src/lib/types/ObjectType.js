import EcmaScriptType from './abstract/EcmaScriptType';
import BaseType from './abstract/BaseType';

/**
 * Type for Object native type.
 *
 * @class ObjectType
 * @extends EcmaScriptType
 */
export default class ObjectType extends EcmaScriptType {

  /**
   * List of properties of the object, along with their types.
   */
  members: Map<string, BaseType>;

  constructor() {
    super('object');

    this.members = new Map();
  }

  /**
   * Add a new member to the object.
   * @param {!BaseType} type - The member to add.
   * @returns {!ObjectType} this.
   */
  addMember(type : BaseType) : ObjectType {
    if (this.members.has(type.name)) {
      throw new Error(`One of your JSDoc declarations has a key "${type.name}" duplicated.`);
    }

    this.members.set(type.name, type);

    return this;
  }
}
