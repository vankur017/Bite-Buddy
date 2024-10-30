const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51Q8mrRP3DZ7NtKUPr2XsOc1Fuj6M43Ftob0C9W5WqRVFK7HJyCmqsRiXdZ9dZV2UBvmbdxDvQYHbFxoEVRUqjVif00k5oYoLVK");
const { v4: uuidv4 } = require("uuid");
const firebaseAdmin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Firebase Admin setup (assuming you have your service account JSON file)
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

const sendReceiptEmail = (email, chargeDetails) => {
  const mailOptions = {
   
    to: "iamankurverma0@gmail.com",
    subject: "Your Payment Receipt",
    text: `Thank you for your purchase! Here are your payment details:\n\n${JSON.stringify(chargeDetails, null, 2)}`,
  };
  return transporter.sendMail(mailOptions);
};

app.get("/", (req, res) => {
  res.send("It works at learncodeonline");
});

app.post("/payment", async (req, res) => {
  const { productList, token, auth } = req.body;

  // Validate Firebase auth token
  try {
    let decodedToken = await firebaseAdmin.auth().verifyIdToken(auth);
    console.log("User ID from Firebase:", decodedToken.uid);
    console.log("Email ID from Firebase:", decodedToken.email);
    
  } catch (err) {
    return res.status(401).json({ error: "Invalid Firebase token" });
  }

  // Basic validation
  if (!token || !Array.isArray(productList) || productList.length === 0) {
    return res.status(400).json({ error: "Token and a non-empty product list are required." });
  }

  try {
    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    console.log(customer);
    
 
    const charges = await Promise.all(
      productList.map(async (product) => {
        try {
          const idempotencyKey = uuidv4();
          const charge = await stripe.charges.create({
            amount: product.price * 100, // Convert to cents
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email, // Automatically sends receipt
            description: `Purchase of ${product.name}`,
          }, { idempotencyKey });
          return charge;
        } catch (err) {
          console.error(`Error processing charge for product: ${product.name}`, err);
          throw new Error(`Failed to charge for product: ${product.name}`);
        }
      })
    );
    
    const amounts = charges.map(({amount}, {description})=>{description, amount})
    
    const totalamount = ()=>{
      let sum =0;
      for(let i=0; i <amounts.length; i++){
        sum+=amounts[i]
      }
      return sum
    }
    console.log(totalamount());
    
    
    res.status(200).json(charges);
    try {
      await sendReceiptEmail(charges.receipt_email, charges);
    } catch (emailErr) {
      console.error("Error sending email:", emailErr);
    
    }
  } catch (err) {
    console.error("Payment processing error:", err);
    res.status(500).json({ error: err.message || "Payment processing failed!" });
  }
});

// Start server
const port = 4200;
app.listen(port, () => {
  console.log(`LISTENING AT PORT ${port}`);
});
