import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.error(err));

const products = [
  { name: "Laptop", price: 1200, image: "https://via.placeholder.com/150" },
  { name: "Headphones", price: 200, image: "https://via.placeholder.com/150" },
  { name: "Smartphone", price: 800, image: "https://via.placeholder.com/150" },
];

async function seedProducts() {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("✅ Sample products added");
  mongoose.connection.close();
}

seedProducts();
