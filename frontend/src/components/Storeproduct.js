import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import storeProductDetail from "../../utils/storeProductDetail.js";

const StoreProduct = () => {
  const { id } = useParams();

  useEffect(() => {
    storeProductDetail(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      Hey {id}
    </>
  );
};

export default StoreProduct;
