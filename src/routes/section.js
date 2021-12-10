import  Router  from '@koa/router';
import controllersection from '../controllers/sectionController.js';

const route = new Router();
const controller = controllersection();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.create);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);


export default route;