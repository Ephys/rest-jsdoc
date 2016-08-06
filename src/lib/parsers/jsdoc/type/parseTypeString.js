import PrimitiveType from '../../../format/types/PrimitiveType';
import CustomType from '../../../format/types/CustomType';
import ObjectType from '../../../format/types/ObjectType';
import UnionType from '../../../format/types/UnionType';
import AnyType from '../../../format/types/AnyType';
import { buildInstanceForTypedef } from './parseTypedef';
import { extractType } from './parseType';
import GenericType from '../../../format/types/GenericType';

/**
 * Unifies a @param-like type declaration.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!BaseType} The type.
 */
export default function buildInstanceForArgType(parsedType) {

  const type = parsedType.type;

  // Must be @typedef.
  if (typeof type !== 'string') {
    return buildInstanceForTypedef(parsedType);
  }

  switch (type) {
    case 'NameExpression':
      if (PrimitiveType.TYPES.includes(parsedType.name)) {
        return new PrimitiveType(parsedType.name);
      }

      return new CustomType(parsedType.name);

    case 'RecordType':
      return buildObjectType(parsedType);

    case 'TypeApplication':
      return buildGenericType(parsedType);

    case 'TypeUnion':
      return buildUnionType(parsedType);

    default:
      throw Error(`Unknown JSDoc type ${JSON.stringify(type)}`);
  }
}

function buildGenericType(parsedType) {
  //        v application(s)
  // Array.<string>
  // ^ expression
  const expression = buildInstanceForArgType(parsedType.expression);
  const instance = new GenericType(expression);

  parsedType.applications.forEach(generic => {
    instance.addGeneric(extractType(generic));
  });

  console.log(parsedType);
  console.log('vvvvv');
  console.log(instance);
  console.log();

  return instance;
}

function buildUnionType(parsedType) {
  const instance = new UnionType();

  for (const element of parsedType.elements) {
    const elInstance = extractType(element);

    // there is no point in being an union if you allow all types.
    if (elInstance instanceof AnyType) {
      return elInstance;
    }

    instance.addElement(elInstance);
  }

  return instance;
}

/**
 * Builds an ObjectType from parsed JSDoc @param-like type declarations.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!ObjectType} The object type.
 */
function buildObjectType(parsedType) {
  const instance = new ObjectType();

  for (const field of parsedType.fields) {
    const name = field.key.name;
    const member = buildInstanceForArgType(field.value);
    member.name = name;

    instance.addMember(member);
  }

  return instance;
}
