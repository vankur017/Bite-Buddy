import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import Button from "app/components/common/Button";
import { useState } from "react";

const Payment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/cart/payment/payment-success");
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 flex items-center justify-center">
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
                        <p className="text-3xl font-black text-orange-500">₹ Price Pending</p>
                    </div>
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
