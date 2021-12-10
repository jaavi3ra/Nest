import  Router  from '@koa/router';
import controllerUser from '../controllers/usersControllers.js';

const route = new Router();
const usercontroller = controllerUser();

route.get('/', usercontroller.getAll);
route.get('/:id', usercontroller.getById);
route.post('/', usercontroller.register);
route.delete('/:id', usercontroller.deleteById);
route.put('/:id', usercontroller.updateById);


export default route;