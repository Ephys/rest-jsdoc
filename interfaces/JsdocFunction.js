
/** Type definition of the JSDocParser output for functions. */
declare class JsDocFunction {
  description: ?string;
  customTags: JsDocTag[];
}

declare type JsDocTag = {
  tag: string;
  value: string;
}
