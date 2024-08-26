import {useEffect,useState} from "react";
import { MENU_API_URL } from "./constants";
const useRestaurantMenu = (resId)=>{

    const [resInfo, setResInfo] = useState(null)
    //fetchdata;
    useEffect(()=>{
        fetchData()
    }, []) 

    const fetchData = async()=>{

        const response = await fetch(
                        `https://corsproxy-la3g.onrender.com/full/?url=${MENU_API_URL}`+
                            resId
                        );
        const json = await response.json();
        setResInfo(json.data);
        
    }


    return resInfo;

}



export default useRestaurantMenu;