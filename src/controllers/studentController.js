import moongose from 'mongoose'
import userdata from '../Model/student.js'
import * as yup from 'yup';

const { ObjectId } = moongose.Types

const getStudentController = () =>{

    const getAll = async ctx =>{
        const data = await userdata.find();
        ctx.body = data
    }

    const getById = async ctx =>{
        const { id } = ctx.request.params 
        if (ObjectId.isValid(id)) {
             const data = await userdata.findById(id);
        if(!data){
            ctx.body = 'Seccion no encontrado'
            ctx.status= 404
        }else{
            ctx.body = data
            ctx.status = 200
        }
        
          }else {
            ctx.body = 'ID no encontrado'
            ctx.status = 400
          }
    }

    const createStudent = async ctx =>{
       const payload = ctx.request.body
  
       const yupSchema = yup.object().shape({      //validacion
       user: yup.string().test({name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
       enrolled: yup.string().required(),
      })

    try {
        yupSchema.validateSync(payload)
      } catch (e) {
        ctx.status = 400 
        ctx.body= e.message
      }

      const newdata = new userdata(payload)

      try {
        const createddata = await newdata.save()
        ctx.body = createddata
        ctx.status = 201
    } catch (e){
        if (e.code === 11000) {
            ctx.status = 409
          }
          ctx.status = 500
          ctx.body = e.message
        
    }
    }

    const updateById = ctx =>{
        const {id} = ctx.request.params

        if(!ObjectId.isValid(id)){
            ctx.body= 204
        }
        const payload = ctx.request.body

        const yupSchema = yup.object().shape({      //validacion
          user: yup.string().test({name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
          enrolled: yup.string().required(),
         })

          try {
            yupSchema.validateSync(payload)
          } catch (e) {
            ctx.status =400 
            ctx.body= e.message
          }
    }

    const deleteById = ctx =>{
        const { id } = ctx.request.params
        userdata.deleteById(id)
        ctx.body= 204
    }

    return{
        createStudent,
        getAll,
        getById,
        deleteById,
        updateById
    }
}
export default getStudentController