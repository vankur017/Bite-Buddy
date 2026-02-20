import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStoreItem } from "../../utils/storeCartSlice";
import withInStock from "../../utils/withInStock";
import Notfound from "../../utils/photo.png";

const PAGE_SIZE = 12;

/* ─── Individual Product Card (inner) ─────────────────────────── */
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
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img
          loading="lazy"
          className="h-48 w-full object-cover"
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
        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-1">
        <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide">
          {product.brand || product.category}
        </p>
        <h3 className="text-gray-800 text-sm font-bold line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-yellow-400 text-sm">{"★".repeat(Math.round(product.rating || 0))}</span>
          <span className="text-gray-400 text-xs">({product.rating?.toFixed(1)})</span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-orange-600 font-extrabold text-base">
            ${discountedPrice}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-gray-400 line-through text-xs">
              ${product.price}
            </span>
          )}
        </div>

        {/* Availability */}
        <span
          className={`text-xs font-semibold mt-0.5 ${product.availabilityStatus === "In Stock"
            ? "text-green-600"
            : "text-red-500"
            }`}
        >
          {product.availabilityStatus}
        </span>

        {/* Footer buttons */}
        <div className="flex gap-2 mt-auto pt-3">
          <Link
            to={`/store/${product.id}`}
            className="flex-1 text-center text-sm text-orange-600 border border-orange-500 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors font-semibold"
          >
            Details
          </Link>
          <button
            disabled={isOutOfStock}
            onClick={handleAdd}
            className={`flex-1 text-sm text-white px-3 py-1.5 rounded-lg transition-colors font-semibold ${isOutOfStock
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
              }`}
          >
            {qtyInCart > 0 ? `In Cart (${qtyInCart})` : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Wrap StoreCard with the withInStock HOC
const StoreCardWithStock = withInStock(StoreCard);

/* ─── Store Cards (listing grid) ──────────────────────────────── */
const StoreCards = ({ data = [], loading, error }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(data.map((p) => p.category))].sort();
    return ["All", ...cats];
  }, [data]);

  // Filter by category
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
      <div className="min-h-screen mt-[72px] px-6 py-10 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md animate-pulse border border-gray-100 overflow-hidden"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded mt-4" />
              </div>
            </div>
          ))}
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
    <div className="min-h-screen mt-[72px] px-4 sm:px-6 py-10 bg-gray-50">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${activeCategory === cat
              ? "bg-orange-500 text-white border-orange-500 shadow"
              : "bg-white text-gray-700 border-gray-300 hover:border-orange-400 hover:text-orange-500"
              }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-center text-gray-500 text-sm mb-4">
        Showing{" "}
        <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
        products
        {activeCategory !== "All" && (
          <> in <span className="font-semibold text-orange-500">{activeCategory}</span></>
        )}
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map((product) => (
          <StoreCardWithStock key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
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
  );
};

export default StoreCards;
