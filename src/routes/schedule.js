import  Router  from '@koa/router';
import controllerSchedule from '../controllers/scheduleController.js';

const route = new Router();
const controller = controllerSchedule();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.createSchedule);
route.put('/:id', controller.updateById);
route.delete('/:id', controller.deleteById);

export default route;