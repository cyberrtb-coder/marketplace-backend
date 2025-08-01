// backend/routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(`✅ Products fetched: ${products.length}`);
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({
      message: 'Error fetching products',
      error: err.message || err
    });
  }
});

export default router;
