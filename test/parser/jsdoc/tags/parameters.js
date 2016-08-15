import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import BaseType from '../../../../src/lib/types/abstract/BaseType';
import { getRes } from '../index';
import ObjectType from '../../../../src/lib/types/ObjectType';
import PrimitiveType from '../../../../src/lib/types/PrimitiveType';
import UnionType from '../../../../src/lib/types/UnionType';
import GenericType from '../../../../src/lib/types/GenericType';
import CustomType from '../../../../src/lib/types/CustomType';

describe('parameters', () => {
  let parameterList: Map<string, BaseType>;

  before(async() => {
    const doc: Route[] = await getRes('param/Test_0');
    parameterList = doc[0].queryParameters;
  });

  it('tag description is parameter description', () => {
    expect(parameterList.get('NoDescription').description).to.equal(null);
    expect(parameterList.get('Description').description).to.equal('Param Description Here.');
  });

  it('allows defining the nullability of the field', () => {
    expect(parameterList.get('NonNull').nullable).to.equal(false);
    expect(parameterList.get('Null').nullable).to.equal(true);
  });

  it('allows defining the optionality of the field', () => {
    expect(parameterList.get('NonOptional').optional).to.equal(false);
    expect(parameterList.get('Optional').optional).to.equal(true);
  });

  it('accepts primitive types', () => {
    const param: PrimitiveType = parameterList.get('PrimitiveParam');

    expect(param).to.be.instanceOf(PrimitiveType);
    expect(param.nativeType).to.equal('number');
  });

  it('accepts type unions', () => {
    const param: UnionType = parameterList.get('UnionParam');

    expect(param).to.be.instanceOf(UnionType);
    expect(param.elements[0]).to.be.instanceOf(PrimitiveType);
    expect(param.elements[0].nativeType).to.equal('number');

    expect(param.elements[1]).to.be.instanceOf(PrimitiveType);
    expect(param.elements[1].nativeType).to.equal('boolean');
  });

  it('accepts record types', () => {
    const recordParam: ObjectType = parameterList.get('RecordParam');
    expect(recordParam).to.be.instanceOf(ObjectType);

    expect(recordParam.members.size).to.equal(1);
    const member1: PrimitiveType = recordParam.members.get('test');
    expect(member1).to.be.instanceOf(PrimitiveType);
    expect(member1.description).to.equal(null);
    expect(member1.nativeType).to.equal('number');
    expect(member1.name).to.equal('test');

    const objectParam: ObjectType = parameterList.get('ObjectParam');
    expect(objectParam).to.be.instanceOf(ObjectType);
    expect(objectParam.members.size).to.equal(0);
  });

  it('accepts generic types', () => {
    // Array of string.
    const param: GenericType = parameterList.get('GenericParam');
    expect(param).to.be.instanceOf(GenericType);

    const type: CustomType = param.type;
    expect(type).to.be.instanceOf(CustomType);
    expect(type.typedefReference).to.equal('Array');

    const generic: PrimitiveType = param.generics[0];
    expect(generic).to.be.instanceOf(PrimitiveType);
    expect(generic.nativeType).to.equal('string');
  });

  it('throws if a param is described twice', () => {
    return getRes('param/Test_5').should.be.rejectedWith(Error);
  });

  describe('@pathParam', () => {
    it('throws if the described parameter is not in the path', () => {
      return getRes('param/Test_1')
        .should.be.rejectedWith(Error);
    });

    it('throws if there is a missing parameter description', () => {
      return getRes('param/Test_2')
        .then(doc => doc[0].validate())
        .should.be.rejectedWith(Error);
    });

    it('defines path parameters', async() => {
      const doc: Route[] = await getRes('param/Test_3');
      const param: PrimitiveType = doc[0].pathParameters.get('param');

      expect(param).to.be.instanceOf(PrimitiveType);
      expect(param.name).to.equal('param');
      expect(param.nativeType).to.equal('string');
    });

    it('throws if there is a duplicate parameter declaration', () => {
      return getRes('param/Test_4')
        .then(doc => doc[0].validate())
        .should.be.rejectedWith(Error);
    });
  });
});
