import 'reflect-metadata';
import { myRouter } from '../myRouter';

// const router = myRouter.getRouter
enum Methods {
  post = 'post',
  get = 'get',
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

      if (route) {
        router[metaMethod](`${routePrefix}${route}`, method);
      }
    }
  };
};

// export { classController };
