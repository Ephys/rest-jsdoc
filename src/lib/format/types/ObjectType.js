import EcmaScriptType from './abstract/EcmaScriptType';

/**
 * Type for Object native type.
 * @class ObjectType
 * @extends EcmaScriptType
 */
export default class ObjectType extends EcmaScriptType {

  constructor() {
    super('object');

    this.members = new Map();
  }

  /**
   * @param {!BaseType} type
   */
  addMember(type) {
    if (this.members.has(type.name)) {
      throw new Error(`One of your JSDoc declarations has a key "${type.name}" duplicated.`);
    }

    this.members.set(type.name, type);
  }
}
