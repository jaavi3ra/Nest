import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const submissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  student: {
    type: ObjectId,
    ref: 'Student',
    required: true,
  },
  evaluation: {
    type: ObjectId,
    ref: 'Evaluation',
    required: true,
  },
}, { timestamps: true })

export default mongoose.model('Submission', submissionSchema)