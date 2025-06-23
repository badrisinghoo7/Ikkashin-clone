import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import submissionRoutes from './routes/submissionRoute.js';
import connection from './db/db.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors(
  {
    origin: '*',
  }
));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/submissions', submissionRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Student Submission API is running...');
});



app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log('✅ Database connected successfully');
    
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log(`❌ Error starting server: ${error.message}`);
  }
});