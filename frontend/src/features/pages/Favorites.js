import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import Button from "app/components/common/Button";
import { loadFavorites, saveFavorites } from "app/services/session.js";

const Favorites = () => {
    const [favorites, setFavorites] = useState(() => loadFavorites());

    const handleRemove = (favoriteToRemove) => {
        const nextFavorites = favorites.filter(
            (favorite) => !(favorite.id === favoriteToRemove.id && favorite.type === favoriteToRemove.type)
        );
        saveFavorites(nextFavorites);
        setFavorites(nextFavorites);
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-black tracking-tight mb-4">Saved <span className="gradient-text">Favorites</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Restaurants and store products you marked for quick return visits.</p>
                </div>

                {favorites.length === 0 ? (
                    <div className="glass rounded-[3rem] p-16 text-center shadow-xl">
                        <Heart size={48} className="mx-auto text-red-500 mb-6" />
                        <h2 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">No favorites yet</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Tap the heart on a restaurant or product card to save it here.</p>
                        <Link to="/browse"><Button size="lg">Browse Restaurants</Button></Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((favorite) => (
                            <motion.div
                                key={`${favorite.type}-${favorite.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-[2.5rem] p-8 shadow-xl border-white/20 flex flex-col"
                            >
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{favorite.type === "store" ? "Store Product" : "Restaurant"}</p>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">{favorite.name}</h2>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">{favorite.subtitle}</p>
                                    </div>
                                    <Heart size={18} className="fill-red-500 text-red-500 flex-none" />
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <Link to={favorite.path} className="flex-1">
                                        <Button className="w-full">Open</Button>
                                    </Link>
                                    <Button variant="secondary" onClick={() => handleRemove(favorite)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;