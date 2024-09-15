import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux"
import { clearAllItem } from "../../utils/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART_SVG } from "../../utils/constants";



const Cart = ()=>{
    const [showClearCartBtn, setShowClearCartBtn] = useState(true) 
    const cartItems = useSelector((store)=>store.mycart.items)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClearCart = ()=>{
        dispatch(clearAllItem())                                                                        
    } 
    const handleClick = ()=>{
      navigate('/browse')
    }
    console.log(cartItems);
    

    return (
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-center mb-4">Cart</h1>
          <div className="bg-neutral-100 rounded-xl md:w-8/12 lg:w-6/12 w-full m-auto p-6 shadow-lg">
         
          {cartItems.length === 0 ? (
              <div className="text-center py-8">
               <p className="text-2xl font-bold text-gray-700 mb-4">Your Cart is Empty!</p>
               <p className="text-gray-500 mb-6">Looks like you haven’t added anything to your cart yet.</p>
               <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                onClick={handleClick}
                >
               Order Some Delicious Food
             </button>
             <div className="mt-6">
               <img src={CLEAR_CART_SVG} alt="Empty Cart" className="mx-auto w-32 opacity-75" />
             </div>
          </div>
          ) : 
          
          <div>
              <button className="p-2 m-2 mx-auto bg-black text-white rounded-xl"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
          </div>
        }
          
          <ItemList items={cartItems}/>
            
          </div>
        </div>
    )
}

export default Cart