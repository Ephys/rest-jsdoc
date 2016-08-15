import { describe, it } from 'mocha';
import { expect } from 'chai';
import Route, { Response } from '../../../../src/lib/Route';
import { getRes } from '../index';

describe('@responds', () => {
  it('describes the responses', async() => {
    const route: Route = (await getRes('responds/Test_0'))[0];

    const responses: Response[] = route.responses;
    expect(responses[0].httpCode).to.equal(200);
    expect(responses[0].type.description).to.equal('The test ID.');

    expect(responses[1].httpCode).to.equal(400);
    expect(responses[1].type.description).to.equal('invalid 1.');

    expect(responses[2].httpCode).to.equal(400);
    expect(responses[2].type.description).to.equal('invalid 2.');
  });

  it('rejects invalid http codes', () => {
    return getRes('responds/Test_1').should.be.rejected;
  });
});
