import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const studentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  enrolled: { // matriculado, inscrito
    type: String,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Student', studentSchema)