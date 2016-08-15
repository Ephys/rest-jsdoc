import BaseType from './abstract/BaseType';

/**
 * Type that references a typedef.
 *
 * @class CustomType
 * @extends EcmaScriptType
 */
export default class CustomType extends BaseType {

  typedefReference: string;

  constructor(typedefName) {
    super('object');

    this.typedefReference = typedefName;
  }
}
