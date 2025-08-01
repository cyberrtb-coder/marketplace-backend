import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// ✅ Enable JSON body parsing
app.use(express.json());

// ✅ Enable CORS for your frontend
// For now, allow all origins for testing
app.use(cors({
  origin: '*', 
  methods: ['GET','POST','PUT','DELETE'],
}));

// ✅ Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Marketplace backend running ✅' });
});

// ✅ Product routes
app.use('/api/products', productRoutes);

// ✅ Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
