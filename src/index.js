import openapi from './lib/formatters/openapi';
import parse from './lib/parsers/jsdoc';
import _ from 'lodash';

export default function ({ files = [], formatter = openapi, parser = parse } = {}) {

  return Promise.all(files.map(router => parser(router)))
    .then(results => _.flatten(results))
    .then(formats => {
      console.log(formats[0]);
    })
    .catch(e => console.error(e));
}
