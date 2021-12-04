import controllerAuth from '../controllers/authLogin.js';
import  Router  from '@koa/router';

const route = new Router();
const controller = controllerAuth();

route.post('/', controller.login);
route.put('/:id', controller.changePassword);

export default route;