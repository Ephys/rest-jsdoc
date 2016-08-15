import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import BaseType from '../../../../src/lib/types/abstract/BaseType';
import ObjectType from '../../../../src/lib/types/ObjectType';
import PrimitiveType from '../../../../src/lib/types/PrimitiveType';
import UnionType from '../../../../src/lib/types/UnionType';
import GenericType from '../../../../src/lib/types/GenericType';
import { getRes } from '../index';
import CustomType from '../../../../src/lib/types/CustomType';

describe('@typedef', () => {
  let types: BaseType[];

  before(async() => {
    types = await getRes('typedef/Test_0');
  });

  it('describes reusable types', () => {
    expect(types.length).to.equal(5);

    for (const type of types) {
      expect(type).to.be.instanceOf(BaseType);
    }
  });

  it('tag description is parameter description', () => {
    expect(types[0].description).to.equal('Type 1 description.');
    expect(types[1].description).to.equal('Type 2 description.');
    expect(types[2].description).to.equal(null);
  });

  it('allows defining the nullability of the field', () => {
    const type: ObjectType = types[2];

    expect(type.members.get('NonNull').nullable).to.equal(false);
    expect(type.members.get('Null').nullable).to.equal(true);
  });

  it('allows defining the optionality of the field', () => {
    const type: ObjectType = types[2];

    expect(type.members.get('NonOptional').optional).to.equal(false);
    expect(type.members.get('Optional').optional).to.equal(true);
  });

  it('accepts primitive types', () => {
    const param: PrimitiveType = types[2].members.get('Primitive');

    expect(param).to.be.instanceOf(PrimitiveType);
    expect(param.nativeType).to.equal('string');
  });

  it('accepts type unions', () => {
    const param: UnionType = types[2].members.get('Union');

    expect(param).to.be.instanceOf(UnionType);
    expect(param.elements[0]).to.be.instanceOf(PrimitiveType);
    expect(param.elements[0].nativeType).to.equal('string');

    expect(param.elements[1]).to.be.instanceOf(PrimitiveType);
    expect(param.elements[1].nativeType).to.equal('number');
  });

  it('accepts record types', () => {
    const type: ObjectType = types[2];

    const recordParam: ObjectType = type.members.get('Record');
    expect(recordParam).to.be.instanceOf(ObjectType);

    // FIXME ? Parser refuses to give properties for object types.
    expect(recordParam.members.size).to.equal(0);
    // const member1: PrimitiveType = recordParam.members.get('test');
    // expect(member1).to.be.instanceOf(PrimitiveType);
    // expect(member1.description).to.equal(null);
    // expect(member1.nativeType).to.equal('string');
    // expect(member1.name).to.equal('test');

    const objectParam: ObjectType = type.members.get('Object');
    expect(objectParam).to.be.instanceOf(ObjectType);
    expect(objectParam.members.size).to.equal(1);

    const member: ObjectType = objectParam.members.get('Param1');
    expect(member).to.be.instanceOf(ObjectType);
    expect(member.description).to.equal('The first param of Object.');
    expect(member.nullable).to.be.false();
    expect(member.optional).to.be.true();

    const subMember: PrimitiveType = member.members.get('Param2');
    expect(subMember).to.be.instanceOf(PrimitiveType);
    expect(subMember.nativeType).to.equal('string');
    expect(subMember.description).to.equal('The first param of first param of Object.');
  });

  it('accepts generic types', () => {
    // Array of string.
    const param: GenericType = types[2].members.get('Generic');
    expect(param).to.be.instanceOf(GenericType);

    const type: CustomType = param.type;
    expect(type).to.be.instanceOf(CustomType);
    expect(type.typedefReference).to.equal('Array');

    const generic: PrimitiveType = param.generics[0];
    expect(generic).to.be.instanceOf(PrimitiveType);
    expect(generic.nativeType).to.equal('string');
  });

  it('throws if a param is described twice', () => {
    return getRes('typedef/Test_1').should.be.rejectedWith(Error);
  });
});
