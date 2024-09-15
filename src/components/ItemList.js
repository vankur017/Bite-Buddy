import { useDispatch } from "react-redux";
import {  CDN_URL } from "/utils/constants";
import { addItem,removeItem } from "../../utils/cartSlice";
import { REMOVE_ITEM_SVG } from "../../utils/constants";

const ItemList = (props)=>{
    const {items} = props;
    console.log(items);
    
    const dispatch = useDispatch()
   
    const handleRemoveItem = (item)=>{
        
        dispatch(removeItem(item.card.info.id))
    }
    
    const handleAddItem =(item)=>{
        //Dispatch an action
        dispatch(addItem(item))
    }
    
    return <div>
               
                    {items.map((item)=> 
                    
                            <div
                            key={item.card.info.id} 
                            className="p-2 m-2  border-gray-300 border-b-2 text-left flex"
                           
                            > 
                                    
                                    <div> 
                                    <button className="p-3 m-4 w-20"
                                             onClick={() => handleRemoveItem(item)}
                                        >
                                           <img src={REMOVE_ITEM_SVG} />
                                        </button>
                                    </div>
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
                                   
                                        <button className="absolute bottom-4 right-4 px-3 py-1 rounded bg-black text-white shadow-lg"
                                             onClick={() => handleAddItem(item)}
                                        >
                                            Add +
                                        </button>
                                        
                                        <img src={CDN_URL + item.card.info.imageId} alt="🍲" className="block w-[200px] h-[100px] rounded-xl" />
                                    </div>
                            
                               
                            </div>
                    
                    )}
                
                
                
           </div>
    
}

export default ItemList