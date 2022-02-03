import moongose from 'mongoose'
import * as yup from 'yup';
import Subject from '../Model/subject.js'

const { ObjectId } = moongose.Types

const getSubjectController = () => {

  const getAll = async ctx => {
    const data = await Subject.find() .populate({
      path: 'teacher',
      populate: {
        path: 'user'
      }     
    })
    .exec();
    ctx.body = data
  }

  const getById = async ctx => {
    const { id } = ctx.request.params
      if (ObjectId.isValid(id)) {
        const subject = await Subject.findById( id )
        .populate({
          path: 'teacher',
          populate: {
            path: 'user'
          }     
        })
        .populate({
          path: 'schedule'         
        })
        .populate({
          path: 'subject'         
        })
        .exec();
        if (!subject) {
          ctx.body = 'Invalid Credetial (1)'
          ctx.status = 404
          return 
        } else {
         
          ctx.body = subject
          ctx.status = 200
        }
        
      } else {
        ctx.body = 'Invalid Credetial (5) '
        ctx.status = 400
        return
      }
  }

  const createsubject = async ctx => {
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      namesubject: yup.string().required(),
      teacher: yup.string().test({ 
          name: 'ObjectId', 
          message: 'Invalid ObjectId', 
          test: val => ObjectId.isValid(val) }),
      schedule: yup.array().of(yup.string().test({ 
          name: 'ObjectId', 
          message: 'Invalid ObjectId', 
          test: val => ObjectId.isValid(val) })),
      subject: yup.array().of(yup.string().test({ 
          name: 'ObjectId', 
          message: 'Invalid ObjectId', 
          test: val => ObjectId.isValid(val) })),
    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    const newsubject = new Subject(payload)

    try {
      const createdsubject = await newsubject.save()
      ctx.body = createdsubject
      ctx.status = 200
    } catch (e) {
      if (e.code === 11000) {
        ctx.status = 400
        return
      }
      ctx.status = 500
      ctx.body = e.message
      return
    }
  }

  const updateById =  async ctx => {
    const { id } = ctx.request.params
    if (!ObjectId.isValid(id)) {
      ctx.status = 404
      return
    }
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({
      teacher: yup.string().test({ 
          name: 'ObjectId', 
          message: 'Invalid ObjectId', 
          test: val => ObjectId.isValid(val) }),
      schedule: yup.array().of(yup.string().test({ 
          name: 'ObjectId', 
          message: 'Invalid ObjectId', 
          test: val => ObjectId.isValid(val) })),
      subject: yup.array().of(yup.string().test({ 
          name: 'ObjectId', 
          message: 'Invalid ObjectId', 
          test: val => ObjectId.isValid(val) })),
    })
    
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    const updated = await Subject.updateOne({ _id: new ObjectId(id) },payload)
    if(!updated){
      ctx.status = 400
      return
    }
    ctx.status = 200
    ctx.body = 'update success'

  }

  const deleteById = ctx => {
    const { id } = ctx.request.params
    Subject.deleteOne({ _id: id })
    ctx.status = 200
  }
  return {
    createsubject,
    getAll,
    getById,
    deleteById,
    updateById
  }
}
export default getSubjectController