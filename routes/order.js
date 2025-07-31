import express from "express";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";

const router = express.Router();

/**
 * ✅ PLACE ORDER
 */
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({ success: false, message: "Invalid userId" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ success: false, message: "Cart is empty" });
    }

    // Here we would normally save an Order to DB
    // For now, just clear the cart
    cart.items = [];
    await cart.save();

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("❌ Failed to place order:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
