import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStoreProductDetail from "../../utils/storeProductDetail.js";
import { addStoreItem } from "../../utils/storeCartSlice";
import withInStock from "../../utils/withInStock.js";
import Notfound from "../../utils/photo.png";

/* ─── Star Rating Helper ─────────────────────────────────────── */
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

/* ─── Inner Product Detail (unwrapped) ─────────────────────────── */
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
    <div className="max-w-6xl mx-auto mt-[72px] px-4 pb-16">
      <button
        onClick={() => navigate("/store")}
        className="mb-6 flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
      >
        ← Back to Store
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* ── Image Carousel ── */}
          <div className="lg:w-1/2 p-6 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-gray-50 h-80 flex items-center justify-center">
              <img
                src={images[activeImg]}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-all duration-300"
                onError={(e) => { e.target.src = Notfound; }}
              />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center rounded-2xl">
                  <span className="bg-red-600 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg uppercase tracking-wide">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === idx
                      ? "border-orange-500 shadow-md scale-105"
                      : "border-gray-200 hover:border-orange-300"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = Notfound; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="lg:w-1/2 p-8 flex flex-col gap-4">
            {/* Category & Brand */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-gray-800 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-gray-500 text-sm">
                {product.rating?.toFixed(1)} ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price Block */}
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-extrabold text-orange-600">
                ${discountedPrice}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-gray-400 line-through text-lg">
                    ${product.price}
                  </span>
                  <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-full">
                    {Math.round(product.discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <span
              className={`inline-flex items-center gap-1.5 text-sm font-semibold w-fit px-3 py-1 rounded-full ${isOutOfStock
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-700"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-green-500"
                  }`}
              />
              {product.availabilityStatus}
              {!isOutOfStock && product.stock !== undefined && (
                <span className="text-gray-400 font-normal">
                  ({product.stock} left)
                </span>
              )}
            </span>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Meta info grid */}
            <div className="grid grid-cols-2 gap-2 text-sm border-t border-gray-100 pt-4 mt-2">
              {product.warrantyInformation && (
                <div>
                  <p className="text-gray-400 text-xs">Warranty</p>
                  <p className="font-semibold text-gray-700">{product.warrantyInformation}</p>
                </div>
              )}
              {product.shippingInformation && (
                <div>
                  <p className="text-gray-400 text-xs">Shipping</p>
                  <p className="font-semibold text-gray-700">{product.shippingInformation}</p>
                </div>
              )}
              {product.returnPolicy && (
                <div>
                  <p className="text-gray-400 text-xs">Returns</p>
                  <p className="font-semibold text-gray-700">{product.returnPolicy}</p>
                </div>
              )}
              {product.minimumOrderQuantity && (
                <div>
                  <p className="text-gray-400 text-xs">Min. Order Qty</p>
                  <p className="font-semibold text-gray-700">{product.minimumOrderQuantity}</p>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3 rounded-xl text-white font-bold text-base transition-all shadow-md ${isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-95 cursor-pointer"
                  }`}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : qtyInCart > 0
                    ? `In Cart (${qtyInCart}) — Add More`
                    : "Add to Cart"}
              </button>
              {qtyInCart > 0 && (
                <button
                  onClick={() => navigate("/store/cart")}
                  className="flex-1 py-3 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-bold text-base transition-all shadow-md active:scale-95"
                >
                  View Cart ({qtyInCart})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Dimensions ── */}
        {product.dimensions && (
          <div className="border-t border-gray-100 px-8 py-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Dimensions</h3>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div>
                <span className="text-gray-400">Width </span>
                <span className="font-semibold">{product.dimensions.width} cm</span>
              </div>
              <div>
                <span className="text-gray-400">Height </span>
                <span className="font-semibold">{product.dimensions.height} cm</span>
              </div>
              <div>
                <span className="text-gray-400">Depth </span>
                <span className="font-semibold">{product.dimensions.depth} cm</span>
              </div>
              <div>
                <span className="text-gray-400">Weight </span>
                <span className="font-semibold">{product.weight} kg</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Reviews ── */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="border-t border-gray-100 px-8 py-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Customer Reviews
            </h3>
            <div className="flex flex-col gap-4">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800 text-sm">
                      {review.reviewerName}
                    </span>
                    <div className="flex items-center gap-1">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-gray-400 ml-1">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Page shell with loading / error states ────────────────────── */
const StoreProduct = () => {
  const { id } = useParams();
  const [storedata, loading, error] = useStoreProductDetail(id);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-[72px] px-4 pb-16 animate-pulse">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6">
            <div className="h-80 bg-gray-200 rounded-2xl" />
          </div>
          <div className="lg:w-1/2 p-8 flex flex-col gap-4">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded mt-auto" />
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

  // Apply withInStock HOC
  const DetailWithStock = withInStock(ProductDetailInner);
  return <DetailWithStock product={storedata} />;
};

export default StoreProduct;
