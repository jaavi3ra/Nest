import  Router  from '@koa/router';
import controllerList from '../controllers/studenListController.js';

const route = new Router();
const controller = controllerList();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.createList);
route.put('/:id', controller.updateById);
route.delete('/:id', controller.deleteById);

export default route;