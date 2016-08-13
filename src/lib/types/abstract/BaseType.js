/**
 * Base class for types.
 *
 * @class BaseType
 * @abstract
 */
export default class BaseType {

  name: string;
  description: ?string;
  nullable: boolean;
  optional: boolean;
}

BaseType.prototype.name = '';
BaseType.prototype.description = null;
BaseType.prototype.nullable = true;
BaseType.prototype.optional = false;
