import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CircleAlert, LogIn, Mail, User } from "lucide-react";
import Button from "app/components/common/Button";
import UserContext from "app/context/UserContext.js";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, currentUser } = useContext(UserContext);
    const redirectTo = location.state?.redirectTo || "/browse";

    const [name, setName] = useState(currentUser?.name || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, navigate, redirectTo]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!email.trim() || !email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        login({ name, email });
        navigate(redirectTo, { replace: true });
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass p-10 rounded-[3rem] border-white/20 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black tracking-tight mb-3">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Save your orders, prefill checkout, and keep your favorites synced in this browser.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Name</label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                                placeholder="Ankur Verma"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Email</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {error ? (
                        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm font-medium">
                            <CircleAlert size={18} className="mt-0.5" />
                            <span>{error}</span>
                        </div>
                    ) : null}

                    <Button type="submit" size="lg" className="w-full py-5 rounded-2xl shadow-xl shadow-orange-500/10">
                        <LogIn size={18} className="mr-2" />
                        Continue
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};

export default LoginPage;
