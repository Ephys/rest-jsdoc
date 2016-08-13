import parse from 'jsdoc-parse';
import streamToPromise from 'stream-to-promise';
import parseRoute from './parseRoute';
import parseTypedef from './type/parseTypedef';
import type { ParseResult } from '../../flowtypes';
import BaseType from '../../lib/types/abstract/BaseType';
import Route from '../../lib/Route';

/**
 * Receives a file path and returns the JSDoc inside it.
 * @param {!string} file - The file to parse.
 * @returns {!Promise.<!Array.<Object>>} The JSDoc inside the file.
 */
export default function (file: string): ParseResult {

  return streamToPromise(parse({ src: file }))
    .then(response => {
      return JSON.parse(response[0])
        .map(doc => parseJsDoc(doc))
        .filter(doc => doc !== null);
    });
}

function parseJsDoc(doc: Object): ?(BaseType|Route) {
  const route: ?Route = parseRoute(doc);
  if (route) {
    return route;
  }

  const type: ?BaseType = parseTypedef(doc);
  if (type) {
    return type;
  }

  return null;
}
