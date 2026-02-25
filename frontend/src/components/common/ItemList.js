import { useDispatch } from "react-redux";
import { addItem } from "app/features/cart/cartSlice";
import { CDN_URL } from "app/services/constants";
import { Plus, Minus, Star } from "lucide-react";
import { motion } from "framer-motion";

const ItemList = ({ items }) => {
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    return (
        <div className="space-y-6">
            {items.map((item) => {
                const info = item.card?.info || item;
                return (
                    <motion.div
                        key={info.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all border-white/20 group"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                {info.itemAttribute?.vegClassifier === "VEG" ? (
                                    <span className="w-3 h-3 border-2 border-green-500 rounded-sm flex items-center justify-center">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    </span>
                                ) : (
                                    <span className="w-3 h-3 border-2 border-red-500 rounded-sm flex items-center justify-center">
                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                    </span>
                                )}
                                {info.ribbon?.text && (
                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{info.ribbon.text}</span>
                                )}
                            </div>
                            <h4 className="text-xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">
                                {info.name}
                            </h4>
                            <p className="text-gray-900 dark:text-white font-black mb-4">
                                ₹{info.price / 100 || info.defaultPrice / 100}
                            </p>
                            {info.ratings?.aggregatedRating?.rating && (
                                <div className="flex items-center gap-1 mb-4 text-orange-500">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-xs font-black">{info.ratings.aggregatedRating.rating}</span>
                                </div>
                            )}
                            <p className="text-sm font-medium text-gray-400 dark:text-gray-500 line-clamp-2">
                                {info.description}
                            </p>
                        </div>

                        <div className="relative w-full md:w-40 aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/20">
                            <img
                                src={CDN_URL + info.imageId}
                                alt={info.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-4 flex justify-center px-4">
                                <button
                                    onClick={() => handleAddItem(item)}
                                    className="bg-white/90 dark:bg-dark-950/90 backdrop-blur-md px-6 py-2 rounded-xl text-orange-600 font-black text-xs uppercase tracking-widest shadow-xl border border-orange-100 hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ItemList;
