import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addStoreItem, removeStoreItem, clearStoreCart } from "../../utils/storeCartSlice";
import Notfound from "../../utils/photo.png";

const StoreCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((store) => store.storeCart.items);

    const total = useMemo(
        () =>
            items.reduce((sum, item) => {
                const discounted =
                    item.price * (1 - (item.discountPercentage || 0) / 100);
                return sum + discounted * (item.quantity || 1);
            }, 0),
        [items]
    );

    if (items.length === 0) {
        return (
            <div className="min-h-screen mt-[72px] flex flex-col items-center justify-center gap-6 bg-gray-50">
                <div className="text-6xl">🛒</div>
                <h2 className="text-2xl font-bold text-gray-700">Your store cart is empty!</h2>
                <p className="text-gray-500">Browse our products and add something you like.</p>
                <Link
                    to="/store"
                    className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-[72px] bg-gray-50 px-4 py-10">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                    🛒 Store Cart
                </h1>

                {/* Item list */}
                <div className="flex flex-col gap-4">
                    {items.map((item) => {
                        const discounted = (
                            item.price *
                            (1 - (item.discountPercentage || 0) / 100)
                        ).toFixed(2);
                        const lineTotal = (
                            parseFloat(discounted) * item.quantity
                        ).toFixed(2);

                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow border border-gray-100 flex items-center gap-4 p-4"
                            >
                                {/* Image */}
                                <img
                                    src={item.thumbnail || (item.images && item.images[0]) || Notfound}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                                    onError={(e) => { e.target.src = Notfound; }}
                                />

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-800 text-sm truncate">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                                    <p className="text-orange-600 font-bold text-sm mt-0.5">
                                        ${discounted}{" "}
                                        {item.discountPercentage > 0 && (
                                            <span className="text-gray-400 line-through font-normal text-xs">
                                                ${item.price}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                {/* Qty controls */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => dispatch(removeStoreItem(item.id))}
                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-700 font-bold flex items-center justify-center transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="w-6 text-center font-bold text-gray-800">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => dispatch(addStoreItem(item))}
                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-700 font-bold flex items-center justify-center transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Line total */}
                                <div className="text-right min-w-[60px]">
                                    <p className="font-extrabold text-gray-800 text-sm">${lineTotal}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary */}
                <div className="mt-8 bg-white rounded-2xl shadow border border-gray-100 p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600 font-medium">
                            {items.length} item{items.length !== 1 ? "s" : ""}
                        </span>
                        <span className="font-extrabold text-orange-600 text-2xl">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                    <p className="text-gray-400 text-xs text-right">Taxes &amp; shipping calculated at checkout</p>

                    <button
                        onClick={() => navigate("/store/cart/payment")}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-colors active:scale-[0.98] text-lg"
                    >
                        Proceed to Payment →
                    </button>

                    <button
                        onClick={() => dispatch(clearStoreCart())}
                        className="w-full py-2.5 bg-white hover:bg-red-50 border border-red-300 text-red-500 font-semibold rounded-xl transition-colors text-sm"
                    >
                        Clear Cart
                    </button>

                    <Link
                        to="/store"
                        className="text-center text-orange-500 hover:text-orange-600 text-sm font-semibold transition-colors"
                    >
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StoreCart;
