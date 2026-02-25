import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Plus, Minus, Info, Search, SlidersHorizontal } from "lucide-react";
import Button from "app/components/common/Button";
import Skeleton from "app/components/common/Skeleton";
import { addStoreItem } from "app/features/store/storeCartSlice";
import withInStock from "app/hooks/withInStock";
import Notfound from "app/services/photo.png";

const PAGE_SIZE = 12;

const StoreCard = ({ product, isOutOfStock }) => {
  const dispatch = useDispatch();
  const storeCartItems = useSelector((store) => store.storeCart.items);

  const cartItem = storeCartItems.find((i) => i.id === product.id);
  const qtyInCart = cartItem?.quantity || 0;

  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const handleAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addStoreItem(product));
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-dark-900 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5 transition-all duration-300 border border-gray-100 dark:border-dark-800 flex flex-col overflow-hidden group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={
            product.thumbnail ||
            (product.images && product.images[0]) ||
            Notfound
          }
          alt={product.title}
          onError={(e) => {
            e.target.src = Notfound;
          }}
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-orange-500/20 uppercase tracking-widest">
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
            {product.brand || product.category}
          </p>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] font-black text-yellow-700 dark:text-yellow-500">{product.rating?.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="text-gray-800 dark:text-gray-100 text-sm font-black line-clamp-1 mb-4 group-hover:text-orange-500 transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-gray-900 dark:text-white font-black text-xl">
            ${discountedPrice}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-gray-400 line-through text-xs font-bold">
              ${product.price}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Link to={`/store/${product.id}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">
              <Info size={16} />
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            disabled={isOutOfStock}
            onClick={handleAdd}
            className="flex-[2]"
          >
            {qtyInCart > 0 ? (
              <span className="flex items-center gap-2">
                <ShoppingCart size={16} />
                {qtyInCart}
              </span>
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const StoreCardWithStock = withInStock(StoreCard);

const StoreCards = ({ data = [], loading, error }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(data.map((p) => p.category))].sort();
    return ["All", ...cats];
  }, [data]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return data;
    return data.filter((p) => p.category === activeCategory);
  }, [data, activeCategory]);

  const noOfPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginated = filtered.slice(start, end);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-8 pb-16 bg-background dark:bg-dark-950">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-center gap-4 mb-12">
            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-dark-900 rounded-[2.5rem] p-6 border border-gray-100 dark:border-dark-800">
                <Skeleton className="w-full aspect-square rounded-3xl mb-6" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-6" />
                <div className="flex gap-3">
                  <Skeleton className="h-10 flex-1 rounded-xl" />
                  <Skeleton className="h-10 flex-[2] rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen mt-[72px] flex items-center justify-center">
        <div className="text-center text-red-500 text-xl font-semibold">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background dark:bg-dark-950 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Premium <span className="gradient-text">Grocery Store</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Get high-quality products delivered to your doorstep
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-12 justify-center glass p-4 rounded-[2rem]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat
                ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20 active:scale-95"
                : "text-gray-500 dark:text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mb-4">
          Showing{" "}
          <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
          products
          {activeCategory !== "All" && (
            <> in <span className="font-semibold text-orange-500">{activeCategory}</span></>
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginated.map((product) => (
            <StoreCardWithStock key={product.id} product={product} />
          ))}
        </div>

        {noOfPages > 1 && (
          <div className="flex justify-center flex-wrap gap-2 mt-8">
            <button
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-orange-50 text-gray-600 text-sm disabled:opacity-40"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
            >
              ← Prev
            </button>
            {[...Array(noOfPages).keys()].map((n) => (
              <button
                key={n}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${currentPage === n
                  ? "bg-orange-500 text-white border-orange-500 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
                  }`}
                onClick={() => setCurrentPage(n)}
              >
                {n + 1}
              </button>
            ))}
            <button
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-orange-50 text-gray-600 text-sm disabled:opacity-40"
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, noOfPages - 1))
              }
              disabled={currentPage === noOfPages - 1}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default StoreCards;
