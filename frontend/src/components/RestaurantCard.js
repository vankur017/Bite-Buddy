import { CDN_URL } from "/utils/constants";
import { lazy, useContext, Suspense } from "react";
import { motion } from "framer-motion";
import UserContext from "../../utils/UserContext";

// Lazily load an Image component
const LazyImage = lazy(() =>
  Promise.resolve({
    default: ({ src, alt }) => (
      <img
        className="res-logo rounded-xl w-full h-48 object-cover sm:h-64"
        loading="lazy"
        src={src}
        alt={alt}
      />
    ),
  })
);

const RestaurantCard = (props) => {
  const { resData } = props;
  const { loggedInUser } = useContext(UserContext);

  const {
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    avgRating,
    sla,
  } = resData?.info;

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="m-4 p-4 w-[320px] h-[530px] rounded-2xl bg-white bg-opacity-60 backdrop-blur-md shadow-2xl border border-orange-200 hover:border-orange-400 hover:shadow-orange-300 transition-all duration-500"
    >
      <Suspense
        fallback={
          <div className="h-48 bg-gradient-to-r from-yellow-100 to-orange-100 animate-pulse rounded-xl" />
        }
      >
        <LazyImage src={CDN_URL + cloudinaryImageId} alt="res-logo" />
      </Suspense>

      <div className="mt-4 px-2 text-gray-800">
        <h2 className="font-extrabold text-xl text-orange-600">{name}</h2>
        <p className="text-sm text-gray-700 mt-1">{cuisines.join(", ")}</p>
        <div className="mt-2 text-sm space-y-1">
          <h4 className="text-yellow-600 font-medium">{costForTwo}</h4>
          <h4 className="text-orange-500">{avgRating} ★</h4>
          <h4 className="text-gray-600">{sla.deliveryTime} min delivery</h4>
        </div>
      </div>
    </motion.div>
  );
};

// Higher Order Component for Veg/NonVeg badge
export const vegNonVeg = (RestaurantCard) => {
  return (props) => {
    const { resData } = props;
    const isVeg = resData?.info?.veg === true;

    return (
      <div className="relative">
        <motion.div
          className={`absolute top-2 left-2 z-10 px-3 py-1 rounded-xl text-white text-sm shadow-md ${
            isVeg ? "bg-green-600" : "bg-red-600"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isVeg ? "Veg" : "Non Veg"}
        </motion.div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
