import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const evaluationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date, // fecha de entrega
    required: true,
  },
  subject: {
    type: ObjectId,
    ref: 'Subject',
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Evaluation', evaluationSchema)