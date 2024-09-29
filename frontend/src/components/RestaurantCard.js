import { CDN_URL } from "/utils/constants";
import { lazy, useContext } from "react";
import { Suspense } from "react";
import UserContext from "../../utils/UserContext";


const RestaurantCard = (props)=>{  
   
   const {resData} = props;

   const {loggedInUser} = useContext(UserContext)
   
   const {
    cloudinaryImageId, name, cuisines, costForTwo, avgRating, sla} =
     resData?.info 
    

    return( 
        <div className="m-4 p-4  w-[320px] h-[530px] rounded-xl bg-gray-100 hover:bg-orange-200" >

            <Suspense>
                <img 
                        className="res-logo h-[310px] w-[320px] rounded-lg"
                        alt="res-logo" 
                        loading={lazy}
                        src= {CDN_URL
                + cloudinaryImageId}
                          />
            </Suspense>
  
            <h2 className="mt-4 font-bold py-2 px-6 text-lg">{name}</h2>
            <span><h5>{cuisines.join(',')}</h5></span>
            <h4>{costForTwo}</h4>
            <h4>{avgRating} Stars </h4>
            <h4>{sla.deliveryTime} minutes</h4>
          
           
    
        </div>
)
}

// Higher Order Components

export const vegNonVeg = (RestaurantCard)=>{
    
    return (props)=>{
        const {resData} = props;
       
        return (
            <div>
                {resData.info.veg===true ? ( 
                     <div>
                        <label className="absolute bg-green-600 text-white p-2 mx-4 rounded-lg">  Veg  </label>
                         <RestaurantCard {...props}/>
                    </div>)
                    :
                    (<div>
                        <label className="absolute bg-red-600 text-white p-2 mx-4 rounded-lg">Non Veg</label>
                            <RestaurantCard {...props}/>
                    </div>)
                }
              
            </div>
        )
    }
}

export default RestaurantCard