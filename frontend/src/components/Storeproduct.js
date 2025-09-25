import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStoreProductDetail from "../../utils/storeProductDetail.js";

const StoreProduct = () => {
  const { id } = useParams();

  const [storedata, loading, error] = useStoreProductDetail(id);
  console.log(storedata);
  console.log(loading);
  console.log(error);
  
  
  
  
  
 

  return (
    <>
      Hey {id}
    </>
  );
};

export default StoreProduct;
