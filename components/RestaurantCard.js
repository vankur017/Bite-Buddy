import { CDN_URL } from "../utils/constants";



const styleCard = {
    backgroundColor: "#f0f0f0",
}

const RestaurantCard = (props)=>{  
   
   const {resData} = props 
   
   const {
    cloudinaryImageId, name, cuisines, costForTwo, avgRating, sla} =
     resData?.info 
    

    return( 
        <div className="res-card" style = {styleCard}>

            <img 
        className="res-logo"
        alt="res-logo" 
       
        src= {CDN_URL 
            + cloudinaryImageId}
          />
  
            <h2>{name}</h2>
            <span><h5>{cuisines.join(',')}</h5></span>
            <h4>{costForTwo}</h4>
            <h4>{avgRating} Stars </h4>
            <h4>{sla.deliveryTime} minutes</h4>
           
    
        </div>
)
}

export default RestaurantCard