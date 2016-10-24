# parsing:

- Array/Date/... special cases
  - Should be user-definable, like a callback for custom types that do not have a typedef available.
- Allow defining tag synonyms ('respond' => 'responds', 'pathParameter' => 'pathParam').
- Enable custom tag handling (like @authenticate).
- deprecated support.

- Support for more complex native types (integer, ...)
- Support for native obejcts (Date, ...)
- Override support
- Cyclic typedefs -> Throw
- HTTP method extend
- Typedef extend

# formatting:

- Support for basepath, host, schemes.

# Swagger formatter:

- Support for Route.operationId
- Support for Route.Responses.Default
- SUpport for Route.Response.x.headers|exemples

# Decorator and flowtype support:

Avoid duplicating everything in the JSDoc

- Extract metadata from decorators (@GET, @queryParam, etc)
- Extract parameter types from typeflow ? Unlikely as it isn't standard though.

```javascript
import { GET, queryParam } from 'express-decorators';
import { string, array } from 'data-extractors';

/**
 * @GET /the_thing
 * @queryParam {!string[]} [tag] - The list of tags
 **/
@GET('/the_thing')
function getTheThing(
  @queryParam('tag', {
    extractor: array(string),
    allowNull: false,
    optional: true,
  }) tag: ?string[]
) {

}
```

- AST vs decorators adding metadata to the methods and registering them ?
- probably second option. But needs a way to be notified when a decorator is used. Proxy ? Ask decorator lib to make their decorators observable.
- Decorators and JSDoc should merge, with JSDoc taking over in case of conflict.
