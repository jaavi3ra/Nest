import controllerAuth from '../Auth/AuthLogin.js';
import  Router  from '@koa/router';

const route = new Router();
const controller = controllerAuth();

route.get('/:id',controller.getById)
route.post('/', controller.login);
route.put('/:id', controller.changePassword);

export default route;