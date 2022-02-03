import  Router  from '@koa/router';
import controllerCareer from '../controllers/careerController.js';

const route = new Router();
const controller = controllerCareer();

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.createCareer);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);


export default route;