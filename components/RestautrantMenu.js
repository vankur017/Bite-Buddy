import {useEffect, useState} from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants"

const RestaurantMenu = ()=>{

     const [resInfo, setResInfo] = useState(null);

     const {resId} = useParams()
    
        

        
    //  const [dropDown, setDropdown] = useState(false);

    useEffect(()=>{
        fetchMenu()
    }, [])
    
const fetchMenu = async () => {
    try {
        const response = await fetch(
            MENU_API_URL+
            resId
            );
            console.log(response.json);
            
        const json = await response.json();
        setResInfo(json.data);
        
    } catch (error) {
        console.error("Error fetching menu:", error);
    };
    }


    console.log(resId, resInfo);
    // const Menu = ()=>(
    //     <select>
    //     {itemCards?.map((item) => (
    //         <option key={item.card.info.id}>
    //             {item.card.info.name} - {item.card.info.price / 100 || item.card.info.defaultPrice / 100} Rs
    //         </option>
    //             )
    //         )
    //     }
    //     </select>
    // )
  
    if(resInfo===null) return <Shimmer/>
    
    const { name, cuisines,costForTwoMessage } = resInfo?.cards?.[2]?.card?.card?.info 
    console.log(name);
    
    const {itemCards} = resInfo?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card

    
    

    return(
        <div className="menu">
            <h2>{name}</h2>
         
            <h3>{cuisines.join(', ')}</h3>

            <h4>{costForTwoMessage}</h4>

            <button>
                Menu
            </button>
            <ul className="Menu">
                {/* <li>{itemCards[1].card.info.name}</li>
                <li>{itemCards[2].card.info.name}</li>
                */}
               {itemCards.map((item)=> (
                 <li>
                    {item.card.info.name } {'  '} - 
                    {item.card.info.price/100 || item.card.info.defaultPrice/100}{' Rs'}
                </li>
               
                ))}
                

            </ul>

        </div>
    )
}

export default  RestaurantMenu