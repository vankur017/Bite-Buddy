import { useState,useEffect } from "react";


const useGroceryData = ()=>{

    const [storeData, setStoreData] = useState([]);


    useEffect(()=>{
    APIDATA()
    }, [])

const APIDATA = async ()=>{
    const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false';
    const options = {
        method: 'GET',
        headers: {
                'x-rapidapi-key': '0b5bc7ac3dmsh19e0813a51cd9b7p15833ajsn8dc9d107bf96',
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
}
}

   
        const response = await fetch(url, options);
        const result = await response.json();
        setStoreData(result.data)
       
    }
    return storeData
   
}

export default useGroceryData;