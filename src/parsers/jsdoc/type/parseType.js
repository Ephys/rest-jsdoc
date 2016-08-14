import BaseType from '../../../lib/types/abstract/BaseType';
import jsdocRequire from '../jsdoc-require';
import buildInstanceForParsedType from './buildParsedType';
import { buildInstanceForTypedef } from './parseTypedef';

const typeParser = jsdocRequire('jsdoc-75lb/lib/jsdoc/tag/type.js');

/**
 * Parses a type string ({type} [variable] - description).
 *
 * @param {!string} typeString - The type of the string.
 * @returns {!BaseType} The type in the string.
 */
export function parseTypeString(typeString: string): BaseType {
  const typeRaw = typeParser.parse(typeString, true, true);

  return extractType(typeRaw);
}

/**
 * Unifies JSDoc's representations of types.
 *
 * @param {!Object} typeRaw - The JSDoc representation of a @typedef or type string.
 * @returns {!BaseType} The unified type.
 */
export function extractType(typeRaw: JsDocTypedef | JsDocTypeInstance): BaseType {

  const type: BaseType = typeRaw.parsedType
    ? buildInstanceForParsedType(typeRaw.parsedType)
    : buildInstanceForTypedef(typeRaw);

  const parsedType = typeRaw.parsedType ? typeRaw.parsedType : typeRaw;

  type.description = typeRaw.text || typeRaw.description || null;
  type.name = typeRaw.name;
  type.nullable = extractFromMultiple('nullable', true, typeRaw, parsedType);
  type.optional = extractFromMultiple('optional', false, typeRaw, parsedType);

  // TODO depends on the type. Should be parsed
  // Array default value = '[]'
  // const defaultValue = parsedType.defaultValue;

  return type;
}

function extractFromMultiple(propName: string, def: any, ...multiple: Object[]): any {

  for (const item: Object of multiple) {
    if (item[propName] !== void 0) {
      return item[propName];
    }
  }

  return def;
}
