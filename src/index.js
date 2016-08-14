import _ from 'lodash';
import openapiFormatter from './formatters/openapi';
import jsdocParser from './parsers/jsdoc';
import Route from './lib/Route';
import BaseType from './lib/types/abstract/BaseType';
import type { ParseResult, FormatterParameter } from './flowtypes';
import TypedefMap from './lib/TypedefMap';

export default function ({ files = [], formatter = openapiFormatter(), parser = jsdocParser } : {
  files: string[];
  formatter: (data: FormatterParameter) => any;
  parser: (fileName: string) => ParseResult;
} = {}) : any {

  const typedefs: Map<string, BaseType> = new TypedefMap();
  const routes: Route[] = [];

  return Promise.all(files.map(router => parser(router)))
    .then(results => {
      const formats = _.flatten(results);

      for (const format of formats) {
        if (format instanceof Route) {
          format.validate();
          routes.push(format);
          continue;
        }

        if (format instanceof BaseType) {
          typedefs.set(format.name, format);
        }

        throw new Error(`Unknown class received ${getName(format)}`);
      }

      return formatter({ routes, types: typedefs });
    });
}

function getName(item: any): string {
  if (typeof item !== 'object' || item === null) {
    return JSON.stringify(item);
  }

  if (!item.prototype || !item.prototype.constructor) {
    return 'Object';
  }

  return item.prototype.constructor.name;
}
