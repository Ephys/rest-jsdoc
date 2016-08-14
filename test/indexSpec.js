#!javascript

import 'babel-polyfill';
import { describe } from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import jsdoc from './parser/jsdoc';

chai.use(chaiAsPromised);

chai.should();

describe('rest-jsdoc', () => {
  describe('parser', () => {
    describe('jsdoc', jsdoc);
  });

  describe('formatter', () => {

  });
});
