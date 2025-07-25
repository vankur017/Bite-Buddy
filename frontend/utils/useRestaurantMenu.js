// import {useEffect,useState} from "react";
// import { MENU_API_URL } from "./constants";
// const useRestaurantMenu = (resId)=>{
//     console.log(resId);
    
//     const [resInfo, setResInfo] = useState(null)
//     //fetchdata;
//     useEffect(()=>{
//         fetchData()
//     }, []) 

//     const fetchData = async () => {
//         try {
//             const response = await fetch(`${MENU_API_URL}${resId}`);
            
            
//             if (!response.ok) {
//                 throw new Error('Network response was not ok.');
//             }
            
//             const json = await response.json();
//             console.log(json);
            
//             setResInfo(json);
//         } catch (error) {
//             console.error('Fetch error:', error);
//         }
//     };
    

//     return resInfo;

// }



// export default useRestaurantMenu;
import { useEffect, useState } from 'react';

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4200/api/menu?restaurantId=${resId}`);
        if (!response.ok) {
          throw new Error("Menu not found");
        }
        const json = await response.json();
        setResInfo(json);
      } catch (error) {
        console.error("Fetch error:", error);
        setResInfo(null);
      }
    };

    if (resId) {
      fetchData();
    }
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
