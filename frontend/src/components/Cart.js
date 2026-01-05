import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItem } from "../../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART_SVG } from "../../utils/constants";
import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import PulseLoader from "react-spinners/PulseLoader";

const Cart = () => {
  const cartItems = useSelector((store) => store.mycart.items);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cartItems);
  
 

  // Build product list
  useEffect(() => {
    
    if (cartItems && cartItems.length > 0) {
      const added = cartItems.map((item) => {
        const info = item.card?.info || item;
        const unitPrice = (info.price ?? info.defaultPrice ?? 0) ;
        const qty = item.quantity || 1;
        return {
          id: info.id,
          name: info.name,
          quantity: qty,
          unitPrice,
          price: unitPrice * qty,
        };
      });
      setProductList(added);
    } else {
      setProductList([]);
    }
  }, [cartItems]);

  const handleClearCart = () => dispatch(clearAllItem());
  const handleClick = () => navigate("/browse");


  const total = () => productList.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = total();
  const MIN_ORDER_AMOUNT = 50;
  const isBelowMin = totalAmount < MIN_ORDER_AMOUNT;

 async function getIdToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is logged in");
  const token = await user.getIdToken();
  return token;
}



  // Dummy payment (backend)
  
const handleDummyPayment = async (method) => {
  try {
    setLoading(true);

    // ✅ Get the token from Firebase Auth
    const email =  auth.currentUser.email
    console.log(email);
    

    // ✅ Actually store fetch result in a variable
    const response = await fetch("https://us-central1-bitebuddy-39ffc.cloudfunctions.net/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method,
        productList,
        email,

      }),
    });

    // ✅ Parse JSON from the response
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Payment failed");

    // ✅ Navigate after successful payment
    navigate("/cart/payment/payment-success", {
      state: {
        method,
        amount: data.totalAmount,
        orderId: data.orderId,
      },
    });
  } catch (err) {
    console.error("Payment error:", err.message);
    alert("Payment failed: " + (err.message || "Unexpected error"));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <PulseLoader color="#f59e0b" size={15} />
        </div>
      )}

      <div className="flex justify-items-start container mt-[100px] mx-auto px-4 lg:px-10 py-6">
        <div className="backdrop-blur-md bg-white/60 border border-yellow-300 shadow-2xl rounded-3xl md:w-8/12 lg:w-6/12 w-full m-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-6 text-orange-600">
            Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-2xl font-semibold text-gray-700 mb-4">
                Your Cart is Empty!
              </p>
              <p className="text-gray-500 mb-6">
                Looks like you haven’t added anything to your cart yet.
              </p>
              <button
                className="bg-orange-500 text-white py-2 px-5 rounded-xl font-semibold hover:bg-orange-600 transition"
                onClick={handleClick}
              >
                Order Some Delicious Food
              </button>
            </div>
          ) : (
            <div className="mt-8">
              <ItemList items={cartItems} />

              <div className="mt-8 flex justify-center">
                <img
                  src={CLEAR_CART_SVG}
                  alt="Clear Cart"
                  className="w-24 opacity-60 hover:opacity-90 transition cursor-pointer"
                  onClick={handleClearCart}
                />
              </div>

              <div className="flex flex-col items-center mt-6 gap-4">
                <div className="text-2xl font-bold text-yellow-700 mb-4">
                  ₹{totalAmount}
                </div>

                {isBelowMin ? (
                  <p className="text-red-500 font-semibold">
                    Minimum order amount is ₹{MIN_ORDER_AMOUNT}.
                  </p>
                ) : (
                  <>
                    <button
                      onClick={() => 
                           handleDummyPayment("UPI")
                       
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-lg rounded-xl transition"
                    >
                      Pay with UPI (Dummy)
                    </button>

                    <button
                      onClick={() => handleDummyPayment("Cash on Delivery")}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-lg rounded-xl transition"
                    >
                      Cash on Delivery (Dummy)
                    </button>

                    <button
                      onClick={() => handleDummyPayment("Card")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 text-lg rounded-xl transition"
                    >
                      Pay with Card (Dummy)
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {cartItems.length !== 0 && (
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
