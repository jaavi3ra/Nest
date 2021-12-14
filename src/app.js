import Koa from 'koa'
import router from './routes/index.js'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import morgan from 'koa-morgan'


const app = new Koa();
var options = {
    origin: '*'
};
app.use(morgan('dev'));
app.use(cors(options));
app.use(koaBody({jsonLimit: '1kb'}));
app.use(router.routes());
app.use(router.allowedMethods());

export default app;