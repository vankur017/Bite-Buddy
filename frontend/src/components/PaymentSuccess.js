import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { method, amount } = location.state || { method: "Unknown", amount: 0 };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>
      <p className="text-xl text-gray-700 mb-2">
        Method: <span className="font-semibold">{method}</span>
      </p>
      <p className="text-xl text-gray-700 mb-6">
        Amount Paid: ₹{amount}
      </p>
      <button
        onClick={() => navigate("/browse")}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;
