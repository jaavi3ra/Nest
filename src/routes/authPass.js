import  Router  from '@koa/router';
import router from './index.js';
import controllerAuth from '../controllers/authLogin.js';

const route = new Router();
const controller = controllerAuth();

route.put('/:id', controller.changePassword);

export default route;