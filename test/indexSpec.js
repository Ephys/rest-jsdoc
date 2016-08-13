#!javascript

import 'babel-polyfill';
import { describe } from 'mocha';
import chai from 'chai';
import jsdoc from './parser/jsdoc';

chai.should();

describe('rest-jsdoc', () => {
  describe('parser', () => {
    describe('jsdoc', jsdoc);
  });

  describe('formatter', () => {

  });
});
