import BaseType from './BaseType';

/**
 * Holder for ECMAScript native types (anything other than decorators and any).
 *
 * @class EcmaScriptType
 * @extends BaseType
 * @abstract
 */
export default class EcmaScriptType extends BaseType {

  /**
   * The native type of the variable (undefined, null, number, string, boolean, symbol, or object).
   */
  nativeType: string;

  constructor(typeName: string) {
    super();

    this.nativeType = typeName.toLocaleLowerCase();
  }
}
