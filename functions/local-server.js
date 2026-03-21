/**
 * Lightweight local dev server — mirrors the API routes from index.js
 * without requiring firebase-admin or firebase-functions (which break on Node >= 23).
 * Run: node local-server.js
 */
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const mockDataPath = path.join(__dirname, "utils", "mockData.json");
const restaurantData = JSON.parse(fs.readFileSync(mockDataPath, "utf8"));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:1234"],
    credentials: true,
  })
);

// --- Restaurants ---
app.get("/api/restaurants", (req, res) => {
  try {
    const { q, cuisine } = req.query;
    let results =
      restaurantData.data.cards[1].card.card.gridElements.infoWithStyle
        .restaurants;

    if (q) {
      const searchTerm = q.toLowerCase();
      results = results.filter((r) =>
        r.info.name.toLowerCase().includes(searchTerm)
      );
    }
    if (cuisine) {
      const cuisineTerm = cuisine.toLowerCase();
      results = results.filter((r) =>
        r.info.cuisines.some((c) => c.toLowerCase().includes(cuisineTerm))
      );
    }
    res.json({ count: results.length, restaurants: results });
  } catch (err) {
    console.error("Error filtering restaurants:", err.message);
    res.status(500).json({ error: "Failed to load restaurants data" });
  }
});

// --- Menu ---
app.get("/api/menu", (req, res) => {
  const restaurantId = req.query.restaurantId;
  if (!restaurantId) return res.status(400).json({ error: "Missing restaurantId" });

  const filePath = path.join(__dirname, "mock-menus", `${restaurantId}.json`);
  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: "Menu not found for this restaurant" });

  const menuData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.json(menuData);
});

// --- Payment (email skipped locally — just validates and returns success) ---
app.post("/api/payment", (req, res) => {
  const { method, productList, email } = req.body;

  if (!email || !email.includes("@"))
    return res.status(400).json({ error: "A valid email address is required." });

  if (!Array.isArray(productList) || productList.length === 0)
    return res.status(400).json({ error: "Product list cannot be empty." });

  const totalAmount = Math.round(
    productList.reduce(
      (sum, product) => sum + product.unitPrice * product.quantity,
      0
    )
  );

  const orderId = uuidv4();
  console.log(`✅ Order #${orderId} — ${productList.length} items, ₹${totalAmount}, method: ${method}, email: ${email}`);

  res.json({ success: true, orderId, totalAmount });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Local test API running on http://localhost:${PORT}`);
  console.log("   GET  /api/restaurants");
  console.log("   GET  /api/menu?restaurantId=<id>");
  console.log("   POST /api/payment");
});
