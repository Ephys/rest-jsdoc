import EcmaScriptType from './abstract/EcmaScriptType';

/**
 * Type holding a primitive type.
 *
 * @class PrimitiveType
 * @extends EcmaScriptType
 */
export default class PrimitiveType extends EcmaScriptType {

  static TYPES: string[] = ['number', 'string', 'boolean'];

  constructor(typeName) {
    super(typeName);

    if (!PrimitiveType.TYPES.includes(typeName)) {
      throw new Error(`Error: ${typeName} is not a primitive type.`);
    }
  }
}
