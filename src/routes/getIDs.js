import  Router  from '@koa/router';
import controllersection from '../controllers/sectionController.js';

const route = new Router();
const controller = controllersection();

route.get('/:id', controller.getIDSection);

export default route;