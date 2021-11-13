import moongose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as yup from 'yup'
import User from '../Model/users.js' 
import { jwtSign } from '../lib/jwt.js'


const { ObjectId } = moongose.Types

const getAuthControllers = () => {

    const getById = async ctx =>{
        const { id } = ctx.request.params 
        
        if (ObjectId.isValid(id)) {
             const users = await User.findById(id);
        if(!users){
            ctx.body = 'Usuario no encontrado'
            ctx.status= 404
        }else{
            ctx.body = users
            ctx.status = 200
        }
        
          }else {
            ctx.body = 'ID no encontrado'
            ctx.status = 400
          }
       
        }
  
    const changePassword = async ctx =>{ 
// opcion de cambiar contraseña
    const { id } = ctx.request.params

        if (!ObjectId.isValid(id)) {
          ctx.status =404
          ctx.body = 'Invalid Credential'
          console.log(' invalid')
          } 
          const payload = ctx.request.body
          
          const yupSchema = yup.object().shape({
            password: yup.string().min(6).required()                  
          })
          try {
            yupSchema.validateSync(payload)
          } catch (e) {
            ctx.status = 400
            ctx.body = e.message
          }     
        //hashear pass
        if (payload?.password) {
            const salt = bcrypt.genSaltSync(10)
            const hashed = bcrypt.hashSync(payload.password, salt)
            await User.updateOne({ _id: new ObjectId(id) }, { ...payload, password: hashed })
          } else {
            await User.updateOne({ _id: new ObjectId(id) }, payload)
          }
      
          ctx.status = 204
          ctx.body = 'password saved successful'
        }


    const login = async ctx => {
    const payload = ctx.request.body

    const yupSchema = yup.object().shape({
      rut: yup.string().email().required(),
      password: yup.string().min(6).required(),
    })

    if (!yupSchema.isValidSync(payload)) {
        ctx.status = 401
        ctx.body = 'invalid credetial'
                
    }

    const user = await User.findOne({ rut: payload.rut })

    if (!user || !bcrypt.compareSync(payload.password, user.password)) {
      ctx.status = 401
      ctx.body = 'invalid credetial'
    }

    const accessToken = jwtSign({
      sub: user._id,
      cid: user._id
    })

    ctx.body = {
      accessToken
    }
    ctx.status = 200
  }
  return{
    login,
    changePassword,
    getById
  }
}
export default getAuthControllers