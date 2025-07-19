import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";

const RestaurantCategory = ({ data, showItems, setShowIndex, index }) => {
  const dispatch = useDispatch();
  const toggleAccordion = () => {
    setShowIndex(showItems ? null : index);
  };

  return (
    <div className="border border-white/20 rounded-xl shadow-lg bg-white/30 backdrop-blur-sm transition-all duration-300">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/40 transition"
        onClick={toggleAccordion}
      >
        <h3 className="font-semibold text-lg text-gray-800">{data.category}</h3>
        {showItems ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {showItems && (
          <motion.div
            className="px-4 pb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-300/40 rounded-lg p-4 flex flex-col justify-between bg-white/60 backdrop-blur-md hover:shadow-lg transition"
                >
                  <div>
                    <h4 className="text-md font-semibold mb-1 text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                    <p className="text-sm font-medium text-gray-800 mb-2">₹{item.price}</p>
                  </div>

                  <div className="flex justify-end items-center mt-auto">
                    <button
                      onClick={() => dispatch(addItem(item))}
                      className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantCategory;
