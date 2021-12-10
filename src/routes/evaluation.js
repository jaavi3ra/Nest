import  Router  from '@koa/router';
import controllerEvaluation from '../controllers/evaluationController.js';

const route = new Router();
const controller = controllerEvaluation();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.create);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);


export default route;