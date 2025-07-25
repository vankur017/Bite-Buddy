import { useDispatch } from "react-redux";
import { CDN_URL, REMOVE_ITEM_SVG } from "../../utils/constants";
import { addItem, removeItem } from "../../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item.id || item.card?.info?.id));
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item, idx) => {
        const info = item.card?.info || item;

        return (
          <div
            key={`${info.id}-${idx}`} // ✅ unique key
            className="p-2 m-2 mt-4 border-b border-gray-300 flex"
          >
            {pathname === "/cart" && (
              <div>
                <button
                  className="p-3 m-4 w-20"
                  onClick={() => handleRemoveItem(item)}
                >
                  <img src={REMOVE_ITEM_SVG} alt="Remove" />
                </button>
              </div>
            )}

            <div className="w-8/12">
              <div className="py-1 font-semibold">
                <span>{info.name}</span>
                <span> - ₹{(info.price ?? info.defaultPrice) / 100}</span>
              </div>
              <p className="text-xs text-gray-600">{info.description}</p>
            </div>

            <div className="w-4/12 p-4 relative">
              <button
                className="absolute bottom-4 right-4 px-3 py-1 rounded bg-black text-white shadow"
                onClick={() => handleAddItem(item)}
              >
                Add +
              </button>
              {info.imageId && (
                <img
                  src={CDN_URL + info.imageId}
                  alt={info.name}
                  className="w-[200px] h-[100px] rounded-xl object-cover"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
