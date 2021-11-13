import moongose from 'mongoose'
import userdata from '../Model/subject.js'
import * as yup from 'yup';

const { ObjectId } = moongose.Types

const getSubjectController = () =>{

    const getAll = async ctx =>{
        const subject = await userdata.find();
        ctx.body = subject
    }
    const getById = async ctx =>{
        const { id } = ctx.request.params 
        if (ObjectId.isValid(id)) {
             const subject = await userdata.findById(id);
        if(!subject){
            ctx.body = 'Seccion no encontrado'
            ctx.status= 404
        }else{
            ctx.body = subject
            ctx.status = 200
        }
        
          }else {
            ctx.body = 'ID no encontrado'
            ctx.status = 400
          }
    }
    const createsubject = async ctx =>{
        const payload = ctx.request.body
        //validacion
       const yupSchema = yup.object().shape({
        namesubject: yup.string().required(),
        section: yup.string().test({name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
        teacher: yup.string().test({name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val)}),
        agenda: yup.string().required()
    })
    try {
        yupSchema.validateSync(payload)
      } catch (e) {
        ctx.status = 400 
        ctx.body= e.message
      }
      const newsubject = new userdata(payload)

      try {
        const createdsubject = await newsubject.save()
        ctx.body = createdsubject
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
        const { id } = ctx.request.params
        if (!ObjectId.isValid(id)) {
          ctx.status =404
          } 
          const payload = ctx.request.body
          //validacion
          const yupSchema = yup.object().shape({
            namesubject: yup.string().required(),
            section: yup.string().test({name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
            teacher: yup.string().test({name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val)}),
            agenda: yup.string().required()
        })
          try {
            yupSchema.validateSync(payload)
          } catch (e) {
            ctx.status = 400
            ctx.body = e.message
          }
    }
    const deleteById = ctx =>{
        const { id } = ctx.request.params
        userdata.deleteById(id)
        ctx.body= 204
    }
    return{
        createsubject,
        getAll,
        getById,
        deleteById,
        updateById
    }
}
export default getSubjectController