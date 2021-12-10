import  Router  from '@koa/router';
import controllerSubmission from '../controllers/submissionController.js';

const route = new Router();
const controller = controllerSubmission();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.create);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);


export default route;