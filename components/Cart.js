import RestaurantMenu from "./RestautrantMenu";
import {useEffect, useState} from "react";


const Cart = ()=>{

    const [items, setItems] = useState(0);
              
    useEffect(()=>{
        const cartItemCount = document.querySelectorAll(".menu-item");
        const addButtons = document.querySelectorAll("#addToCart");
        const handleAddToCart = (e)=>{
            e.preventDefault();
            const itemId = e.target.getAttribute('data-item-id');
            
            setItems((prevCart)=>[...prevCart,{id:itemId}])
        }

        addButtons.forEach((button)=>{
            button.addEventListener("click", handleAddToCart)
        })
        return ()=>{
            addButtons.forEach((button)=>{
                button.removeEventListener('click', handleAddToCart)
            })
        }

    },[])

    console.log(items);
    
    return  (
        <div>
          <RestaurantMenu />
          <div>Cart Count: {items.length}</div>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      );

    
}


export default Cart

