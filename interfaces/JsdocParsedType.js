/**
 * Holds @type types.
 *
 * @abstract.
 */
declare class JsDocParsedType {
  /** The type of this instance. */
  type: JsDocParsedTypeKindEnum;

  /** Whether the value can be null */
  nullable: ?boolean;

  /** Whether the value can be undefined */
  optional: ?boolean;
}

/**
 * Holds simple types.
 *
 * @example @type {string}
 */
declare class JsDocNameExpression extends JsDocParsedType {

  /**
   * The name of the expression.
   *
   * @example 'string'.
   */
  name: string; // 'number'
}

/**
 * Holds record types.
 *
 * @example @type {{ userId: number, isDead: boolean }}
 */
declare class JsDocRecord extends JsDocParsedType {

  /**
   * The list of fields of the record.
   */
  fields: JsDocRecordField[];
}

declare class JsDocRecordField extends JsDocParsedType {

  /**
   * The key of the field. (Type is always 'NameExpression')
   *
   * @example { type: 'NameExpression', name: 'userId' }
   */
  key: JsDocParsedType;

  /**
   * The value of the field. (Type is always 'NameExpression')
   *
   * @example { type: 'NameExpression', name: 'boolean' }
   */
  value: JsDocParsedType;
}

/**
 * Holds generic types
 *
 * @example @type {Array.<string>}
 */
declare class JsDocTypeApplication extends JsDocParsedType {
  /**
   * The name of the generic type
   *
   * @example { type: 'NameExpression', name: 'Array' }
   */
  expression: JsDocNameExpression;

  /**
   * The list of generics
   *
   * @example [{ type: 'NameExpression', name: 'string' }]
   */
  applications: JsDocParsedType[];
}

/**
 * Holds union types
 *
 * @example @type {(string|boolean)}
 */
declare class JsDocTypeUnion extends JsDocParsedType {

  /**
   * The list of elements in the union
   *
   * @example [{ type: 'NameExpression', name: 'string' }, { type: 'NameExpression', name: 'boolean' }]
   */
  elements: JsDocParsedType[];
}


/** List of possible values for JsDocTypeInstance.parsedType.type. */
declare type JsDocParsedTypeKindEnum = 'NameExpression'
  | 'RecordType'
  | 'TypeApplication'
  | 'TypeUnion'
  | 'FieldType';
