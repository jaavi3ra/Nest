import moongose from 'mongoose'
import * as yup from 'yup';
import Career from '../Model/career.js'

const { ObjectId } = moongose.Types

const getcareerController = () => {

  const getAll = async ctx => {
    const data = await Career.find()
    .populate('section')
    .populate({
      path: 'subjects',
      populate: {
        path: 'teacher',
        populate: {
          path: 'user'
        }
      }      
    })
    .populate({
      path: 'subjects',
      populate: {
        path: 'schedule'
      }     
    })
    .exec();
    ctx.body = data
  }
  const getById = async ctx => {
    const { id } = ctx.request.params
    if (ObjectId.isValid(id)) {
      const data = await Career.findById(id)
      .populate('section')
      .populate({
        path: 'subjects',
        populate: {
          path: 'teacher',
          populate: {
            path: 'user'
          }
        }      
      })
      .populate({
        path: 'subjects',
        populate: {
          path: 'schedule'
        }     
      })
      .exec();
      if (!data) {
        const subjectBySection = await getByIdSection( id )
        if (subjectBySection){
          ctx.status = 200
          ctx.body = subjectBySection
          console.log('ID section: ',id)
        } else {
          ctx.body = 'Invalid Credetial (4)'
          ctx.status = 404
          return
        }
      } else {
        console.log('ID subject: ',id)
        ctx.body = data
        ctx.status = 200
      }

    } else {
      ctx.body = 'Invalid Credetial (2)'
      ctx.status = 400
      return
    }
  }
  //buscar con id section
  const getByIdSection = async id => {  
    const subject = await Career.findOne({ section: id }) 
    .populate('section')
    .populate({
      path: 'subjects',
      populate: {
        path: 'teacher',
        populate: {
          path: 'user'
        }
      }      
    })
    .populate({
      path: 'subjects',
      populate: {
        path: 'schedule'
      }     
    })
    .exec();
   return subject
  }
  const createCareer = async ctx => {
    const payload = ctx.request.body
    const yupSchema = yup.object().shape({  
      name: yup.string().required(),
      section: yup.string().test({ 
        name: 'ObjectId', 
        message: 'Invalid ObjectId', 
        test: val => ObjectId.isValid(val) }),
      subjects: yup.array().of(yup.string().test({ 
        name: 'ObjectId', 
        message: 'Invalid ObjectId', 
        test: val => ObjectId.isValid(val) })),        
    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      console.log('error')
      return
    }
    const newdata = new Career(payload)
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
      subjects: yup.string().test({ 
        name: 'ObjectId', 
        message: 'Invalid ObjectId', 
        test: val => ObjectId.isValid(val) }),        
    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    const subject = await Career.findOne({ subjects: payload.subjects })
    if (subject){
      ctx.status = 400
      ctx.body = 'Subject Exists!'
      return
    } else {
      await Career.updateOne(
        { _id: new ObjectId(id) },
        { $push: {subjects: payload.subjects} })
      ctx.status = 200 
    }
  }
  
  const deleteById = ctx => {
    const { id } = ctx.request.params
    Career.deleteOne({_id: id})
    ctx.status = 200
  }
  return {
    createCareer,
    getAll,
    getById,
    deleteById,
    updateById
  }
}
export default getcareerController