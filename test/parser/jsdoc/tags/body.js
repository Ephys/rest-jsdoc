import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import Route from '../../../../src/lib/Route';
import { getRes } from '../index';
import ObjectType from '../../../../src/lib/types/ObjectType';
import PrimitiveType from '../../../../src/lib/types/PrimitiveType';

describe('body', () => {
  let routes: Route[];

  before(async() => {
    routes = await getRes('body/Test_0');
  });

  describe('@body', () => {
    it('defines the type of the body', () => {
      const body: ObjectType = routes[0].body;

      expect(body).to.be.instanceOf(ObjectType);

      const param: PrimitiveType = body.members.get('color');
      expect(param).to.not.be.undefined();
      expect(param).to.be.instanceOf(PrimitiveType);
      expect(param.name).to.equal('color');
      expect(param.nativeType).to.equal('number');
    });
  });

  describe('@bodyParam', () => {
    it('makes the body an object and defines one of its properties', () => {
      const body: ObjectType = routes[1].body;

      expect(body).to.be.instanceOf(ObjectType);

      const param: PrimitiveType = body.members.get('color');
      expect(param).to.not.be.undefined();
      expect(param).to.be.instanceOf(PrimitiveType);
      expect(param.name).to.equal('color');
      expect(param.nativeType).to.equal('number');
    });
  });
});
