import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../../utils/constants";
import { addItem, removeItem } from "../../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const cartItems = useSelector((store) => store.mycart.items);

  const handleAddItem = (item) => {
    const info = item.card?.info || item;
    dispatch(addItem({ card: { info } })); // normalized payload
  };

  const handleRemoveItem = (item) => {
    const info = item.card?.info || item;
    dispatch(removeItem(info.id));
  };

  return (
    <div>
      {items.map((item, idx) => {
        const info = item.card?.info || item;

        const cartItem = cartItems.find(
          (ci) => (ci.card?.info?.id || ci.id) === info.id
        );
        const quantity = cartItem?.quantity || 0;

        // normalize price safely (convert from paise to ₹)
        const unitPrice = ((info.price ?? info.defaultPrice ?? 0) / 100);
        const totalPrice = unitPrice * quantity*100;

        return (
          <div
            key={`${info.id}-${idx}`}
            className="p-2 m-2 mt-4 border-b border-gray-300 flex"
          >
            {pathname === "/cart" && (
              <div>
                <button
                  className="p-3 m-4 w-20"
                  onClick={() => handleRemoveItem(item)}
                >
                  ❌
                </button>
              </div>
            )}

            <div className="w-8/12">
              <div className="py-1 font-semibold">
                <span>{info.name}</span>
                <span>
                  {" "}– ₹{unitPrice.toFixed(2)*100}
                </span>
              </div>
              <p className="text-xs text-gray-600">{info.description}</p>

              {quantity > 0 && (
                <span className="text-red-500 text-sm">
                  Quantity: {quantity} | Total: ₹{totalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="w-4/12 p-4 relative flex justify-end">
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
