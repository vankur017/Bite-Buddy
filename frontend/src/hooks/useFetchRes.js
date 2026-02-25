import { useState, useEffect } from "react";
import { API_URL } from "app/services/constants";

const useFetchRes = () => {
    const [reslist, setReslist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/restaurants`);
            const json = await response.json();

            // Robustly find the restaurants array across custom API or Swiggy
            const getRestaurants = (jsonData) => {
                // Custom Firebase API structure
                if (jsonData?.restaurants) {
                    return jsonData.restaurants;
                }
                // Fallback to deeply nested Swiggy structure
                for (let i = 0; i < jsonData?.data?.cards?.length; i++) {
                    const restaurants = jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                    if (restaurants !== undefined) {
                        return restaurants;
                    }
                }
                return [];
            };

            setReslist(getRestaurants(json));
        } catch (err) {
            console.error("Error fetching restaurants:", err);
        } finally {
            setLoading(false);
        }
    };

    return { reslist, loading };
};

export default useFetchRes;
