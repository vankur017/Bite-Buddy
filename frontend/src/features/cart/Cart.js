import ItemList from "app/components/common/ItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItem } from "app/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "app/services/firebase.js";
import { Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import Button from "app/components/common/Button";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
    const cartItems = useSelector((store) => store.mycart.items);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const added = cartItems.map((item) => {
                const info = item.card?.info || item;
                const unitPrice = (info.price ?? info.defaultPrice ?? 0);
                const qty = item.quantity || 1;
                return {
                    id: info.id,
                    name: info.name,
                    quantity: qty,
                    unitPrice,
                    price: unitPrice * qty,
                };
            });
            setProductList(added);
        } else {
            setProductList([]);
        }
    }, [cartItems]);

    const handleClearCart = () => dispatch(clearAllItem());
    const handleClick = () => navigate("/browse");

    const totalAmount = productList.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-10">
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                Shopping <span className="gradient-text">Cart</span>
                            </h1>
                            {cartItems.length > 0 && (
                                <Button
                                    variant="ghost"
                                    onClick={handleClearCart}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={20} className="mr-2" />
                                    Clear Cart
                                </Button>
                            )}
                        </div>

                        {cartItems.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-[3rem] p-16 text-center shadow-xl"
                            >
                                <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <ShoppingBag className="text-orange-500" size={48} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                                    Your cart is empty
                                </h2>
                                <Button size="lg" onClick={handleClick}>
                                    Go to Browse
                                    <ArrowRight className="ml-2" />
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="space-y-6">
                                <ItemList items={cartItems} />
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1"
                        >
                            <div className="glass rounded-[3rem] p-8 sticky top-28 shadow-2xl border-white/40">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-gray-900 dark:text-white">
                                        <span className="text-lg font-black">Grand Total</span>
                                        <span className="text-3xl font-black text-orange-500">₹{totalAmount}</span>
                                    </div>
                                </div>

                                <Button className="w-full py-5 rounded-2xl shadow-xl">
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
