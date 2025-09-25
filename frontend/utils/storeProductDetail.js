import {useState, useEffect} from "react";

export default function useStoreProductDetail(id){
    const [loading, setLoading] = useState(false);
    const [ error, setError] = useState('');
    const [storedata, setStoredata] = useState({})

    useEffect(()=>{
         if (!id) return;
    const storeProductDetail = async()=>{

    

    
    try{
        setLoading(true);
        const data = await fetch(`https://dummyjson.com/products/${id}`)
         if (!data.ok) throw new Error("Failed to fetch product details");
        const json = await data.json();
        console.log("Fetching:", `https://dummyjson.com/products/${id}`);
        setStoredata(json)
        
        
        
        
    }
    catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
        storeProductDetail()


    },[id])
    return[storedata, loading, error]
}


