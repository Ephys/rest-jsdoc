import EcmaScriptType from './abstract/EcmaScriptType';

/**
 * Type that references a typedef.
 *
 * @class CustomType
 * @extends EcmaScriptType
 */
export default class CustomType extends EcmaScriptType {

  constructor(typedefName) {
    super('object');

    this.typedefReference = typedefName;
  }
}
