import moongose from 'mongoose'
import userdata from '../Model/users.js'
import bcrypt from 'bcryptjs'
import * as yup from 'yup';

const { ObjectId } = moongose.Types

const getUserController = () =>{
    const getAll = async ctx=>{
    const users = await userdata.find();
    ctx.body = users 
   
    }
    const getById = async ctx =>{
        const { id } = ctx.request.params //destructoring
        if (ObjectId.isValid(id)) {
             const users = await userdata.findById(id);
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
        
    const register = async ctx => {
            const payload = ctx.request.body
             //validacion
            const yupSchema = yup.object().shape({
                firstName: yup.string().required(),
                lastName: yup.string().required(),
                email: yup.string().email().required(),
                rut: yup.string().required(),
                password: yup.string().min(6).required(),

              })
              try {
                yupSchema.validateSync(payload)
              } catch (e) {
                ctx.status = 400 
                ctx.body = e.message
              }
          
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(payload.password,salt)
            const usernew = new userdata({ ...payload, password: hash})

            //ingresar user
            try {
                const createduser = await usernew.save()
                ctx.body = createduser
                ctx.status = 201
            } catch (e){
                if (e.code === 11000) {
                  ctx.status = 409
                  }
                  ctx.status = 500
                
            }
           
    }
    const deleteById = ctx =>{
        const { id } = ctx.request.params
        userdata.deleteById(id)
        ctx.body= 204
    }
    const updateById = async ctx =>{
        const { id } = ctx.request.params

        if (!ObjectId.isValid(id)) {
          ctx.status =404
          } 

          const payload = ctx.request.body
          
          const yupSchema = yup.object().shape({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            email: yup.string().email().required(),
            rut: yup.string().required(),
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
            await userdata.updateOne({ _id: new ObjectId(id) }, { ...payload, password: hashed })
          } else {
            await userdata.updateOne({ _id: new ObjectId(id) }, payload)
          }
      
          ctx.status = 204
        }

    

    return{ 
        getAll,
        getById,
        register,
        deleteById,
        updateById 
    
    }
    
}

export default getUserController;