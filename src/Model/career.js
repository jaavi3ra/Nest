import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const CareerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  section: {
    type: ObjectId,
    ref: 'Section',
    required: true,
  },
  subjects: {
    type: [ObjectId],
    ref: 'Subject',
    required: true,
  }
 
}, { timestamps: true })

export default mongoose.model('Career', CareerSchema)