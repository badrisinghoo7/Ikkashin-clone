import express from 'express';
import multer from 'multer';
import Submission from '../models/submissionModel.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/submit', upload.single('fileUrl'), async (req, res) => {
  try {
    const { title, description, studentName, studentId, submittedBy, status,imgLink } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'submissions' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary upload failed', error });
        }

        const submission = new Submission({
          title,
          description,
          fileUrl: result.secure_url,
          studentName,
          status,
          studentId,
          submittedBy,
          imgLink,
        });

        await submission.save();

        res.status(201).json({ message: 'Submission successful', submission });
      }
    );

    const stream = result;
    stream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const status = req.query.status;

    const skip = (page - 1) * limit;

    const filter = {};
    if (status && status !== "all") {
      filter.status = status;
    }

    const [submissions, total] = await Promise.all([
      Submission.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Submission.countDocuments(filter)
    ]);

    res.status(200).json({
      submissions,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSubmissions: total
    });

  } catch (err) {
    res.status(500).json({ message: 'Error fetching submissions', error: err.message });
  }
});


export default router;