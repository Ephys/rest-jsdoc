
import { it } from 'mocha';
import jsdoc from '../../src/parsers/jsdoc/';

export default () => {

  it('supports most HTTP methods #0', async () => {
    const doc = await jsdoc(getRes('Test_0'));


  });
};

function getRes(filename : string) : string {
  return  `${__dirname}/resources/${filename}`;
}
