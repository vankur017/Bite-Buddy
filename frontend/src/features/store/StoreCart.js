import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearStoreCart, updateStoreItemQty } from "app/features/store/storeCartSlice";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, Package, ShoppingCart } from "lucide-react";
import Button from "app/components/common/Button";
import { motion, AnimatePresence } from "framer-motion";

const StoreCart = () => {
    const storeCartItems = useSelector((store) => store.storeCart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClearCart = () => dispatch(clearStoreCart());
    const handleUpdateQty = (id, delta) => dispatch(updateStoreItemQty({ id, delta }));

    const totalAmount = storeCartItems.reduce((sum, item) => {
        const discountedPrice = item.price * (1 - item.discountPercentage / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-10">
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                Grocery <span className="gradient-text">Cart</span>
                            </h1>
                            {storeCartItems.length > 0 && (
                                <Button
                                    variant="ghost"
                                    onClick={handleClearCart}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={20} className="mr-2" />
                                    Clear Store Cart
                                </Button>
                            )}
                        </div>

                        {storeCartItems.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass rounded-[3rem] p-16 text-center shadow-xl border-white/20"
                            >
                                <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <Package className="text-orange-500" size={48} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                                    Grocery bag is empty
                                </h2>
                                <Button size="lg" onClick={() => navigate("/store")}>
                                    Go to Store
                                    <ArrowRight className="ml-2" />
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="space-y-6">
                                {storeCartItems.map((item) => {
                                    const discountedPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
                                    return (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            className="glass rounded-3xl p-6 flex flex-col md:flex-row gap-6 border-white/20 hover:shadow-xl transition-all"
                                        >
                                            <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-white p-2">
                                                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-black text-gray-900 dark:text-white mb-1">{item.title}</h4>
                                                <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-4">{item.category}</p>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl font-black text-gray-900 dark:text-white">${discountedPrice}</span>
                                                    {item.discountPercentage > 0 && (
                                                        <span className="text-xs text-gray-400 line-through font-bold">${item.price}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 bg-gray-50 dark:bg-dark-900 rounded-2xl p-2 border border-gray-100 dark:border-dark-800">
                                                <button onClick={() => handleUpdateQty(item.id, -1)} className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl transition-colors text-orange-500">
                                                    <Minus size={20} />
                                                </button>
                                                <span className="w-8 text-center font-black text-lg">{item.quantity}</span>
                                                <button onClick={() => handleUpdateQty(item.id, 1)} className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl transition-colors text-orange-500">
                                                    <Plus size={20} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {storeCartItems.length > 0 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="glass rounded-[3rem] p-8 sticky top-28 shadow-2xl border-white/20">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Summary</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-gray-900 dark:text-white">
                                        <span className="text-lg font-black">Total</span>
                                        <span className="text-3xl font-black text-orange-500">${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button className="w-full py-5 rounded-2xl shadow-xl shadow-orange-500/20" onClick={() => navigate("/store/cart/payment")}>
                                    Checkout Now
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreCart;
