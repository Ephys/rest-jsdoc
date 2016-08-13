
/**
 * Type definition of the JSDocParser output for @type
 */
declare class JsDocTypeInstance {
  name: string;

  /** Description of the @type*/
  text: string; // The description BECAUSE CONSISTENCY ?

  /** The list of types (['number', 'string']) for unions. Not reliable use parsedType */
  type: string[];
  nullable: boolean;
  optional: ?boolean;

  parsedType: JsDocParsedType;
}
