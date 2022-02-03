import moongose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as yup from 'yup';
import User from '../Model/users.js'

const { ObjectId } = moongose.Types

const getUserController = () => {
  const getAll = async ctx => {
    const users = await User.find();
    ctx.body = users

  }
  const getById = async ctx => {
    const { id } = ctx.request.params 
    if (ObjectId.isValid(id)) {
      const users = await User.findById(id);
      if (!users) {
        ctx.body = 'Invalid Credetial (1)'
        ctx.status = 404
        return
      } else {
        ctx.body = users
        ctx.status = 200
      }

    } else {
      ctx.body = 'Invalid Credetial (2)'
      ctx.status = 400
      return
    }

  }

  const register = async ctx => {
    const payload = ctx.request.body

    const yupSchema = yup.object().shape({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      email: yup.string().email().required(),
      rut: yup.string().required(),
      password: yup.string().min(6).required(),

    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(payload.password, salt)
    const usernew = new User({ ...payload, password: hash })

    try {
      const createduser = await usernew.save()
      ctx.body = createduser
      ctx.status = 201
    } catch (e) {
      if (e.code === 11000) {
        ctx.status = 409
        return
      }
      ctx.status = 500
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
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      rut: yup.string().required(),
      password: yup.string().min(6).required()
      
    })
    try {
      yupSchema.validateSync(payload)
    } catch (e) {
      ctx.status = 400
      ctx.body = e.message
      return
    }
    
    if (payload?.password) {
      const salt = bcrypt.genSaltSync(10)
      const hashed = bcrypt.hashSync(payload.password, salt)
      await User.updateOne({ _id: new ObjectId(id) }, { ...payload, password: hashed })
    } else {
      await User.updateOne({ _id: new ObjectId(id) }, payload)    
    }
    ctx.status = 200
  }

  const deleteById = ctx => {
    const { id } = ctx.request.params
    User.deleteOne({_id: id})
    ctx.status = 200
  }
  return {
    getAll,
    getById,
    register,
    deleteById,
    updateById
    
  }

}

export default getUserController;