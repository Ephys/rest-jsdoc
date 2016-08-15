
/**
 * Type 1 description.
 * @typedef {!Object} Test1
 */

/**
 * @typedef {!Object} Test2 - Type 2 description.
 */

/**
 * @typedef {!Object} Test3
 * @property {!string} NonNull
 * @property {string} Null
 * @property {string} [Optional]
 * @property {string} NonOptional
 *
 * @property {!string} Primitive
 * @property {!object} Object
 * @property {!object} [Object.Param1] - The first param of Object.
 * @property {!string} Object.Param1.Param2 - The first param of first param of Object.
 * @property {!{ test: string }} Record
 * @property {!Array.<string>} Generic
 * @property {!Test1} Typedef
 * @property {!(string|number)} Union
 *
 * @property {!(string|number)} DescribedProperty - Property description
 */

/**
 * @typedef {!number} Test4
 */

/**
 * @typedef {!{ test: string }} Test5
 * @property {!string} property1
 */
