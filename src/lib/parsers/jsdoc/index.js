import parse from 'jsdoc-parse';
import streamToPromise from 'stream-to-promise';
import parseRoute from './parseRoute';
import parseTypedef from './type/parseTypedef';

/**
 * Receives a file path and returns the JSDoc inside it.
 * @param {!string} file - The file to parse.
 * @returns {!Promise.<!Array.<Object>>} The JSDoc inside the file.
 */
export default function (file) {

  return streamToPromise(parse({ src: file }))
    .then(response => JSON.parse(response[0]))
    .then(docs => docs.map(doc => parseJsDoc(doc)).filter(doc => doc !== void 0));
}

function parseJsDoc(doc) {
  const route = parseRoute(doc);
  if (route) {
    return route;
  }

  const type = parseTypedef(doc);
  if (type) {
    return type;
  }
}
