import { useEffect } from "react";
import {lazy} from "react"; 
import useGroceryData from "../../utils/useGroceryData";
import Shimmer from "./Shimmer";




const GroceryCard = ({ product }) => {


    const {
      asin,
      product_title,
      product_price,
      product_star_rating,
      product_num_ratings,
      product_photo,
     
    } = product;

  
    return (
      <div className="mobile-card" key={asin}>
        <img src={product_photo} alt={product_title} />
        <h3>{product_title}</h3>
        <p>Price: {product_price}</p>
        <p>Star Rating: {product_star_rating}</p>
        <p>Number of Ratings: {product_num_ratings}</p>

      </div>
    );
  };
  


const MobileStore = ()=>{

    const data = useGroceryData()

    const storeData = data.products
    console.log(storeData);

    if(!storeData) return <Shimmer/>

    return (
        <div className="restaurant-container">
         {
            storeData.map((product)=>(
                <GroceryCard product={product} key ={product.asin} />
            ))
         }
           
          
                  { /* //NOTE:- NEVER USE INDEX AS KEY!!! Used Index Here because we have duplicated the data in api which will return in lot of warnings, */}
        </div>
    )
}

export default  MobileStore