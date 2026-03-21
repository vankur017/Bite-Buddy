import { useState } from "react";
import { loadFavorites, toggleFavoriteEntry } from "app/services/session.js";

const useFavorites = (item) => {
    const [favorites, setFavorites] = useState(() => loadFavorites());

    const isFavorite = favorites.some(
        (favorite) => favorite.id === item.id && favorite.type === item.type
    );

    const toggleFavorite = (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        const nextFavorites = toggleFavoriteEntry(item);
        setFavorites(nextFavorites);
    };

    return {
        isFavorite,
        toggleFavorite,
    };
};

export default useFavorites;