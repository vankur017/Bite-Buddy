import { useEffect, useState } from 'react';
import {API_URL} from "./constants.js"
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/menu?restaurantId=${resId}`);
        if (!response.ok) {
          throw new Error("Menu not found");
        }
        const json = await response.json();
        setResInfo(json);
      } catch (error) {
        console.error("Fetch error:", error);
        setResInfo(null);
      }
    };

    if (resId) {
      fetchData();
    }
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
