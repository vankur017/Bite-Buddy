
const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");
const mockDataPath = path.join(__dirname, "utils", "mockData.json");
const restaurantData = JSON.parse(fs.readFileSync(mockDataPath, "utf8"));

// ✅ Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

// ✅ Express App
const app = express();
app.use(express.json());

// ✅ CORS
app.use(
  cors({
    origin: ["http://localhost:1234", "https://bitebuddy-39ffc.web.app"],
    credentials: true,
  })
);

// ✅ Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// app.get("/api/restaurants", (req, res) => {
//   try {
//     const filePath = path.join("C:/my_repos/Bite-Buddy/frontend/utils/", "mockData.json"); // adjust path if needed
//     const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
//     res.json(data);
//   } catch (err) {
//     console.error("Error reading mockData.json:", err.message);
//     res.status(500).json({ error: "Failed to load restaurants data" });
//   }
// });

app.get("/api/restaurants", (req, res) => {
  try {
    const { q, cuisine } = req.query;
    let results = restaurantData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;

    // 🔍 Search by name (case-insensitive)
    if (q) {
      const searchTerm = q.toLowerCase();
      results = results.filter((r) =>
        r.info.name.toLowerCase().includes(searchTerm)
      );
    }

    // 🔍 Filter by cuisine
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

// ✅ API: Get Menu
app.get("/api/menu", (req, res) => {
  const restaurantId = req.query.restaurantId;
  if (!restaurantId) {
    return res.status(400).json({ error: "Missing restaurantId" });
  }

  const filePath = path.join(__dirname, "mock-menus", `${restaurantId}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Menu not found for this restaurant" });
  }

  const menuData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.json(menuData);
});

// ✅ API: Payment
app.post("/api/payment", async (req, res) => {
  const { method, productList, email } = req.body;

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ error: "Order email service is not configured." });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    if (!Array.isArray(productList) || productList.length === 0) {
      return res.status(400).json({ error: "Product list cannot be empty." });
    }

    const totalAmount = Math.round(
      productList.reduce(
        (sum, product) => sum + product.unitPrice * product.quantity,
        0
      )
    );

    const orderId = uuidv4();

    // Build email HTML
    const orderItemsHtml = productList
      .map(
        (item, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>₹${item.unitPrice.toFixed(2)}</td>
          <td>₹${item.price.toFixed(2)}</td>
        </tr>`
      )
      .join("");

    const emailBody = `
      <h2>Order Confirmation 🎉</h2>
      <p>Your order <strong>#${orderId}</strong> has been placed via <strong>${method}</strong>.</p>
      <table border="1" cellpadding="6" cellspacing="0">
        <thead><tr><th>#</th><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
        <tbody>${orderItemsHtml}</tbody>
      </table>
      <h3>Total: ₹${totalAmount}</h3>
    `;

    // Send Email
    await transporter.sendMail({
      to: email,
      subject: `Order Confirmation #${orderId}`,
      html: emailBody,
    });

    res.json({ success: true, orderId, totalAmount });
  } catch (err) {
    console.error("Payment error:", err.message);
    res.status(500).json({ error: err.message || "Payment failed!" });
  }
});

// ✅ Export Express app as Firebase Function
exports.api = functions.https.onRequest(app);

// Local dev mode: run standalone when invoked directly with node
if (process.env.LOCAL_DEV === "true") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Local API running on http://localhost:${PORT}`));
}


