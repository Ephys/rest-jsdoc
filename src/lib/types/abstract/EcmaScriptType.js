import BaseType from './BaseType';

/**
 * Holder for ECMAScript native types (anything other than decorators and any).
 *
 * @class EcmaScriptType
 * @extends BaseType
 * @abstract
 */
export default class EcmaScriptType extends BaseType {

  typeName: string;

  constructor(typeName) {
    super();

    this.typeName = typeName;
  }
}
