import  Router  from '@koa/router';
import controllersubject from '../controllers/subjectController.js';

const route = new Router();
const controller = controllersubject();

route.get('/:id', controller.getById);
route.post('/', controller.createsubject);
route.delete('/:id', controller.deleteById);
route.put('/:id', controller.updateById);


export default route;