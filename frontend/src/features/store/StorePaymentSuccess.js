import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Home, ShoppingBag, ReceiptText } from "lucide-react";
import Button from "app/components/common/Button";
import { loadOrderHistory } from "app/services/session.js";

const StorePaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order || loadOrderHistory().find((entry) => entry.source === "store");

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass p-12 rounded-[3.5rem] border-white/20 shadow-2xl text-center"
            >
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-[2.5rem] flex items-center justify-center text-green-500 mx-auto mb-8 shadow-xl shadow-green-500/10">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-4xl font-black mb-4 tracking-tight">Grocery Order Placed!</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 font-medium">
                    Your groceries are on their way.
                </p>

                {order ? (
                    <div className="text-left rounded-[2rem] bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-800 p-6 mb-8 space-y-3">
                        <div className="flex items-center gap-2 text-indigo-500 font-black uppercase tracking-widest text-xs">
                            <ReceiptText size={16} />
                            Order Snapshot
                        </div>
                        <p className="text-gray-900 dark:text-white font-black">Order #{order.orderId}</p>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Email: {order.email}</p>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Payment: {order.method}</p>
                        <p className="text-gray-900 dark:text-white font-black">Total: ${order.totalAmount}</p>
                    </div>
                ) : null}

                <div className="flex flex-col gap-4">
                    <Button
                        onClick={() => navigate("/orders")}
                        variant="secondary"
                        size="lg"
                        className="w-full py-5 rounded-2xl"
                    >
                        <ReceiptText className="mr-2" size={20} />
                        View Orders
                    </Button>
                    <Button
                        onClick={() => navigate("/store")}
                        size="lg"
                        className="w-full py-5 rounded-2xl shadow-xl"
                    >
                        <ShoppingBag className="mr-2" size={20} />
                        Visit Store
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/browse")}
                        size="lg"
                        className="w-full py-5 rounded-2xl"
                    >
                        <Home className="mr-2" size={20} />
                        Back to Home
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default StorePaymentSuccess;
