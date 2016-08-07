# parsing:

- Array/Date/... special cases
  - Should be user-definable, like a callback for custom types that do not have a typedef available.
- Allow defining tag synonyms ('respond' => 'responds', 'pathParameter' => 'pathParam').
- Enable custom tag handling (like @authenticate).
- deprecated support.

- Allow formater-specific tags.

# formatting:

- Support for basepath, host, schemes.
- Support for default consumes.
- Support for tags.

# Swagger formatter:

- Support for Route.description (along with Route.summary).
- Support for Route.operationId
- Support for Route.Responses.Default
- SUpport for Route.Response.x.headers|exemples
