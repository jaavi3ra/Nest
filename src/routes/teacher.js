import controllerTeacher from '../controllers/teacherController.js';
import  Router  from '@koa/router';

const route = new Router();
const controller = controllerTeacher();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.createTeacher);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);

export default route;