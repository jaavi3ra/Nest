import  Router  from '@koa/router';
import controllersubject from '../../controllers/subjectController.js';

const route = new Router();
const controller = controllersubject();


route.get('/:id', controller.getByIdSection);

export default route;