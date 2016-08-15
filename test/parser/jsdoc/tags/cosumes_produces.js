import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getRes } from '../index';

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
