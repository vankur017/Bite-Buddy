import React from "react";
import { Link } from "react-router-dom";
import Notfound from "../../utils/photo.png";
import { useParams } from "react-router-dom";

const StoreCards = ({ data = [], setData }) => {
 
  
  const {id} = useParams()
  console.log(id);
  
  const handleClick= ()=>{

  }
  

  return (
    <div className="min-h-screen mt-20 px-6 py-10 bg-gray-50">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200"
          >
            <img
              className="h-48 w-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-105"
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : Notfound
              }
              alt={product.title}
            />
            <div className="p-4">
              <h3 className="text-gray-800 text-lg font-semibold line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {product.category || "Uncategorized"}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-orange-600 font-bold">
                  ₹{product.price || "—"}
                </span>
                <Link
                  to={`/store/${product.id}`}
                  className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-colors"
                  onClick={handleClick}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default StoreCards;
