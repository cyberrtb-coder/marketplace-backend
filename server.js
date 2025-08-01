import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import cartRoutes from "./routes/cart.js";
import productsRoutes from "./routes/products.js"; // ✅ New route

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/cart", cartRoutes);
app.use("/api/products", productsRoutes); // ✅ Products route

// Test root route
app.get("/", (req, res) => {
  res.json({ message: "Marketplace backend running ✅" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
