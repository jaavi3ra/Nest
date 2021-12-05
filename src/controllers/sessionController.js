import moongose from 'mongoose'
import * as yup from 'yup';
import userdata from '../Model/session.js'

const { ObjectId } = moongose.Types

const getSessionController = () => {

  const getAll = async ctx => {
    const sessions = await userdata.find();
    ctx.body = sessions
  }
  const getById = async ctx => {
    const { id } = ctx.request.params
    if (ObjectId.isValid(id)) {
      const sessions = await userdata.findById(id);
      if (!sessions) {
        ctx.body = 'Seccion no encontrado'
        ctx.status = 404
        return
      } else {
        ctx.body = sessions
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
      datetime: yup.string().required(),
      subject: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) })
    })

    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    const newsession = new userdata(payload)

    try {
      const createdsessiom = await newsession.save()
      ctx.body = createdsessiom
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
  const updateById = async ctx => {
    const { id } = ctx.request.params
    if (!ObjectId.isValid(id)) {
      ctx.status = 400
      return
    }
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      datetime: yup.string().required(),
      subject: yup.string().test({ name: 'ObjectId', message: 'Invalid ObjectId', test: val => ObjectId.isValid(val) })
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
export default getSessionController;