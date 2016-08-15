/**
 * See http://swagger.io/specification/
 */
export type SwaggerDefinition = {

  swagger: string;

  info: SwaggerInfo;

  host: ?string;

  basePath: ?string;

  schemes: ?string[];

  consumes: ?string[];

  produces: ?string[];

  paths: {
    [key: string]: SwaggerPath;
  };
};

export type SwaggerInfo = {

  title: string;

  description: ?string;

  termsOfService: ?string;

  contact: ?SwaggerContact;

  license: ?SwaggerLicense;

  version: string;
}

export type SwaggerContact = {

  name: ?string;

  url: ?string;

  email: ?string;
};

export type SwaggerLicense = {

  name: string;

  url: ?string;
};

export type SwaggerPath = {
  $ref: ?string;

  get: ?SwaggerPathOperation;
  put: ?SwaggerPathOperation;
  post: ?SwaggerPathOperation;
  delete: ?SwaggerPathOperation;
  options: ?SwaggerPathOperation;
  head: ?SwaggerPathOperation;
  patch: ?SwaggerPathOperation;

  parameters: ?(SwaggerParameter|SwaggerReference)
};

export type SwaggerPathOperation = {

};

export type SwaggerParameter = {

};

export type SwaggerReference = {
  $ref: string;
};
