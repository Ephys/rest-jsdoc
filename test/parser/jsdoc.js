import { it, describe, before } from 'mocha';
import { expect } from 'chai';
import jsdoc from '../../src/parsers/jsdoc';
import Route from '../../src/lib/Route';
import BaseType from '../../src/lib/types/abstract/BaseType';
import PrimitiveType from '../../src/lib/types/PrimitiveType';
import UnionType from '../../src/lib/types/UnionType';
import ObjectType from '../../src/lib/types/ObjectType';
import GenericType from '../../src/lib/types/GenericType';
import CustomType from '../../src/lib/types/CustomType';

export default () => {

  describe('@<method>', () => {
    it('supports most HTTP methods', async() => {
      const doc = await getRes('method/Test_0');

      expect(doc[0].method).to.equal('get');
      expect(doc[0].path).to.equal('/user/test1');

      expect(doc[1].method).to.equal('put');
      expect(doc[1].path).to.equal('/user/test2');

      expect(doc[2].method).to.equal('patch');
      expect(doc[2].path).to.equal('/user/test3');

      expect(doc[3].method).to.equal('post');
      expect(doc[3].path).to.equal('/user/test4');

      expect(doc[4].method).to.equal('delete');
      expect(doc[4].path).to.equal('/user/test5');
    });

    it('not providing a path should throw', () => {
      return getRes('method/Test_1').should.be.rejectedWith(Error, 'Error: Tag "@GET" is missing its path.');
    });

    it('documentation comment is method description', async() => {
      const doc = await getRes('method/Test_2');

      expect(doc[0].description).to.equal('Hello dear');
      expect(doc[1].description).to.equal(null);
    });
  });

  describe('@consumes/@produces', async() => {
    it('defines the input/output format of the route', async() => {
      const doc = await getRes('consumes_produces/Test_0');

      expect(doc[0].consumes).to.equal('application/json');
      expect(doc[0].produces).to.equal(null);

      expect(doc[1].consumes).to.equal(null);
      expect(doc[1].produces).to.equal('application/json');

      expect(doc[2].consumes).to.equal(null);
      expect(doc[2].produces).to.equal(null);
    });
  });

  describe('Parameters', () => {
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
      const param: ObjectType = parameterList.get('RecordParam');
      expect(param).to.be.instanceOf(ObjectType);

      const member1: PrimitiveType = param.members.get('test');
      expect(member1).to.be.instanceOf(PrimitiveType);
      expect(member1.description).to.equal(null);
      expect(member1.nativeType).to.equal('number');
      expect(member1.name).to.equal('test');
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

    it('throws if the a param is described twice', () => {
      return getRes('param/Test_5')
        .then(doc => doc[0].validate())
        .should.be.rejectedWith(Error);
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

      it('defines path parameters', async () => {
        const doc : Route[] = await getRes('param/Test_3');
        const param : PrimitiveType = doc[0].pathParameters.get('param');

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

  // TODO typedef.
};

function getRes(filename: string): string {
  return jsdoc(`${__dirname}/resources/${filename}.js`);
}
