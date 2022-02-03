import mongoose from 'mongoose'

const ScheduleSchema = new mongoose.Schema({
    date: {
    type: String,
    required: true,
  },
   day: {
    type: String,
    required: true,
  },
   hour: {
    type: String,
    required: true,
    unique: true,
  }
 
}, { timestamps: true })

export default mongoose.model('Schedule', ScheduleSchema)