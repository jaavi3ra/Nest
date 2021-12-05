import moongose from 'mongoose'
import * as yup from 'yup';
import userdata from '../Model/submission.js'

const { ObjectId } = moongose.Types

const getSubmissionController = () => {

  const getAll = async ctx => {
    const submiData = await userdata.find();
    ctx.body = submiData

  }
  const getById = async ctx => {
    const { id } = ctx.request.params
    if (ObjectId.isValid(id)) {
      const submiData = await userdata.findById(id);
      if (!submiData) {
        ctx.body = 'Seccion no encontrado'
        ctx.status = 404
        return
      } else {
        ctx.body = submiData
        ctx.status = 200
      }

    } else {
      ctx.body = 'ID no encontrado'
      ctx.status = 400
      return
    }
  }
  const create = async ctx => {
    const payload = ctx.request.body

    const yupSchema = yup.object().shape({
      title: yup.string().required(),
      grade: yup.string().required(),
      student: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
      evaluation: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) })
    })

    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    const newsection = new userdata(payload)

    try {
      const createdsectiom = await newsection.save()
      ctx.body = createdsectiom
      ctx.status = 201
    } catch (e) {
      if (e.code === 11000) {
        ctx.status = 404
      }
      ctx.status = 500
      ctx.body = e.message
      return
    }
  }
  const updateById = async ctx => {
    const { id } = ctx.request.params
    if (!ObjectId.isValid(id)) {
      ctx.status = 400
    }
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      title: yup.string().required(),
      grade: yup.string().required(),
      student: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
      evaluation: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) })
    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
  }
  const deleteById = ctx => {
    const { id } = ctx.request.params
    if (!ObjectId.isValid(id)) {
      ctx.status = 404
      return
    } 
    userdata.deleteById(id)
    ctx.status = 200
  }
  return {
    getAll,
    getById,
    deleteById,
    create,
    updateById
  }
}
export default getSubmissionController;