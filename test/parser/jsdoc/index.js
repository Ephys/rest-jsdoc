import fs from 'fs';
import jsdoc from '../../../src/parsers/jsdoc';

export default () => {
  const files = fs.readdirSync(`${__dirname}/tags`);

  files.forEach(file => {
    return require(`${__dirname}/tags/${file}`); // eslint-disable-line global-require
  });
};

export function getRes(filename: string): string {
  return jsdoc(`${__dirname}/../resources/${filename}.js`);
}
