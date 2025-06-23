import express from 'express';
import multer from 'multer';
import Submission from '../models/submissionModel.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup (store file temporarily in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST: Submit Assignment
router.post('/submit', upload.single('fileUrl'), async (req, res) => {
  try {
    const { title, description, studentName, studentId, submittedBy } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'submissions' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary upload failed', error });
        }

        // Save to MongoDB
        const submission = new Submission({
          title,
          description,
          fileUrl: result.secure_url,
          studentName,
          studentId,
          submittedBy,
        });

        await submission.save();

        res.status(201).json({ message: 'Submission successful', submission });
      }
    );

    // Pipe buffer to Cloudinary stream
    const stream = result;
    stream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

// ✅ GET: All Submissions
router.get('/all', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.status(200).json({submissions, length: submissions.length});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching submissions', error: err.message });
  }
});

export default router;
