import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const sectionSchema = new mongoose.Schema({
  section_name: {
    type: String,
    required: true,
  },
  studentList: {
    type: ObjectId,
    ref: 'StudentList',
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Section', sectionSchema)