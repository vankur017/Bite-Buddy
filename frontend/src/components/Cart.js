import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItem } from "../../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART_SVG } from "../../utils/constants";
import CartTotal from "./CartTotal";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { auth } from "../../utils/firebase";

const Cart = () => {
  const cartItems = useSelector((store) => store.mycart.items);
  const user = useSelector((store) => store.user);
  const [allSucceeded, setAllSucceeded] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const added = cartItems
        .filter((item) => item?.card?.info)
        .map((item) => ({
          name: item.card.info.name,
          price:
            (item.card.info.defaultPrice ?? item.card.info.price ?? 0) / 100,
        }));

      setProductList(added);
    }
  }, [cartItems]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(clearAllItem());
  };

  const handleClick = () => {
    navigate("/browse");
  };

  
const total = () => {
  const totalInPaise = cartItems.reduce((sum, item) => {
    const price = item.price ?? item.defaultPrice ?? 0;
    return sum + price;
  }, 0);
  
  return (totalInPaise / 100).toFixed(2); // returns "₹xxx.xx"
};

  const amount = parseFloat(total());

  const makePayment = async (token) => {
    try {
      const userAuth = auth.currentUser;
      const idToken = await userAuth.getIdToken();

      const body = {
        token,
        productList,
        auth: idToken,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch("http://localhost:4200/payment", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Payment successful:", data);

      const statuses = data.charges.map((charge) => charge.status);
      console.log("STATUS", statuses);

      const isAllSucceeded = data.charges.every(
        (charge) => charge.status === "succeeded"
      );
      setAllSucceeded(isAllSucceeded);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  const onPaymentClick = () => {
    navigate("/cart/payment");
  };

  const paymentSuccess = () => {
    if (allSucceeded) {
      navigate("/cart/payment/payment-success");
    }
  };

  useEffect(() => {
    paymentSuccess();
  }, [allSucceeded]);

  return (
    <div className="flex justify-items-start container mt-[100px] mx-auto px-4 lg:px-10 py-6">
      <div className="backdrop-blur-md bg-white/60 border border-yellow-300 shadow-2xl rounded-3xl md:w-8/12 lg:w-6/12 w-full m-auto p-6 transition-all duration-500 hover:shadow-yellow-500/30">
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-600 drop-shadow-sm">
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
              className="bg-orange-500 text-white py-2 px-5 rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md"
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
                className="w-24 opacity-60 hover:opacity-90 transition duration-300"
              />
            </div>

            <div className="flex flex-col items-center mt-6">
              <div className="text-2xl font-bold text-yellow-700 mb-4">
                ₹{amount}
              </div>

              {amount > 0 && (
                <StripeCheckout
                  stripeKey="pk_test_51Q8mrRP3DZ7NtKUPhU91q8ebF2zISE30BLSp6v0xWsaDQVGWly9nD9oVx3kKUVcnMrHkp9iaeQw5u9iJuaDDuxb200vvMkhKT5"
                  token={(token) => makePayment(token)}
                  name="BuyProduct"
                  amount={amount * 100}
                >
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 text-lg rounded-xl transition shadow-md">
                    Pay Now ₹{amount}
                  </button>
                </StripeCheckout>
              )}
            </div>
          </div>
        )}

        {cartItems.length !== 0 && (
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-md"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto mt-8 lg:mt-0">
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;
