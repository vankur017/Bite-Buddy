import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock3, ReceiptText } from "lucide-react";
import Button from "app/components/common/Button";
import UserContext from "app/context/UserContext.js";
import { loadOrderHistory } from "app/services/session.js";

const OrderHistory = () => {
    const { currentUser, isAuthenticated } = useContext(UserContext);
    const orders = loadOrderHistory();
    const visibleOrders = isAuthenticated
        ? orders.filter((order) => order.email === currentUser.email)
        : [];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 flex items-center justify-center px-6">
                <div className="max-w-lg w-full glass p-12 rounded-[3rem] border-white/20 shadow-2xl text-center">
                    <h1 className="text-4xl font-black mb-4 tracking-tight">Sign in to view orders</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Order history is saved per email in this browser session.</p>
                    <Link to="/login" state={{ redirectTo: "/orders" }}>
                        <Button size="lg">Login to Continue</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-black tracking-tight mb-4">Order <span className="gradient-text">History</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Recent orders for {currentUser.email}</p>
                </div>

                {visibleOrders.length === 0 ? (
                    <div className="glass rounded-[3rem] p-16 text-center shadow-xl">
                        <ReceiptText size={48} className="mx-auto text-orange-500 mb-6" />
                        <h2 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">No orders yet</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Complete a checkout flow and the orders will appear here.</p>
                        <Link to="/browse"><Button size="lg">Start Ordering</Button></Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {visibleOrders.map((order) => (
                            <motion.div
                                key={`${order.orderId}-${order.placedAt}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-[2.5rem] p-8 shadow-xl border-white/20"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{order.source === "store" ? "Grocery Order" : "Restaurant Order"}</p>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">#{order.orderId}</h2>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-2xl font-black text-orange-500">{order.source === "store" ? `$${order.totalAmount}` : `₹${order.totalAmount}`}</p>
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium md:justify-end">
                                            <Clock3 size={16} />
                                            {new Date(order.placedAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Items</p>
                                        <div className="space-y-2">
                                            {order.items.map((item) => (
                                                <div key={`${order.orderId}-${item.id}`} className="flex items-center justify-between text-gray-700 dark:text-gray-300 font-medium">
                                                    <span>{item.name} x {item.quantity}</span>
                                                    <span>{order.source === "store" ? `$${item.price}` : `₹${item.price}`}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Details</p>
                                        <div className="space-y-2 text-gray-700 dark:text-gray-300 font-medium">
                                            <p>Email: {order.email}</p>
                                            <p>Payment: {order.method}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;