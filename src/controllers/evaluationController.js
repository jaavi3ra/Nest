import moongose from 'mongoose'
import * as yup from 'yup';
import Evaluation from '../Model/evaluation.js'

const { ObjectId } = moongose.Types

const getEvaluationController = () => {

  const getAll = async ctx => {
    const evaData = await Evaluation.find().populate('subject').exec();
    ctx.body = evaData
  }
  const getById = async ctx => {
    const { id } = ctx.request.params
    if (ObjectId.isValid(id)) {
      const evaData = await Evaluation.findOne({ subject: id }).populate('subject').exec();
      if (!evaData) {
        ctx.body = 'Invalid Credetial (1)'
        ctx.status = 404
        return
      } else {
        ctx.body = evaData
        ctx.status = 200
      }
    } else {
      ctx.body = 'Invalid Credetial (2)'
      ctx.status = 400
      return
    }
  }
  const create = async ctx => {
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      name: yup.string().required(),
      deadline: yup.string().required(),
      subject: yup.string().test({ 
        name: 'ObjectId', 
        message: 'Invalid ObjectId', 
        test: val => ObjectId.isValid(val) })
    })

    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    const newEva = new Evaluation(payload)

    try {
      const createdEva = await newEva.save()
      ctx.body = createdEva
      ctx.status = 201
    } catch (e) {
      if (e.code === 11000) {
        ctx.status = 401
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
      ctx.body = 204
    }
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      name: yup.string().required(),
      deadline: yup.string().required(),
      subject: yup.string().test({ 
        name: 'ObjectId', 
        message: 'Invalid ObjectId', 
        test: val => ObjectId.isValid(val) })
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
    Evaluation.deleteById(id)
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
export default getEvaluationController;