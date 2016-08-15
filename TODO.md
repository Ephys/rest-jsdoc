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
