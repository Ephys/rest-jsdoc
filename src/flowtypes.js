import BaseType from './lib/types/abstract/BaseType';
import Route from './lib/Route';

export type ParseResult = Promise<(BaseType|Route)[]>;
export type FormatterParameter = { types: Map<string, BaseType>, routes: Route[] };
