import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItem } from "../../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART_SVG } from "../../utils/constants";
import CartTotal from "./CartTotal";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { auth } from "../../utils/firebase"; // Ensure you have Firebase correctly set up here

const Cart = () => {
  const cartItems = useSelector((store) => store.mycart.items);
  const user = useSelector((store) => store.user);

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const added = cartItems.map((item) => ({
        name: item.card.info.name,
        price: (item.card.info.defaultPrice ?? item.card.info.price) / 100,
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

  function total() {
    let cost = 0;
    for (let i = 0; i < cartItems.length; i++) {
      cost +=
        cartItems[i].card.info.price / 100 ||
        cartItems[i].card.info.defaultPrice / 100;
    }
    return cost.toFixed(2) + "Rs";
  }

  const amount = total();

  
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
      const { status } = data;
      console.log("STATUS", status);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return (
    <div className="flex container mx-auto px-4 lg:px-10 py-6">
      <div className="bg-neutral-100 rounded-xl md:w-8/12 lg:w-6/12 w-full m-auto p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-2xl font-bold text-gray-700 mb-4">
              Your Cart is Empty!
            </p>
            <p className="text-gray-500 mb-6">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              onClick={handleClick}
            >
              Order Some Delicious Food
            </button>
            <div className="mt-6">
              <img
                src={CLEAR_CART_SVG}
                alt="Empty Cart"
                className="mx-auto w-32 opacity-75"
              />
            </div>
          </div>
        ) : (
          <div>
            <ItemList items={cartItems} />

            {/* Display the amount and Pay Now button here */}
            <div className="flex flex-col items-center mt-4">
              <div className="text-xl font-bold mb-2">{amount} Rs</div>
              <StripeCheckout
                stripeKey="pk_test_51Q8mrRP3DZ7NtKUPhU91q8ebF2zISE30BLSp6v0xWsaDQVGWly9nD9oVx3kKUVcnMrHkp9iaeQw5u9iJuaDDuxb200vvMkhKT5"
                token={makePayment}
                name="BuyProduct"
                amount={amount * 100}
              >
                <button className="px-4 py-2 rounded-lg bg-green-600 text-white">
                  Pay Now Rs
                </button>
              </StripeCheckout>
            </div>
          </div>
        )}

        <div className="mx-auto ">
          <button
            className="p-3 m-2 mx-auto bg-black text-white rounded-xl"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="mx-auto">
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;
