import { useState, useEffect } from "react";
import Shimmer from "app/components/common/Shimmer.js";
import { useParams, useNavigate } from "react-router-dom";
import useRestaurantMenu from "app/hooks/useRestaurantMenu";
import RestaurantCategory from "app/features/restaurants/RestaurantCategory";
import { Star, Clock, MapPin, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "app/components/common/Button";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);
  const navigate = useNavigate();

  if (resInfo === null) return <Shimmer />;

  const restaurantData = resInfo?.cards ? resInfo?.cards[2]?.card?.card?.info : resInfo;

  const {
    name,
    cuisines,
    avgRating,
    totalRatingsString,
    sla,
    areaName,
    city
  } = restaurantData || {};

  let categories = [];
  if (resInfo?.cards) {
    categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];
  } else if (resInfo?.menu) {
    categories = resInfo.menu.map(m => ({
      card: {
        card: {
          title: m.category,
          itemCards: m.items.map(item => ({ card: { info: item } }))
        }
      }
    }));
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/browse")}
          className="mb-8 group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Restaurants
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[3rem] p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                  {name}
                </h1>
                <p className="text-lg font-bold text-gray-500 dark:text-gray-400 mb-6">
                  {cuisines?.join(", ")}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-2xl">
                    <Clock size={20} className="text-orange-500" />
                    <span className="font-black text-orange-600 dark:text-orange-400 text-sm uppercase tracking-widest">
                      {sla?.slaString || "30-40 MINS"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl">
                    <MapPin size={20} className="text-blue-500" />
                    <span className="font-black text-blue-600 dark:text-blue-400 text-sm uppercase tracking-widest">
                      {areaName || "Local Area"}, {city || "City"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-dark-800 min-w-[140px]">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star size={24} className="text-orange-500 fill-orange-500" />
                  <span className="text-2xl font-black text-gray-900 dark:text-white">{avgRating || "4.5"}</span>
                </div>
                <div className="h-px w-full bg-gray-100 dark:bg-dark-800 my-2" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  {totalRatingsString || "1K+ Ratings"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          {categories?.map((category, index) => (
            <RestaurantCategory
              key={category?.card?.card?.title}
              data={category?.card?.card}
              showItems={index === showIndex}
              setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
