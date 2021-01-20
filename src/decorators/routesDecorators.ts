import 'reflect-metadata';
import { RequestHandler } from 'express';
import { ValidationChain } from 'express-validator';

// @get, @post, @put, @delete
const setMethod = (method: string): Function => {
  return function (route: string): Function {
    return function (thisObject: any, thisMethodName: string): void {
      Reflect.defineMetadata('route', route, thisObject, thisMethodName);
      Reflect.defineMetadata('method', method, thisObject, thisMethodName);
    };
  };
};

// @use
const use = (middleware: RequestHandler | ValidationChain[]): Function => {
  return function (thisObject: any, thisMethodName: string) {
    let middlewares = Reflect.getMetadata('middleware', thisObject) || [];
    middlewares = [...middlewares, middleware];

    Reflect.defineMetadata(
      'middleware',
      middlewares,
      thisObject,
      thisMethodName
    );
  };
};

export const decorator = {
  get: setMethod('get'),
  post: setMethod('post'),
  put: setMethod('put'),
  delete: setMethod('delete'),
  use,
};
