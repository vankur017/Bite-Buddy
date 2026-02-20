import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearStoreCart } from "../../utils/storeCartSlice";
import { auth } from "../../utils/firebase.js";
import PulseLoader from "react-spinners/PulseLoader";

const StorePayment = () => {
    const items = useSelector((store) => store.storeCart.items);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useMemo(
        () =>
            items.map((item) => ({
                id: item.id,
                name: item.title,
                quantity: item.quantity || 1,
                unitPrice: parseFloat(
                    (item.price * (1 - (item.discountPercentage || 0) / 100)).toFixed(2)
                ),
                price: parseFloat(
                    (
                        item.price *
                        (1 - (item.discountPercentage || 0) / 100) *
                        (item.quantity || 1)
                    ).toFixed(2)
                ),
            })),
        [items]
    );

    const totalAmount = productList.reduce((sum, i) => sum + i.price, 0);

    const handlePayment = async (method) => {
        try {
            setLoading(true);
            setError("");

            const email = auth.currentUser?.email;
            if (!email) throw new Error("Please log in to proceed with payment.");

            const response = await fetch(
                "https://us-central1-bitebuddy-39ffc.cloudfunctions.net/api/payment",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ method, productList, email }),
                }
            );

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Payment failed");

            dispatch(clearStoreCart());
            navigate("/store/cart/payment/success", {
                state: {
                    method,
                    amount: data.totalAmount || totalAmount.toFixed(2),
                    orderId: data.orderId,
                },
            });
        } catch (err) {
            setError(err.message || "Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (items.length === 0) {
            navigate("/store/cart");
        }
    }, [items.length, navigate]);

    if (items.length === 0) return null;

    return (
        <div className="relative min-h-screen bg-gray-50">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
                    <PulseLoader color="#f59e0b" size={15} />
                </div>
            )}

            <div className="max-w-md mx-auto mt-[72px] px-4 pb-16">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h1 className="text-3xl font-extrabold text-center text-orange-600 mb-2">
                        Checkout
                    </h1>
                    <p className="text-center text-gray-500 text-sm mb-6">
                        Choose your payment method
                    </p>

                    {/* Order summary */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                        <h2 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                            Order Summary
                        </h2>
                        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                            {productList.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600 truncate pr-2">
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span className="font-semibold text-gray-800 flex-shrink-0">
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-extrabold">
                            <span className="text-gray-700">Total</span>
                            <span className="text-orange-600 text-lg">
                                ${totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 text-red-500 text-sm text-center font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Payment buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => handlePayment("UPI")}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold text-base transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            📱 Pay with UPI
                        </button>
                        <button
                            onClick={() => handlePayment("Cash on Delivery")}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold text-base transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            💵 Cash on Delivery
                        </button>
                        <button
                            onClick={() => handlePayment("Card")}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-bold text-base transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            💳 Pay with Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorePayment;
