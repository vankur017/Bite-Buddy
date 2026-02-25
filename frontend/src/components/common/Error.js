import { useRouteError, useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import Button from "app/components/common/Button";
import { motion } from "framer-motion";

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 border-none p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass rounded-[3rem] p-12 text-center shadow-2xl border-white/20"
            >
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-8 shadow-xl shadow-red-500/10">
                    <AlertCircle size={40} />
                </div>
                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Oops!</h1>
                <h2 className="text-xl font-bold text-gray-400 mb-8 uppercase tracking-widest">
                    Something went wrong
                </h2>
                <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 mb-10">
                    <p className="text-red-400 font-black text-xs uppercase tracking-widest">
                        {error?.statusText || error?.message || "Route not found"}
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <Button onClick={() => navigate("/browse")} className="w-full py-4 rounded-xl shadow-xl shadow-orange-500/20">
                        <Home className="mr-2" size={18} />
                        Back to Home
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(-1)} className="w-full py-4 rounded-xl">
                        <ArrowLeft className="mr-2" size={18} />
                        Go Back
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default Error;
