import { useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, ArrowLeft, Mail, CircleAlert } from "lucide-react";
import Button from "app/components/common/Button";
import UserContext from "app/context/UserContext.js";
import { clearAllItem } from "app/features/cart/cartSlice";
import { submitOrder } from "app/services/orderService.js";
import { addOrderHistoryEntry } from "app/services/session.js";

const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.mycart.items);
    const { currentUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("card");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [error, setError] = useState("");

    const productList = useMemo(
        () => cartItems.map((item) => {
            const info = item.card?.info || item;
            const unitPrice = info.price ?? info.defaultPrice ?? 0;
            const quantity = item.quantity || 1;

            return {
                id: info.id,
                name: info.name,
                quantity,
                unitPrice,
                price: unitPrice * quantity,
            };
        }),
        [cartItems]
    );

    const totalAmount = productList.reduce((sum, item) => sum + item.price, 0);

    const handlePayment = async () => {
        if (!productList.length) {
            setError("Your cart is empty.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await submitOrder({
                email,
                method,
                productList,
                source: "restaurant",
            });

            const order = {
                orderId: response.orderId,
                totalAmount: response.totalAmount,
                email,
                method,
                source: "restaurant",
                placedAt: new Date().toISOString(),
                items: productList,
            };

            addOrderHistoryEntry(order);
            dispatch(clearAllItem());

            navigate("/cart/payment/payment-success", {
                replace: true,
                state: { order },
            });
        } catch (submitError) {
            setError(submitError.message || "Unable to place your order.");
        } finally {
            setLoading(false);
        }
    };

    if (!productList.length) {
        return (
            <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 flex items-center justify-center px-6">
                <div className="max-w-md w-full glass p-10 rounded-[3rem] border-white/20 shadow-2xl text-center">
                    <h1 className="text-3xl font-black mb-4 tracking-tight">No items to checkout</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Add items to your cart before completing payment.</p>
                    <Button onClick={() => navigate("/browse")} size="lg">Back to Browse</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass p-10 rounded-[3rem] border-white/20 shadow-2xl"
            >
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-[2rem] flex items-center justify-center text-orange-500 mx-auto mb-8">
                    <CreditCard size={40} />
                </div>
                <h1 className="text-3xl font-black text-center mb-4 tracking-tight">Checkout</h1>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-10 font-medium">Complete your order with secure payment.</p>

                <div className="space-y-6 mb-10">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-800">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                        <p className="text-3xl font-black text-orange-500">₹{totalAmount}</p>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Order Email</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                className="w-full pl-12 pr-4 py-4 bg-gray-300 dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Payment Method</label>
                        <select
                            className="w-full px-4 py-4 bg-gray-400 dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                            value={method}
                            onChange={(event) => setMethod(event.target.value)}
                        >
                            <option value="card">Card</option>
                            <option value="upi">UPI</option>
                            <option value="cash-on-delivery">Cash on Delivery</option>
                        </select>
                    </div>

                    {error ? (
                        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm font-medium">
                            <CircleAlert size={18} className="mt-0.5" />
                            <span>{error}</span>
                        </div>
                    ) : null}
                </div>

                <div className="flex flex-col gap-4">
                    <Button
                        onClick={handlePayment}
                        isLoading={loading}
                        size="lg"
                        className="w-full py-5 rounded-2xl shadow-xl shadow-orange-500/20"
                    >
                        Pay Now
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                        className="w-full py-5 rounded-2xl"
                    >
                        <ArrowLeft className="mr-2" size={20} />
                        Go Back
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default Payment;
