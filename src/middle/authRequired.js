import { jwtValidate } from '../lib/jwt.js'

const authRequired = async (ctx, next) => {
  try {
    const { authorization } = ctx.headers
    if (!authorization) {
        ctx.status = 401 
    }
    const [authType, token] = authorization.split(' ')
    if (authType !== 'Bearer') { throw Error('Invalid auth type') }
    const jwtPayload = jwtValidate(token)
    ctx.state.userSession = jwtPayload
  } catch (e) {
    ctx.status = 401 
    ctx.body = e.message
  }
  await next()
}


export default authRequired