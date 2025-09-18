import { CDN_URL } from "/utils/constants";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";


// Lazily load an Image component with className support
const LazyImage = lazy(() =>
  Promise.resolve({
    default: ({ src, alt, className = "" }) => (
      <img
        className={`res-logo rounded-xl w-full  object-cover sm:h-64 ${className}`}
        loading="lazy"
        src={src}
        alt={alt}
      />
    ),
  })
);

const RestaurantCard = (props) => {

  console.log('rendered');
  
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    avgRating,
    sla,
  } = resData?.info || {};

  return (
    <motion.div
      whileHover={{ scale: 1.01, rotate: 0.2 }}
      whileTap={{ scale: 0.97 }}
      initial={false}
      animate={{ opacity: 1 }}
      // transition={{ duration: 0.1, ease: "easeOut" }}
      className="m-4 w-[350px] h-[80%] rounded-2xl bg-white bg-opacity-60 backdrop-blur-md shadow-2xl border border-orange-200 hover:border-orange-400 hover:shadow-orange-300"
    >
      <Suspense
        fallback={
          <div className="h-48 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl animate-pulse" />
        }
      >
        <LazyImage src={CDN_URL + cloudinaryImageId} alt="res-logo" />
      </Suspense>

      <div className="mt-4 text-gray-800 text-center flex flex-col items-center">
        <h2 className="font-extrabold text-xl text-orange-600">{name}</h2>
        <p className="text-sm text-gray-700 mt-1">{cuisines?.join(", ")}</p>
        <div className="mt-2 py-6 text-sm space-y-1">
          <h4 className="text-yellow-600 font-medium">{costForTwo}</h4>
          <h4 className="text-orange-500">User Ratings {avgRating} ★</h4>
          <h4 className="text-gray-600">{sla?.deliveryTime} min delivery</h4>
        </div>
      </div>

    </motion.div>
  );
};

// Higher Order Component for Veg/NonVeg badge
export const vegNonVeg = (WrappedCard) => {
  return (props) => {
    const { resData } = props;
    const isVeg = resData?.info?.veg === true;

    return (
      <div className="relative">
        <motion.div
          className={`absolute top-2 left-2 z-10 px-3 py-1 rounded-xl text-white text-sm shadow-md ${
            isVeg ? "bg-green-600" : "bg-red-600"
          }`}
          initial={false}
          animate={{ scale: 1 }}
          // transition={{ duration: 0.3 }}
        >
          {isVeg ? "Veg" : "Non Veg"}
        </motion.div>
        <WrappedCard {...props} />
      </div>
    );
  };
};

// Export wrapped version by default (so every card shows badge automatically)
export default vegNonVeg(RestaurantCard);
