import moongose from 'mongoose'
import * as yup from 'yup';
import userdata from '../Model/attendance.js'

const { ObjectId } = moongose.Types

const getAttendanceController = () => {
  
  const getAll = async ctx => {
    const attend = await userdata.find();
    ctx.body = attend
  }

  const getById = async ctx => {
    const { id } = ctx.request.params
    if (ObjectId.isValid(id)) {
      const attend = await userdata.findById(id);
      if (!attend) {
        ctx.body = 'Seccion no encontrado'
        ctx.status = 404
        return
      } else {
        ctx.body = attend
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
      user: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
      present: yup.string().required(),
      session: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) })
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
        ctx.status = 400
      }
      ctx.status = 401
      ctx.body = e.message
      return
    }
  }
  const updateById = async ctx => {
    const { id } = ctx.request.params
    if (!ObjectId.isValid(id)) {
      ctx.body = 204
    }
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      user: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) }),
      present: yup.string().required(),
      session: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) })
    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 401
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
export default getAttendanceController;