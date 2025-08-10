import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Payment = () => {
  const cartItems = useSelector((store) => store.mycart.items);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Build product list
  useEffect(() => {
    if (cartItems.length > 0) {
      const added = cartItems.map((item) => {
        const info = item.card?.info || item;
        const unitPrice = (info.price ?? info.defaultPrice ?? 0) / 100;
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

  // Calculate total
  const total = () => productList.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = total();
  const MIN_ORDER_AMOUNT = 50;
  const isBelowMin = totalAmount < MIN_ORDER_AMOUNT;

  // Dummy payment
  const handleDummyPayment = (method) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/cart/payment/payment-success", {
        state: { method, amount: totalAmount },
      });
    }, 1500);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <PulseLoader color="#f59e0b" size={15} />
        </div>
      )}

      <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">
          Choose Payment Method
        </h1>

        <div className="text-xl text-center mb-4">Total: ₹{totalAmount}</div>

        {isBelowMin ? (
          <p className="text-red-500 text-center font-semibold">
            Minimum order is ₹{MIN_ORDER_AMOUNT}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleDummyPayment("UPI")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
            >
              Pay with UPI (Dummy)
            </button>

            <button
              onClick={() => handleDummyPayment("Cash on Delivery")}
              className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
            >
              Cash on Delivery (Dummy)
            </button>

            <button
              onClick={() => handleDummyPayment("Card")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl"
            >
              Pay with Card (Dummy)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
