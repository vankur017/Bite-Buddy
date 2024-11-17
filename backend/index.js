const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51Q8mrRP3DZ7NtKUPr2XsOc1Fuj6M43Ftob0C9W5WqRVFK7HJyCmqsRiXdZ9dZV2UBvmbdxDvQYHbFxoEVRUqjVif00k5oYoLVK");
const { v4: uuidv4 } = require("uuid");
const firebaseAdmin = require("firebase-admin");
const nodemailer = require("nodemailer");


firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require("./serviceAccountKey.json")),
});

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vankur017@gmail.com",
    pass: "zgqh evnl qxef swem", 
  },
});

app.get("/", (req, res) => {
  res.send("It works at learncodeonline");
});

app.post("/payment", async (req, res) => {
  const { productList, token, auth } = req.body;

 
  try {
    var decodedToken = await firebaseAdmin.auth().verifyIdToken(auth);
    console.log("User ID from Firebase:", decodedToken.uid);
    console.log("Email ID from Firebase:", decodedToken.email);
  } catch (err) {
    return res.status(401).json({ error: "Invalid Firebase token" });
  }


  if (!token || !Array.isArray(productList) || productList.length === 0) {
    return res.status(400).json({ error: "Token and a non-empty product list are required." });
  }

  try {
  
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    console.log("Stripe Customer Created:", customer);

 
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

    console.log("Total Amount:", totalAmount);

   
    const emailBody = `
      Thank you for your purchase!
      Here are your payment details:

      ${charges.map((charge) => `- ${charge.description}: ₹${(charge.amount / 100).toFixed(2)}`).join("\n")}

      Total Amount: ₹${(totalAmount / 100).toFixed(2)}
    `;

    const mailOptions = {
      to: decodedToken.email,
      subject: "Your Payment Receipt",
      text: emailBody,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Receipt email sent successfully");
    } catch (emailErr) {
      console.error("Error sending email:", emailErr);
    }

   
    res.status(200).json({ charges, totalAmount });
  } catch (err) {
    console.error("Payment processing error:", err);
    res.status(500).json({ error: err.message || "Payment processing failed!" });
  }
});


const port = 4200;
app.listen(port, () => {
  console.log(`LISTENING AT PORT ${port}`);
});
