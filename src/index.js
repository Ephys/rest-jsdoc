import openapiFormatter from './formatters/openapi';
import jsdocParser from './parsers/jsdoc';
import _ from 'lodash';
import Route from './lib/Route';
import BaseType from './lib/types/abstract/BaseType';

export default function ({ files = [], formatter = openapiFormatter(), parser = jsdocParser } = {}) {

  const types = new Map();
  const routes = [];

  return Promise.all(files.map(router => parser(router)))
    .then(results => {
      const formats = _.flatten(results);

      for (const format of formats) {
        if (format instanceof Route) {
          routes.push(format);
          continue;
        }

        if (format instanceof BaseType) {
          const name = format.name;

          if (types.has(name)) {
            throw new Error(`Duplicate type definition for ${name}.`);
          }
        }

        throw new Error(`Unknown class received ${getName(format)}`);
      }

      return formatter({ routes, types });
    });
}

function getName(item) {
  if (typeof item !== 'object' || item === null) {
    return JSON.stringify(item);
  }

  if (!item.prototype || !item.prototype.constructor) {
    return 'Object';
  }

  return item.prototype.constructor.name;
}
