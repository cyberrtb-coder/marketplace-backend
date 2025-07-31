import express from "express";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";

const router = express.Router();

/**
 * ✅ GET CART BY USER ID
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({ success: false, message: "Cart not found" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(200).json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error("❌ Failed to fetch cart:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * ✅ ADD PRODUCT TO CART
 */
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({ success: false, message: "Invalid userId" });
    }

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: "Missing productId or quantity" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.json({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    console.error("❌ Failed to add to cart:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
