// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: '*', // Allow all for now (Netlify + Local)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Marketplace backend running ✅' });
});

// ✅ Product routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
