import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, MessageSquare, Truck, RefreshCcw, ShoppingCart, ShoppingBag } from "lucide-react";
import Button from "app/components/common/Button";
import Skeleton from "app/components/common/Skeleton";
import useStoreProductDetail from "app/hooks/storeProductDetail.js";
import { addStoreItem } from "app/features/store/storeCartSlice";
import withInStock from "app/hooks/withInStock.js";
import Notfound from "app/services/photo.png";

const StarRating = ({ rating }) => {
  const stars = Math.round(rating || 0);
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= stars ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </span>
  );
};

const ProductDetailInner = ({ product, isOutOfStock }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const storeCartItems = useSelector((s) => s.storeCart.items);
  const cartItem = storeCartItems.find((i) => i.id === product.id);
  const qtyInCart = cartItem?.quantity || 0;

  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [Notfound];

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(addStoreItem(product));
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 md:px-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/store")}
          className="mb-8 group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Back to Store
        </Button>

        <div className="glass rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col gap-6 bg-white dark:bg-dark-900/50">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-dark-800 flex items-center justify-center p-8 group">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={images[activeImg]}
                alt={product.title}
                className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = Notfound; }}
              />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-red-500 text-white text-xs font-black px-6 py-2.5 rounded-full shadow-xl uppercase tracking-[0.2em]">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 flex-wrap justify-center mt-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all p-1 ${activeImg === idx
                      ? "border-orange-500 shadow-xl shadow-orange-500/10 scale-110"
                      : "border-gray-100 dark:border-dark-800 hover:border-orange-200"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-contain rounded-xl"
                      onError={(e) => { e.target.src = Notfound; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[10px] font-black text-orange-500 bg-orange-50 dark:bg-orange-950/20 px-4 py-1.5 rounded-full uppercase tracking-widest border border-orange-100 dark:border-orange-500/20">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-800 px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {product.brand}
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-[1.1] mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-xl text-yellow-600 dark:text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="font-black text-lg leading-none">{product.rating?.toFixed(1)}</span>
              </div>
              <div className="h-6 w-px bg-gray-200 dark:bg-dark-800" />
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold">
                <MessageSquare size={18} />
                {product.reviews?.length || 0} Reviews
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black text-gray-900 dark:text-white">
                ${discountedPrice}
              </span>
              {product.discountPercentage > 0 && (
                <div className="flex flex-col">
                  <span className="text-gray-400 line-through font-bold decoration-2">
                    ${product.price}
                  </span>
                  <span className="text-green-600 font-black text-xs uppercase tracking-wider">
                    Save {Math.round(product.discountPercentage)}%
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 rounded-3xl bg-gray-50 dark:bg-dark-900/50 border border-gray-100 dark:border-dark-800">
                <Truck className="text-orange-500" size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Shipping</p>
                  <p className="text-xs font-black text-gray-700 dark:text-gray-300">Fast Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-3xl bg-gray-50 dark:bg-dark-900/50 border border-gray-100 dark:border-dark-800">
                <RefreshCcw className="text-green-500" size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Returns</p>
                  <p className="text-xs font-black text-gray-700 dark:text-gray-300">30-Day Policy</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                size="lg"
                className="flex-[2] py-5 rounded-2xl shadow-xl shadow-orange-500/20"
              >
                {isOutOfStock ? "Sold Out" : qtyInCart > 0 ? `Add More (${qtyInCart})` : "Add to Shopping Cart"}
              </Button>
              {qtyInCart > 0 && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/store/cart")}
                  className="flex-1 py-5 rounded-2xl"
                >
                  View Cart
                </Button>
              )}
            </div>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-black mb-8 px-2 tracking-tight">
              Customer <span className="gradient-text">Feedback</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-6 rounded-[2rem] border-white/40 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/10 px-2 py-1 rounded-lg text-yellow-600">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-black">{review.rating}</span>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-4 italic">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-red-400 flex items-center justify-center text-[10px] font-black text-white">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <span className="text-xs font-black text-gray-800 dark:text-gray-100">
                      {review.reviewerName}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StoreProduct = () => {
  const { id } = useParams();
  const [storedata, loading, error] = useStoreProductDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <Skeleton className="h-10 w-32 rounded-xl mb-8" />
          <div className="glass rounded-[3rem] overflow-hidden flex flex-col lg:flex-row h-[600px]">
            <div className="lg:w-1/2 p-12 bg-white dark:bg-dark-900/50">
              <Skeleton className="w-full aspect-square rounded-[2rem]" />
            </div>
            <div className="lg:w-1/2 p-12 flex flex-col">
              <Skeleton className="h-6 w-1/4 mb-6" />
              <Skeleton className="h-10 w-3/4 mb-8" />
              <Skeleton className="h-12 w-1/3 mb-10" />
              <Skeleton className="h-24 w-full mb-10" />
              <div className="mt-auto flex gap-4">
                <Skeleton className="h-16 flex-[2] rounded-2xl" />
                <Skeleton className="h-16 flex-1 rounded-2xl" />
              </div>
            </div>
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

  if (!storedata || !storedata.id) return null;

  const DetailWithStock = withInStock(ProductDetailInner);
  return <DetailWithStock product={storedata} />;
};

export default StoreProduct;
