require("dotenv").config();
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
const firebaseAdmin = require("firebase-admin");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Initialize Firebase Admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require("./serviceAccountKey.json")),
});

// Initialize Express App
const app = express();
app.use(express.json());

// ✅ Allow CORS from frontend (Parcel default port 1234)
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
  })
);

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test Route
app.get("/", (req, res) => {
  res.send("It works at learncodeonline");
});

// ✅ Serve Menu JSON Files
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

// Payment Route (unchanged from your original)
app.post("/payment", async (req, res) => {
  const { productList, token, auth } = req.body;

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(auth);
    console.log("User ID from Firebase:", decodedToken.uid);
    console.log("Email ID from Firebase:", decodedToken.email);

    if (!token || !Array.isArray(productList) || productList.length === 0) {
      return res.status(400).json({ error: "Token and a non-empty product list are required." });
    }

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charges = await Promise.all(
      productList.map(async (product) => {
        const idempotencyKey = uuidv4();
        return await stripe.charges.create(
          {
            amount: product.price * 100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchase of ${product.name}`,
          },
          { idempotencyKey }
        );
      })
    );

    const totalAmount = charges.reduce((sum, charge) => sum + charge.amount, 0);

    const emailBody = `
      Thank you for your purchase!
      Here are your payment details:

      ${charges.map((charge) => `- ${charge.description}: ₹${(charge.amount / 100).toFixed(2)}`).join("\n")}

      Total Amount: ₹${(totalAmount / 100).toFixed(2)}
    `;

    await transporter.sendMail({
      to: decodedToken.email,
      subject: "Your Payment Receipt",
      text: emailBody,
    });

    res.status(200).json({ charges, totalAmount });
  } catch (err) {
    console.error("Error processing payment:", err.message);
    res.status(500).json({ error: "Payment processing failed!" });
  }
});

// Start Server
const port = 4200;
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
