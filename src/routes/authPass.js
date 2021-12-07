import  Router  from '@koa/router';
import controllerAuth from '../controllers/authLogin.js';

const route = new Router();
const controller = controllerAuth();

route.put('/:id', controller.changePassword);
route.post('/', controller.getIdByRut)

export default route;