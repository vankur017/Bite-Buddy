import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import Button from "app/components/common/Button";

const StorePaymentSuccess = () => {
    const navigate = useNavigate();

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

                <div className="flex flex-col gap-4">
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
