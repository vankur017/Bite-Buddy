import Shimmer from "./Shimmer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "/utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  // ❌ Removed resInfo.json() — not needed, causes crash
  // ✅ Directly log the JSON object
  console.log(resInfo);

  if (!resInfo) return <Shimmer />;

  const { name, cuisines = [], menu = [] } = resInfo;

  return (
    <div className="py-[200px] bg-white text-black px-4 sm:px-6 lg:px-20">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{name || "Restaurant"}</h2>
        <p className="text-md text-gray-700 mb-10">
          {cuisines.join(", ")}
        </p>
      </div>

      <div className="space-y-8">
        {menu.map((category, index) => (
          <RestaurantCategory
            key={category.category}
            data={category}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
