import PrimitiveType from '../../../lib/types/PrimitiveType';
import CustomType from '../../../lib/types/CustomType';
import ObjectType from '../../../lib/types/ObjectType';
import UnionType from '../../../lib/types/UnionType';
import AnyType from '../../../lib/types/AnyType';
import GenericType from '../../../lib/types/GenericType';
import BaseType from '../../../lib/types/abstract/BaseType';

const JsDocParsedTypeKind = {
  NameExpression: 'NameExpression',
  RecordType: 'RecordType',
  TypeApplication: 'TypeApplication',
  TypeUnion: 'TypeUnion'
};

/**
 * Converts @type-like type declaration into a BaseType.
 *
 * @param {!Object} parsedType - The declaration, parsed by JSDoc's parser.
 * @returns {!BaseType} The type.
 */
export default function buildParsedType(parsedType: JsDocParsedType): BaseType {

  const type = parsedType.type;

  // Is JsDocTypedefInstance.
  if (typeof type !== 'string') {
    throw new Error('#buildInstanceForParsedType: arg is not of type JsDocParsedType');
  }

  switch (type) {
    case JsDocParsedTypeKind.NameExpression:
      return buildNamedType(parsedType);

    case JsDocParsedTypeKind.RecordType:
      return buildObjectType(parsedType);

    case JsDocParsedTypeKind.TypeApplication:
      return buildGenericType(parsedType);

    case JsDocParsedTypeKind.TypeUnion:
      return buildUnionType(parsedType);

    default:
      throw Error(`Unknown JSDoc type ${JSON.stringify(type)}`);
  }
}

function buildNamedType(namedExpression: JsDocNameExpression): BaseType {
  const name = namedExpression.name;

  if (PrimitiveType.TYPES.includes(name)) {
    return new PrimitiveType(name);
  }

  return new CustomType(name);
}

function buildGenericType(applicationType: JsDocTypeApplication): BaseType {
  //        v application(s)
  // Array.<string>
  // ^ expression
  const expression = buildParsedType(applicationType.expression);
  const instance = new GenericType(expression);

  applicationType.applications.forEach(generic => {
    instance.addGeneric(buildParsedType(generic));
  });

  return instance;
}

function buildUnionType(union: JsDocTypeUnion): BaseType {
  const instance = new UnionType();

  for (const element of union.elements) {
    const elInstance = buildParsedType(element);

    // there is no point in being an union if you allow all types.
    if (elInstance instanceof AnyType) {
      return elInstance;
    }

    instance.addElement(elInstance);
  }

  return instance;
}

function buildObjectType(record: JsDocRecord): BaseType {
  const instance = new ObjectType();

  for (const field of record.fields) {
    const name = field.key.name;
    const member = buildParsedType(field.value);
    member.name = name;

    instance.addMember(member);
  }

  return instance;
}
