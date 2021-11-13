import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const sectionSchema = new mongoose.Schema({
  section_name: {
    type: String,
    required: true,
  },
  users: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Section', sectionSchema)