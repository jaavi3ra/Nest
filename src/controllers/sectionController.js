import moongose from 'mongoose'
import userdata from '../Model/section.js'
import * as yup from 'yup';

const { ObjectId } = moongose.Types

const getSectionController = () =>{

    const getAll = async ctx=>{
        const users = await userdata.find();
        ctx.body = users 
       
        }
    const getById = async ctx=>{
        const { id } = ctx.request.params 
        if (ObjectId.isValid(id)) {
             const users = await userdata.findById(id);
        if(!users){
            ctx.body = 'Seccion no encontrado'
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
    const create = async ctx =>{
        const payload = ctx.request.body
             //validacion
            const yupSchema = yup.object().shape({
                section_name: yup.string().required(),
                users: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) })
              })
             // const { userSession } = ctx.state
             // const payloadWithUser = { ...payload, user: userSession.sub }
             try {
                yupSchema.validateSync(payload)
              } catch (e) {
                ctx.status = 400 
                ctx.body= e.message
              }
              const newsection = new userdata(payload)

              try {
                const createdsectiom = await newsection.save()
                ctx.body = createdsectiom
                ctx.status = 201
            } catch (e){
                if (e.code === 11000) {
                    ctx.status = 409
                  }
                  ctx.status = 500
                  ctx.body = e.message
                
            }
    }
    const updateById = async ctx =>{
        const {id} = ctx.request.params
        if(!ObjectId.isValid(id)){
            ctx.body= 204
        }
        const payload = ctx.request.body
        const yupSchema = yup.object().shape({
            section_name: yup.string().required(),
            users: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) })
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
        if (!ObjectId.isValid(id)) {
            ctx.status = 404
          }
          //session const { userSession } = ctx.state
        userdata.deleteById(id)
        ctx.body= 204
    }
        return {
            getAll,
            getById,
            deleteById,
            create,
            updateById
        }
}
export default getSectionController;