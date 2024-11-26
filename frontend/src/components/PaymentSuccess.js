import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItem } from "../../utils/cartSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleContinueShopping = () => {
    dispatch(clearAllItem())
    navigate("/browse");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-md">
        <div className="flex items-center justify-center text-green-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.122a1 1 0 011.414-1.415L8.414 12.172l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order is being processed and will
          be on its way soon!
        </p>
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
