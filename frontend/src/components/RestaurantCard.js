import { CDN_URL } from "/utils/constants";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

// Lazily load an Image component with className support
const LazyImage = lazy(() =>
  Promise.resolve({
    default: ({ src, alt, className = "" }) => (
      <img
        className={`res-logo rounded-t-2xl w-full object-cover h-48 sm:h-56 ${className}`}
        loading="lazy"
        src={src}
        alt={alt}
      />
    ),
  })
);

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    avgRating,
    sla,
  } = resData?.info || {};

  const ratingColor =
    avgRating >= 4.5
      ? "text-green-600"
      : avgRating >= 3.5
        ? "text-yellow-600"
        : "text-red-500";

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(249,115,22,0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="m-3 w-[300px] sm:w-[320px] rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-orange-100 overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Suspense
          fallback={
            <div className="h-48 sm:h-56 bg-gradient-to-r from-orange-100 to-red-100 animate-pulse" />
          }
        >
          <LazyImage
            src={CDN_URL + cloudinaryImageId}
            alt={name || "Restaurant"}
          />
        </Suspense>
        {/* Delivery time pill */}
        {sla?.deliveryTime && (
          <span className="absolute bottom-2 right-2 bg-white/90 text-gray-700 text-xs font-bold px-2 py-1 rounded-full shadow flex items-center gap-1">
            🕐 {sla.deliveryTime} min
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <h2 className="font-extrabold text-base text-gray-800 truncate">
          {name}
        </h2>
        <p className="text-xs text-gray-500 truncate">
          {cuisines?.slice(0, 3).join(" · ")}
        </p>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          {/* Rating */}
          <span className={`font-bold text-sm flex items-center gap-1 ${ratingColor}`}>
            ★ {avgRating ?? "—"}
          </span>

          {/* Cost */}
          <span className="text-xs text-gray-500 font-medium">{costForTwo}</span>
        </div>
      </div>
    </motion.div>
  );
};

// ── Higher Order Component: Veg / Non-Veg badge ──────────────────
export const vegNonVeg = (WrappedCard) => {
  const WithBadge = (props) => {
    const { resData } = props;
    const isVeg = resData?.info?.veg === true;

    return (
      <div className="relative">
        {/* Badge */}
        <div
          className={`absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded-full text-white text-xs font-bold shadow-md ${isVeg ? "bg-green-500" : "bg-red-500"
            }`}
        >
          {isVeg ? "🌿 Veg" : "🍖 Non-Veg"}
        </div>
        <WrappedCard {...props} />
      </div>
    );
  };
  WithBadge.displayName = `vegNonVeg(${WrappedCard.displayName || WrappedCard.name || "Component"})`;
  return WithBadge;
};

// Default export: already wrapped with badge HOC
export default vegNonVeg(RestaurantCard);
