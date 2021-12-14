import moongose from 'mongoose'
import * as yup from 'yup';
import Teacher from '../Model/teacher.js'

const { ObjectId } = moongose.Types

const getTeacherController = () => {

  const getAll = async ctx => {
    const data = await Teacher.find().populate('user').exec();
    ctx.body = data
  }
  const getById = async ctx => {
    const { id } = ctx.request.params
    if (ObjectId.isValid(id)) {
      const data = await Teacher.findById(id).populate('user').exec();
      if (!data) {
        ctx.body = 'Invalid Credetial (1)'
        ctx.status = 404
        return
      } else {
        ctx.body = data
        ctx.status = 200
      }

    } else {
      ctx.body = 'Invalid Credetial (2)'
      ctx.status = 400
      return
    }
  }
  const createTeacher = async ctx => {
    const payload = ctx.request.body

    const yupSchema = yup.object().shape({  //validacion
      user: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
      description: yup.string().required(),

    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    const newdata = new Teacher(payload)

    try {
      const createddata = await newdata.save()
      ctx.body = createddata
      ctx.status = 200
    } catch (e) {
      if (e.code === 11000) {
        ctx.status = 404
        return
      }
      ctx.status = 500
      ctx.body = e.message
      return
    }
  }

  const updateById = async ctx => {
    const { id } = ctx.request.params
    if (!ObjectId.isValid(id)) {
      ctx.status = 404
      return
    }
    const payload = ctx.request.body

    const yupSchema = yup.object().shape({
      user: yup.string().test({ 
        name: 'ObjectId', 
        message: 'Invalid ObjectId', 
        test: val => ObjectId.isValid(val) }),
      description: yup.string().required()
    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    await Teacher.updateOne({ _id: new ObjectId(id) },payload)
    ctx.status = 200 
  }
  
  const deleteById = ctx => {
    const { id } = ctx.request.params
    Teacher.deleteOne(id)
    ctx.status = 200
  }
  return {
    createTeacher,
    getAll,
    getById,
    deleteById,
    updateById
  }
}
export default getTeacherController