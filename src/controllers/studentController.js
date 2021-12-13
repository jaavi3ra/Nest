import moongose from 'mongoose'
import * as yup from 'yup';
import Student from '../Model/student.js'

const { ObjectId } = moongose.Types

const getStudentController = () => {

  const getAll = async ctx => {
    const studData = await Student.find().populate('user').exec();
    ctx.body = studData
  }

  const getById = async ctx => {
    const { id } = ctx.request.params
    if (ObjectId.isValid(id)) {
      const studData = await Student.findOne({ user:id }).populate('user').exec();
      if (!studData) {
        ctx.body = 'Invalid Credetial (1)'
        ctx.status = 404
        return
      } else {
        ctx.body = studData
        ctx.status = 200
      }

    } else {
      ctx.body = 'Invalid Credetial (2)'
      ctx.status = 400
      return
    }
  }

  const createStudent = async ctx => {
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({      //validacion
      user: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
      enrolled: yup.string().required(),
    })

    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }

    const newdata = new Student(payload)

    try {
      const createddata = await newdata.save()
      ctx.body = createddata
      ctx.status = 201
    } catch (e) {
      if (e.code === 11000) {
        ctx.status = 409
        return
      }
      ctx.status = 500
      ctx.body = e.message
      return
    }
  }

  const updateById = ctx => {
    const { id } = ctx.request.params
    if (!ObjectId.isValid(id)) {
      ctx.status = 400
      return
    }
    const payload = ctx.request.body

    const yupSchema = yup.object().shape({
      user: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
      enrolled: yup.string().required(),
    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    ctx.status = 200
  }

  const deleteById = ctx => {
    const { id } = ctx.request.params
    Student.deleteOne(id)
    ctx.status = 200
  }

  return {
    createStudent,
    getAll,
    getById,
    deleteById,
    updateById
  }
}
export default getStudentController