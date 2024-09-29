import { instance } from "../server.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR"
    };
    
    // Create an order and await the response
    const order = await instance.orders.create(options);
   

    // Send a success response if the order is created successfully
    res.status(200).json({
      success: true,
      order, // Optionally, you can send the order details in the response
    });

  } catch (error) {
    // Handle the error and send an appropriate response
    console.error("Error creating order:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create the order.",
      error: error.message // Optionally, you can send the error message
    });
  }
};