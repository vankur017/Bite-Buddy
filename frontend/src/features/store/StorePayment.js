import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, ArrowLeft } from "lucide-react";
import Button from "app/components/common/Button";
import { useState } from "react";

const StorePayment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/store/cart/payment/success");
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass p-10 rounded-[3rem] border-white/20 shadow-2xl"
            >
                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/20 rounded-[2rem] flex items-center justify-center text-indigo-500 mx-auto mb-8">
                    <CreditCard size={40} />
                </div>
                <h1 className="text-3xl font-black text-center mb-4 tracking-tight">Grocery Payment</h1>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-10 font-medium">Complete your grocery order.</p>

                <div className="flex flex-col gap-4">
                    <Button
                        onClick={handlePayment}
                        isLoading={loading}
                        size="lg"
                        className="w-full py-5 rounded-2xl shadow-xl shadow-indigo-500/20"
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

export default StorePayment;
