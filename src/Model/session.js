import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const sessionSchema = new mongoose.Schema({
  datetime: {
    type: ObjectId,
    ref: 'Schedule',
    required: true,
  },
  subject: {
    type: ObjectId,
    ref: 'Subject',
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Session', sessionSchema)