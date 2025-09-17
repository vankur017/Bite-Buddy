import {API_URL} from "./constants.js"
import {useState, useEffect} from "react"

export default function useFetchRes(){

    const [loading, setLoading] = useState(false)
    const [reslist, setResList] = useState([])

    useEffect(()=>{
       const fetchRestaurants =async()=>{
        
        try{
        setLoading(true)
        const data = await fetch(`${API_URL}/api/restaurants`);
        const json = await data.json();

        setResList(json?.restaurants)

        
    }
    catch(error){
       
        throw new Error('Something went wrong', error)
    }
    
    finally{
        setLoading(false);
    }
 
}
    fetchRestaurants()

},[])

    
    return {reslist, loading}

}