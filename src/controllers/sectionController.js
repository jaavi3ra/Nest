import moongose from 'mongoose'
import * as yup from 'yup';
import Section from '../Model/section.js'

const { ObjectId } = moongose.Types

const getSectionController = () => {
  const getAll = async ctx => {
    const sections = await Section.find();
    ctx.body = sections
  }
 
  const getById = async ctx => {
    const { id } = ctx.request.params
    if (ObjectId.isValid(id)) {
      const sections = await Section.findOne({ studentList : id })
      .populate({
          path: 'studentList',
          populate: {
              path: 'user'
          }
      }).exec();
      
      if (!sections) {
        ctx.body = 'Invalid Credetial (2)'
        ctx.status = 404
        return
      } else {
        ctx.body = sections
        ctx.status = 200
      }

    } else {
      ctx.body = 'Invalid Credetial (3)'
      ctx.status = 400
      return
    }
  }

  const create = async ctx => {
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      section_name: yup.string().required(),
      studentList: yup.string().test({ 
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
    const newsection = new Section(payload)

    try {
      const createdsectiom = await newsection.save()
      ctx.body = createdsectiom
      ctx.status = 201
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
      ctx.status = 400
      return
    }
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      studentList: yup.string().test({ 
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
   
    await Section.updateOne({ _id: new ObjectId(id) },payload)
    ctx.status = 200 
  }

  const deleteById = ctx => {
    const { id } = ctx.request.params
    if (!ObjectId.isValid(id)) {
      ctx.status = 404
      return
    }
    Section.deleteOne({ _id: id })
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
export default getSectionController;