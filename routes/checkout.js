import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId } = req.body;

  // Fake checkout - clear the cart
  await Cart.findOneAndUpdate({ userId }, { items: [] });

  res.json({ message: "✅ Checkout complete! Thank you for your purchase." });
});

export default router;
