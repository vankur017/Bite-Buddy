require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), 
    // or use a service account if needed:
    // credential: admin.credential.cert(require("./serviceAccountKey.json"))
  });
}


// Express App
const app = express();
app.use(express.json());

// ✅ Allow CORS (update port if frontend differs)
app.use(
  cors({
    origin: "http://localhost:1234", // change if React runs on 3000/5173
    credentials: true,
  })
);

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "vankur017@gmail.com",
    pass: process.env.EMAIL_PASS || "pfnf wrry vwal htvi",
  },
});
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

app.post("/payment", async (req, res) => {
  console.log("Received payment request:", req.body);

  const { method, productList, email } = req.body;

  try {
    if (!Array.isArray(productList) || productList.length === 0) {
      return res.status(400).json({ error: "Product list cannot be empty." });
    }
  
    // if (!accessToken) {
    //   return res.status(401).json({ error: "Missing access token" });
    // }

    // ✅ Verify Firebase ID token & get user


    const dummyUser = {
      email: email,
      
    };

    // ✅ Calculate total in ₹
    const totalAmount = Math.round(
      productList.reduce(
        (sum, product) => sum + product.unitPrice * product.quantity,
        0
      )
    );

    const orderId = uuidv4();

    // ✅ Build HTML table for order items
    const orderItemsHtml = productList
      .map(
        (item, idx) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">${idx + 1}</td>
          <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
          <td style="padding:8px;border:1px solid #ddd;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #ddd;">₹${item.unitPrice.toFixed(2)}</td>
          <td style="padding:8px;border:1px solid #ddd;">₹${item.price.toFixed(2)}</td>
        </tr>`
      )
      .join("");

    // ✅ Email body
    const emailBody = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;">
        <h2 style="color:#f59e0b;">Order Confirmation 🎉</h2>
        <p>Hi</p>
        <p>Your order <strong>#${orderId}</strong> has been placed successfully via <strong>${method}</strong>.</p>
        <h3>Order Details</h3>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <thead>
            <tr style="background-color:#fef3c7;">
              <th style="padding:8px;border:1px solid #ddd;">#</th>
              <th style="padding:8px;border:1px solid #ddd;">Item</th>
              <th style="padding:8px;border:1px solid #ddd;">Qty</th>
              <th style="padding:8px;border:1px solid #ddd;">Unit Price</th>
              <th style="padding:8px;border:1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>${orderItemsHtml}</tbody>
        </table>
        <h3>Total Amount: ₹${totalAmount}</h3>
        <p>We’ll notify you when your order is out for delivery 🚚.</p>
        <p style="margin-top:20px;">Cheers,<br><strong>Bite Buddy Team</strong></p>
      </div>
    `;

    // ✅ Send Email
    await transporter.sendMail({
      to: dummyUser.email,
      subject: `Order Confirmation #${orderId} - ₹${totalAmount}`,
      html: emailBody,
    });

    res.status(200).json({
      success: true,
      method,
      totalAmount,
      orderId,
    });
  } catch (err) {
    console.error("Payment error:", err.message);
    res.status(500).json({ error: err.message || "Payment processing failed!" });
  }
});

// Start Server
const port = 4200;
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
