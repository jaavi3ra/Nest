import  Router  from '@koa/router';
import controllerstudent from '../controllers/studentController.js';

const route = new Router();
const controller = controllerstudent();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.createStudent);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);

export default route;