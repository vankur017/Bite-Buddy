import { useEffect, useState } from "react";
import { MENU_API_URL } from "app/services/constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, [resId]);

    const fetchData = async () => {
        try {
            const response = await fetch(MENU_API_URL + resId);
            const json = await response.json();
            setResInfo(json.data || json);
        } catch (err) {
            console.error("Error fetching menu:", err);
        }
    };

    return resInfo;
};

export default useRestaurantMenu;
