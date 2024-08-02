import { CDN_URL } from "../utils/constants";



const styleCard = {
    backgroundColor: "#f0f0f0",
}

const RestaurantCard = (props)=>{  //IMP NOTE:- destructuring on the fly:- means while props is processing by REACT we are simply destructuring it where we accept props, in place of "props" we can also write {resName, cuisine}. THen we don't need to do destructuring in line 88
  
   
   const {resData} = props // destructuing the actual props passed to function
   
   const {
    cloudinaryImageId, name, cuisines, costForTwo, avgRating, sla} =
     resData?.info //Destructuring whole resList, to easliy access the values of keys

//    const {deliveryTime} =resData?.info?.sla //Destructuring whole resList, to easliy access the values of keys
   
    

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