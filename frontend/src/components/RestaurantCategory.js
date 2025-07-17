import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";
import { CDN_URL } from "/utils/constants";

const RestaurantCategory = ({ data, showItems, setShowIndex, index }) => {
  const dispatch = useDispatch();
  const toggleAccordion = () => {
    // Toggle logic: if already open, close it
    setShowIndex(showItems ? null : index);
  };


  return (
    <div className="border rounded-lg shadow-md bg-white">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
        onClick={toggleAccordion}
      >
        <h3 className="font-semibold text-lg">{data.title}</h3>
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
              {data?.itemCards?.map((item) => {
                const info = item.card.info;
                const price = info.price || info.defaultPrice || 0;

                return (
                  <div
                    key={info.id}
                    className="border rounded-lg p-4 flex flex-col justify-between bg-gray-50 hover:shadow transition"
                  >
                    {/* Text */}
                    <div>
                      <h4 className="text-md font-semibold mb-1">{info.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{info.description}</p>
                      <p className="text-sm font-medium text-gray-800 mb-2">₹{price / 100}</p>
                    </div>

                    {/* Image & Add Button */}
                    <div className="flex justify-between items-center mt-auto">
                      {info.imageId && (
                        <img
                          src={`${CDN_URL}${info.imageId}`}
                          alt={info.name}
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                      )}
                      <button
                        onClick={() => dispatch(addItem(info))}
                        className="ml-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantCategory;
