// import { useSelector } from "react-redux";
// import axios from "axios";

// const CartTotal = ({cartItems}) => {
  
//   console.log(cartItems);
  
//   function total() {
//     let cost = 0;

//     for (let i = 0; i < cartItems.length; i++) {
//       const info = cartItems[i]?.card?.info;

//       if (!info) continue; // Skip if item is malformed

//       const price = info.price ?? info.defaultPrice ?? 0; // paise value
//       cost += price; // no *100
//     }

//     return (cost / 100).toFixed(2); // convert paise → rupees
//   }

  
//     const makePayment = async (token) => {
//       try {
//         const userAuth = auth.currentUser;
//         const idToken = await userAuth.getIdToken();
  
//         const body = {
//           token,
//           productList,
//           auth: idToken,
//         };
  
//         const headers = {
//           "Content-Type": "application/json",
//         };
  
//         const response = await fetch("http://localhost:4200/payment", {
//           method: "POST",
//           headers,
//           body: JSON.stringify(body),
//         });
  
//         const data = await response.json();
//         console.log("Payment successful:", data);
  
//         const statuses = data.charges.map((charge) => charge.status);
//         console.log("STATUS", statuses);
  
//         const isAllSucceeded = data.charges.every(
//           (charge) => charge.status === "succeeded"
//         );
//         setAllSucceeded(isAllSucceeded);
//       } catch (err) {
//         console.error("Payment failed:", err);
//       } finally {
//         setLoading(false); // hide loader automatically
//       }
//     };

//   const amount = total();
//   console.log("Cart Total:", amount);

//   const checkoutHandler = async (amount) => {
//     try {
//       const { data } = await axios.post("http://localhost:4000/api/checkout", {
//         amount,
//       });
//       console.log("Checkout response:", data);
//     } catch (error) {
//       console.error("Checkout error:", error);
//     }
//   };

//   return (
//     <div className="backdrop-blur-md bg-white/70 border border-yellow-300 shadow-xl rounded-3xl p-6 w-[300px] mx-auto transition-all duration-500 hover:shadow-yellow-500/30">
//       <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">
//         Cart Summary
//       </h2>
//       <p className="text-lg mb-6 text-center font-semibold text-gray-800">
//         Total: <span className="text-yellow-700">₹{amount}</span>
//       </p>
//       <button
//         onClick={() => checkoutHandler(amount)}
//         className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md transition duration-300 font-semibold"
//       >
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// };

// export default CartTotal;
