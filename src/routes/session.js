import controllersession from '../controllers/sessionController.js';
import  Router  from '@koa/router';

const route = new Router();
const controller = controllersession();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.create);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);


export default route;