import Cart from "./Cart";
import { useSelector } from "react-redux";
import axios from "axios";

const CartTotal = () => {
  const cartItems = useSelector((store) => store.mycart.items);

  function total() {
    let cost = 0;

    for (let i = 0; i < cartItems.length; i++) {
      const info = cartItems[i]?.card?.info;

      if (!info) continue; // Skip if item is malformed

      const price = info.price ?? info.defaultPrice ?? 0; // handle undefined
      cost += price / 100;
    }

    return cost.toFixed(2) + " Rs";
  }

  const amount = total();
  console.log("Cart Total:", amount);

  const checkoutHandler = async (amount) => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/checkout", {
        amount,
      });
      console.log("Checkout response:", data);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
      <p className="text-lg mb-2">Total: {amount}</p>
      <button
        onClick={() => checkoutHandler(amount)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotal;
