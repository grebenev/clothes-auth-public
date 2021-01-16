import 'reflect-metadata';
// @get, @post, @put, @delete

export const get = (route: string) => {
  return function (
    thisObject: any,
    thisMethodName: string,
    desc: PropertyDescriptor
  ) {
    Reflect.defineMetadata('route', route, thisObject, thisMethodName);
  };
};
