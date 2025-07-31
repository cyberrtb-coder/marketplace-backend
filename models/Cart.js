import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: String, // Changed to string for compatibility
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);
