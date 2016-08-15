
/** Type definition of the JSDocParser output for functions. */
declare class JsDocFunction {
  description: ?string;
  customTags: JsDocTag[];
  deprecated: ?boolean;
}

declare type JsDocTag = {
  tag: string;
  value: string;
}
