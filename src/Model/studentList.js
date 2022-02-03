import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const studentListSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
  },
  user: {
    type: [ObjectId],
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('StudentList', studentListSchema)