import 'reflect-metadata';
// @get, @post, @put, @delete

export const get = <T>(route: string) => {
  return function (thisObject: T, thisMethodName: string) {
    Reflect.defineMetadata('route', route, thisObject, thisMethodName);
    Reflect.defineMetadata('method', 'get', thisObject, thisMethodName);
  };
};

export const post = <T>(route: string) => {
  return function (thisObject: T, thisMethodName: string) {
    Reflect.defineMetadata('route', route, thisObject, thisMethodName);
    Reflect.defineMetadata('method', 'post', thisObject, thisMethodName);
  };
};
