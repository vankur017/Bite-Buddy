import ItemList from "app/components/common/ItemList";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="w-full">
      <div
        className="glass rounded-3xl p-6 mb-4 cursor-pointer hover:shadow-xl transition-all border-white/20"
        onClick={handleClick}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            {data.title}
            <span className="text-xs px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-lg">
              {data.itemCards?.length || 0}
            </span>
          </h3>
          <div className="p-2 transition-transform duration-300">
            {showItems ? <ChevronUp size={24} className="text-orange-500" /> : <ChevronDown size={24} className="text-gray-400" />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showItems && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-2 pr-2 pb-8">
              <ItemList items={data.itemCards} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantCategory;
