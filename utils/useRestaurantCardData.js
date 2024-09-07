import { useEffect, useState } from "react"


const useRestaurantCardData = ()=>{

    

    const [data, setData] =useState([]);

    useEffect(()=>{
        fetchRestaurantCardData()
    }, [])

    const fetchRestaurantCardData = async ()=>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.02760&lng=72.58710&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();

        setData(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
    
    }

    return data

}

