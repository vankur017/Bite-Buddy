import React from "react";
import { motion } from "framer-motion";

const StoreCards = ({ data = [], setData }) => {
  console.log(data);

  return (
    <div className="min-h-screen mt-20 p-4 flex flex-wrap justify-center gap-6 bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 transition-all duration-700">
      {data.map((product) => (
        <motion.div
          key={product.id}
          className="bg-[#eeee] rounded-2xl p-4 w-[260px] shadow-lg hover:shadow-[0_4px_30px_rgba(255,165,0,0.4)] hover:scale-[1.05] transition-all duration-300 cursor-pointer border border-orange-400/30"
          whileHover={{ y: -5 }}
        >
          <img
            className="h-40 w-full object-cover rounded-xl mb-3 transition-transform duration-500 hover:scale-[1.02]"
            src={product.images}
            alt={product.title}
          />
          <div>
            <h3 className="text-black text-lg font-semibold">{product.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StoreCards;
