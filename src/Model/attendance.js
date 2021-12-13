import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const attendanceSchema = new mongoose.Schema({
  student: {
    type: ObjectId,
    ref: 'Student',
    required: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
  session: {
    type: ObjectId,
    ref: 'Session',
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('attendance', attendanceSchema)