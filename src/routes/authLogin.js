import  Router  from '@koa/router';
import controllerAuth from '../controllers/authLogin.js';

const route = new Router();
const controller = controllerAuth();

route.post('/', controller.login);

export default route;