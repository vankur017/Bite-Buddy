import { CDN_URL } from "app/services/constants";
import { Star, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    sla,
    areaName,
  } = resData?.info || resData;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-dark-900 rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5 transition-all duration-300 border border-gray-100 dark:border-dark-800 flex flex-col h-full overflow-hidden group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-dark-950/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 border border-white/20">
          <Star size={14} className="text-orange-500 fill-orange-500" />
          <span className="text-xs font-black text-gray-900 dark:text-white">{avgRating}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
          {name}
        </h3>

        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 line-clamp-1">
          {cuisines.join(", ")}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 dark:border-dark-800 flex items-center justify-between text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">{sla?.slaString || sla?.deliveryTime + " MINS"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">{areaName}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const vegNonVeg = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute -top-2 -left-2 z-10 bg-orange-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl shadow-orange-600/20 uppercase tracking-widest border-2 border-white dark:border-dark-900">
          Must Try
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
