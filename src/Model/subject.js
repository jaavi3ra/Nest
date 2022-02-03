import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const subjectSchema = new mongoose.Schema({
  namesubject: {
    type: String,
    required: true,
  },
  teacher: {
    type: ObjectId,
    ref: 'Teacher',
    required: true,
  },
  schedule: {
    type: [ObjectId],
    ref: 'Schedule',
    required: true,
  },
  subject: {
    type: [ObjectId],
    ref: 'Subject',
    required: false,
  },
  
}, { timestamps: true })

export default mongoose.model('Subject', subjectSchema)