import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux"
import { clearAllItem } from "../../utils/cartSlice";



const Cart = ()=>{
    
    const cartItems = useSelector((store)=>store.mycart.items)

    const dispatch = useDispatch()
    
    const handleClearCart = ()=>{
        dispatch(clearAllItem())                                                                        
    } 

    console.log(cartItems);
    

    return (
        <div className=" text-center m-4 p-4">
          <h1 className="text-2xl font-bold">Cart</h1>
          <div className="bg-neutral-100 rounded-xl w-6/12 m-auto">
          <button className="p-2 m-2 bg-black text-white rounded-xl"
            onClick={handleClearCart}
          >
            clearItem
          </button>
          
          <ItemList items={cartItems}/>
            
          </div>
        </div>
    )
}

export default Cart