import {useEffect,useState} from "react";
import { MENU_API_URL } from "./constants";
const useRestaurantMenu = (resId)=>{

    const [resInfo, setResInfo] = useState(null)
    //fetchdata;
    useEffect(()=>{
        fetchData()
    }, []) 

    const fetchData = async () => {
        try {
            const response = await fetch(`${MENU_API_URL}${resId}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            
            const json = await response.json();
            setResInfo(json.data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    

    return resInfo;

}



export default useRestaurantMenu;