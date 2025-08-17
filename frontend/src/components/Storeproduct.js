import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {storeProductDetail} from "../../utils/storeProductDetail.js"

const Storeproduct = ()=>{
    const {id} = useParams()
  

    useEffect(()=>{
        console.log('id now', id);
        

    },[id])

    return (
        <>
        </>
    )
    

}
export default Storeproduct