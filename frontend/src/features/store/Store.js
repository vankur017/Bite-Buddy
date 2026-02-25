import React, { useState, useEffect } from "react";
import StoreCards from "app/features/store/StoreCards";
import Shimmer from "app/components/common/Shimmer";

const Store = () => {
  const [storedata, setStoredata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setStoredata(data.products);
      } catch (err) {
        setError("Failed to load store data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, []);

  return (
    <div className="bg-background dark:bg-dark-950 min-h-screen">
      <StoreCards data={storedata} loading={loading} error={error} />
    </div>
  );
};

export default Store;
