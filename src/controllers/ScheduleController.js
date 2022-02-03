import moongose from 'mongoose'
import * as yup from 'yup';
import Schedule from '../Model/schedule.js'

const { ObjectId } = moongose.Types

const getscheduleController = () => {

  const getAll = async ctx => {
    const data = await Schedule.find()
    ctx.body = data
  }

  const getById = async ctx => {
    const { id } = ctx.request.params

    if (ObjectId.isValid(id)) {
      const data = await Schedule.findById(id)
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

  const createSchedule = async ctx => {
    const payload = ctx.request.body

    const yupSchema = yup.object().shape({  
      date : yup.string().required(),
      day  : yup.string().required(),
      hour : yup.string().required(),
    })

    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }

    const scheduleValid = await Schedule.find({ date: payload.date })
    for (let i = 0; i < scheduleValid.length; i++) {
      const date = scheduleValid[i].date;
      const day = scheduleValid[i].day;
      const hour = scheduleValid[i].hour;
      if ( date == payload.date && day == payload.day && hour == payload.hour ) {
        ctx.status = 400
        ctx.body = 'Date Exists!'
        return
      } else if ( date == payload.date && day !== payload.day ) {
        ctx.status = 400
        ctx.body = 'Day doesn´t correspond!'
        return
      }
    }

    const newdata = new Schedule(payload)

    try {
      const createddata = await newdata.save()
      ctx.body = createddata
      ctx.status = 200
    } catch (e) {
      if (e.code === 11000) {
        ctx.status = 404
        console.log('error')
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
      date : yup.string().required(),
      day  : yup.string().required(),
      hour : yup.string().required(),
    })
    
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    await Schedule.updateOne({ _id: new ObjectId(id) }, payload)
    ctx.status = 200
  }

  const deleteById = ctx => {
    const { id } = ctx.request.params
    Schedule.deleteOne({_id: id})
    ctx.status = 200
  }
  return {
    createSchedule,
    getAll,
    getById,
    deleteById,
    updateById
  }
}
export default getscheduleController