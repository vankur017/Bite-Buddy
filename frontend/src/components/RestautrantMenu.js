import Shimmer from "./Shimmer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "/utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />;

  const restaurantInfoCard = resInfo?.cards?.find(
    (c) => c?.card?.card?.info
  );

  const { name, cuisines, costForTwoMessage } = restaurantInfoCard?.card?.card?.info || {};

  const regularCards = resInfo?.cards?.find(
    (c) => c?.groupedCard?.cardGroupMap?.REGULAR
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories = regularCards?.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  ) || [];

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-20 py-10">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{name || "Restaurant"}</h2>
        <p className="text-md text-gray-700 mb-10">
          {(cuisines || []).join(", ")}{costForTwoMessage ? ` • ${costForTwoMessage}` : ""}
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
