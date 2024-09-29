import { useState } from "react";
import Cart from "./Cart";

import { useSelector } from "react-redux";



const CartItems = (props)=>{

    const itemList= props
    const items = itemList.cartData
    console.log(items);
    
  
    
    items.map((item, index)=>{
            <div>
                <ul>
                    <li>{item?.card?.info?.name}</li>
                </ul>
            </div>
    })

}
export default CartItems