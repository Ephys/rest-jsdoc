import ObjectType from '../../../lib/types/ObjectType';
import UnionType from '../../../lib/types/UnionType';
import AnyType from '../../../lib/types/AnyType';
import { extractType } from './parseType';
import parseTypeString from './parseTypeString';
import catharsis from 'catharsis';

/**
 * Parses a @typedef declaration.
 *
 * @param doc - The declaration, parsed by JSDoc's parser.
 * @returns {BaseType} The declared type.
 */
export default function parseTypedef(doc) {
  if (doc.kind !== 'typedef') {
    return null;
  }

  return extractType(doc);
}

/**
 * Unifies a @typedef type declaration.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!BaseType} The type.
 */
export function buildInstanceForTypedef(parsedType) {

  const type = parsedType.type;
  if (type == null) {
    return new AnyType();
  }

  if (typeof type !== 'object') {
    throw new Error(`Type is not an object (is ${JSON.stringify(type)}) in typedef, report this as bug.`);
  }

  const instances = [];

  for (const name of parsedType.type.names) {
    if (name === '*') {
      // Special case 1
      // if one of the possibilities is all possibilities, the others have no point in existing.
      // Stop here.
      return new AnyType();
    }

    if (name === 'Object') {
      // special case 2
      // for objects as their properties are stored in parsedType.properties
      // and would be lost when sent through catharsis.
      instances.push(buildObjectType(parsedType));
      continue;
    }

    // Parse the string in the format handled by parseTypeString and send it back.
    const newFormat = catharsis.parse(name, { jsdoc: true });
    instances.push(parseTypeString(newFormat));
  }

  if (instances.length === 1) {
    return instances[0];
  }

  const instance = new UnionType();
  instances.forEach(element => instance.addElement(element));

  return instance;
}

/**
 * Builds an ObjectType from parsed JSDoc @typedef-like type declarations.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!ObjectType} The object type.
 */
function buildObjectType(parsedType) {
  const instance = new ObjectType();

  if (!parsedType.properties) {
    return instance;
  }

  for (const property of parsedType.properties) {
    const member = extractType(property);
    instance.addMember(member);
  }

  return instance;
}
