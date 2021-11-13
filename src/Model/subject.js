import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const subjectSchema = new mongoose.Schema({
  namesubject: {
    type: String,
    required: true,
  },
  section: {
    type: ObjectId,
    ref: 'Section',
    required: true,
  },
  teacher: {
    type: ObjectId,
    ref: 'Teacher',
    required: true,
  },
  agenda: {
    type: Date,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Subject', subjectSchema)