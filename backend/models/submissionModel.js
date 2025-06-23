import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Submission title is required'],
    },
    description: {
      type: String,
    },
    fileUrl: {
      type: String,
      required: [true, 'Attachment is required'],
    },
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
