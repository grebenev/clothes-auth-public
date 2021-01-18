import 'reflect-metadata';
// @get, @post, @put, @delete

export const get = <T>(route: string) => {
  return function (
    thisObject: T,
    thisMethodName: string,
    desc: PropertyDescriptor
  ) {
    Reflect.defineMetadata('route', route, thisObject, thisMethodName);
  };
};
