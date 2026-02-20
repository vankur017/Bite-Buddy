import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StorePaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        method = "Unknown",
        amount = 0,
        orderId,
    } = location.state || {};

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center px-4 py-16">
            {/* Success card */}
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center flex flex-col items-center gap-6">
                {/* Icon */}
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-6xl shadow-inner">
                    🎉
                </div>

                <div>
                    <h1 className="text-3xl font-extrabold text-green-600 mb-1">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Your order has been placed successfully.
                    </p>
                </div>

                {/* Details */}
                <div className="bg-gray-50 rounded-2xl w-full p-5 border border-gray-100 flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="font-bold text-gray-800">{method}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-extrabold text-orange-600 text-base">
                            ${typeof amount === "number" ? amount.toFixed(2) : amount}
                        </span>
                    </div>
                    {orderId && (
                        <div className="flex justify-between">
                            <span className="text-gray-500">Order ID</span>
                            <span className="font-mono text-xs text-gray-600 break-all">
                                {orderId}
                            </span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col w-full gap-3">
                    <button
                        onClick={() => navigate("/store")}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow transition-colors"
                    >
                        Continue Shopping 🛍️
                    </button>
                    <button
                        onClick={() => navigate("/browse")}
                        className="w-full py-3 bg-white border border-gray-300 hover:border-orange-400 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
                    >
                        Back to Restaurants
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StorePaymentSuccess;
