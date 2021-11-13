import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const teacherSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Teacher', teacherSchema)