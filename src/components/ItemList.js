import { useDispatch } from "react-redux";
import {  CDN_URL } from "/utils/constants";
import { addItem } from "../../utils/cartSlice";
import useRestaurantMenu from "../../utils/useRestaurantMenu";

const ItemList = (props)=>{
    const {items} = props;

    const dispatch = useDispatch()
   
    
    const handleAddItem =(item)=>{
        //Dispatch an action
        dispatch(addItem(item))
    }
    
    return <div>
               
                    {items.map((item)=> 
                    
                            <div
                            className="p-2 m-2  border-gray-300 border-b-2 text-left flex"
                            key={item.card.info.id} 
                            > 
                                    
                               
                                    <div className="w-9/12">
                                        <div className="py-2">
                                            <span>{item.card.info.name} </span>  
                                            <span>
                                                 - ₹
                                                 {item.card.info.price
                                                  ? item.card.info.price/100 : 
                                                  item.card.info.defaultPrice/100}
                                            </span>
                                           
                                        </div>
                                        <p className="text-xs">{item.card.info.description}</p>
                                        
                                    </div>
                                    <div className="w-4/12 p-4 inline-block relative">
    <button className="absolute bottom-4 right-4 px-5 py-1 rounded bg-black text-white shadow-lg"
        onClick={() => handleAddItem(item)}
    >
        Add +
    </button>
    <img src={CDN_URL + item.card.info.imageId} alt="🍲" className="block w-full rounded-xl" />
</div>
                            
                               
                            </div>
                    
                    )}
                
                
                
           </div>
    
}

export default ItemList