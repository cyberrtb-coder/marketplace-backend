import fetch from "node-fetch";
import mongoose from "mongoose";

// ✅ Generate a valid MongoDB ObjectId for testing
const testUserId = new mongoose.Types.ObjectId().toString();
console.log("🧪 Using test userId:", testUserId);

const BASE_URL = "http://localhost:3000/api";

async function runTests() {
  try {
    console.log("\n1️⃣ Fetching cart...");
    let res = await fetch(`${BASE_URL}/cart/${testUserId}`);
    let data = await res.json();
    console.log("Cart:", data);

    console.log("\n2️⃣ Adding product to cart...");
    res = await fetch(`${BASE_URL}/cart/${testUserId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: new mongoose.Types.ObjectId().toString(), quantity: 2 }),
    });
    data = await res.json();
    console.log("Add result:", data);

    console.log("\n3️⃣ Fetching updated cart...");
    res = await fetch(`${BASE_URL}/cart/${testUserId}`);
    data = await res.json();
    console.log("Updated cart:", data);

    console.log("\n4️⃣ Placing an order...");
    res = await fetch(`${BASE_URL}/order/${testUserId}`, {
      method: "POST",
    });
    data = await res.json();
    console.log("Order result:", data);

    console.log("\n✅ Test sequence completed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

runTests();
