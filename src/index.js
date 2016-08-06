import openapi from './lib/formatters/openapi';
import parse from './lib/parsers/jsdoc';

export default function ({ files = [], formatter = openapi, parser = parse } = {}) {

  Promise.all(files.map(router => parser(router)))
    .then(routerJsdocs => {
      // TODO
    }).catch(e => console.error(e));
}
