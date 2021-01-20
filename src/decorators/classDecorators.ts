import 'reflect-metadata';
import { myRouter } from '../myRouter';

enum Methods {
  post = 'post',
  get = 'get',
  put = 'put',
  delete = 'delete',
}

export const classController = (routePrefix: string) => {
  return (thisObject: Function) => {
    const router = myRouter.getMyRouter;

    for (let key in thisObject.prototype) {
      const method = thisObject.prototype[key];

      const route = Reflect.getMetadata('route', thisObject.prototype, key);
      const metaMethod: Methods = Reflect.getMetadata(
        'method',
        thisObject.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata('middleware', thisObject.prototype, key) || [];

      if (route) {
        router[metaMethod](`${routePrefix}${route}`, ...middlewares, method);
      }
    }
  };
};
