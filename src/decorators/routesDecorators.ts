import 'reflect-metadata';
import { RequestHandler } from 'express';

// @get, @post, @put, @delete
const setMethod = (method: string): Function => {
  return function (route: string): Function {
    return function (thisObject: any, thisMethodName: string): void {
      Reflect.defineMetadata('route', route, thisObject, thisMethodName);
      Reflect.defineMetadata('method', method, thisObject, thisMethodName);
    };
  };
};

export const get = setMethod('get');
export const post = setMethod('post');
export const put = setMethod('put');
export const del = setMethod('delete');

// @use
export const use = (middleware: RequestHandler) => {};
