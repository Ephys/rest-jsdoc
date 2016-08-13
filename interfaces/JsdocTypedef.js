/** Type definition of the JSDocParser output for @typedef */
declare class JsDocTypedef {
  /** The kind of tag (typedef) */
  kind: ?JsDocTagKind;

  name: string;

  /** Description of the @typedef */
  description: ?string;

  /** The list of types ({ names: ['number', 'string'] }) for unions */
  type: ?{ names: string[] }; // 'Array.<ApiChallenge>' <-- YES THIS IS FUCKED UP THEY DON'T EVEN PARSE THOROUGHLY
  nullable: boolean;
  optional: ?boolean;

  /** Properties of the typedef. Children JsDocTypedefInstance don't have this */
  properties: ?(JsDocTypedef[]);
}

/** List of possible tag kinds. */
declare type JsDocTagKind = 'typedef';
