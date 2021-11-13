import Koa from 'koa'
import router from './routes/index.js'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import morgan from 'koa-morgan'


const app = new Koa();

app.use(morgan('dev'));
app.use(cors());
app.use(koaBody({jsonLimit: '1kb'}))
app.use(router.routes());
app.use(router.allowedMethods());

export default app;