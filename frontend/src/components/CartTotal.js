import Cart from "./Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import axios from "axios"

const CartTotal = ()=>{

   const cartItems = useSelector((store)=>store.mycart.items)
   
    function total() {
        let cost = 0;
        for (let i = 0; i < cartItems.length; i++) {
          cost +=cartItems[i].card.info.price/100 || cartItems[i].card.info.defaultPrice / 100;  // Calculate total in number
        }
        return cost.toFixed(2) + '$';  // Format total to 2 decimal places and append '$'
      }
      const amount =  total()
      console.log(amount);
      
      const checkoutHandler = async(amount)=>{

        const {data} = await axios.post("http://localhost:4000/api/checkout", {
          amount
        })
        console.log(data);
        
    
      }
    return (
        <div className="p-2 m-2 border border-black">
          <div>
            <CartItems cartData={cartItems}/>
          </div>
           {amount}
            <button className="bg-green-400 p-4 rounded-lg" type="button" onClick={()=>checkoutHandler(amount)}>Pay Now</button>
        </div>
    )
}

export default CartTotal