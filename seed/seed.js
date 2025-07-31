import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();
const products = [
  { name: "iPhone 15", price: 999, description: "Latest Apple iPhone", image: "https://via.placeholder.com/300x300?text=iPhone+15" },
  { name: "Samsung Galaxy S24", price: 899, description: "New Samsung flagship", image: "https://via.placeholder.com/300x300?text=Galaxy+S24" },
  { name: "Sony WH-1000XM5", price: 399, description: "Noise-cancelling headphones", image: "https://via.placeholder.com/300x300?text=Sony+XM5" }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Products seeded");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
