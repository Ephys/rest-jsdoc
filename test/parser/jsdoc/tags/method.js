import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getRes } from '../index';

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
