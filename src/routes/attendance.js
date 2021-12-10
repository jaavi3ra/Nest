import  Router  from '@koa/router';
import controllerAttendance from '../controllers/attendanceController.js';

const route = new Router();
const controller = controllerAttendance();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.create);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);


export default route;