import jsdocRequire from '../jsdoc-require';
import BaseType from '../../../format/types/abstract/BaseType';
const typeParser = jsdocRequire('jsdoc-75lb/lib/jsdoc/tag/type.js');
import buildInstanceForType from './parseTypeString';

/**
 * Parses a type string ({type} [variable] - description).
 *
 * @param {!string} typeString - The type of the string.
 * @returns {!BaseType} The type in the string.
 */
export function parseTypeString(typeString) {
  const typeRaw = typeParser.parse(typeString, true, true);

  return extractType(typeRaw);
}

/**
 * Unifies JSDoc's representations of types.
 *
 * @param {!object} typeRaw - The JSDoc representation of a @typedef or type string.
 * @returns {!BaseType} The unified type.
 */
export function extractType(typeRaw) {
  const parsedType = typeRaw.parsedType ? typeRaw.parsedType : typeRaw;

  /**
   * @type {!BaseType}
   */
  const type = buildInstanceForType(parsedType);

  type.description = extractFromMultiple('text', void 0, typeRaw, parsedType)
    || extractFromMultiple('description', null, typeRaw, parsedType);
  type.name = typeRaw.name;
  type.nullable = extractFromMultiple('nullable', true, typeRaw, parsedType);
  type.optional = extractFromMultiple('optional', false, typeRaw, parsedType);

  // TODO depends on the type. Should be parsed
  // Array default value = '[]'
  // const defaultValue = parsedType.defaultValue;

  return type;
}

function extractFromMultiple(propName, def, ...multiple) {

  for (const item of multiple) {
    if (item[propName] !== void 0) {
      return item[propName];
    }
  }

  return def;
}

