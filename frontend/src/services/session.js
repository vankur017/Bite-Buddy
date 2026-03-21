const USER_SESSION_KEY = "bitebuddy:user-session";
const ORDER_HISTORY_KEY = "bitebuddy:order-history";
const FAVORITES_KEY = "bitebuddy:favorites";

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

const readJson = (key, fallbackValue) => {
    if (!canUseStorage()) {
        return fallbackValue;
    }

    try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : fallbackValue;
    } catch (error) {
        console.error(`Unable to read persisted state for ${key}`, error);
        return fallbackValue;
    }
};

const writeJson = (key, value) => {
    if (!canUseStorage()) {
        return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
};

export const loadPersistedUser = () => readJson(USER_SESSION_KEY, null);

export const savePersistedUser = (user) => writeJson(USER_SESSION_KEY, user);

export const clearPersistedUser = () => {
    if (!canUseStorage()) {
        return;
    }

    window.localStorage.removeItem(USER_SESSION_KEY);
};

export const loadOrderHistory = () => readJson(ORDER_HISTORY_KEY, []);

export const addOrderHistoryEntry = (order) => {
    const orders = loadOrderHistory();
    const nextOrders = [order, ...orders].slice(0, 50);
    writeJson(ORDER_HISTORY_KEY, nextOrders);
    return nextOrders;
};

export const loadFavorites = () => readJson(FAVORITES_KEY, []);

export const saveFavorites = (favorites) => writeJson(FAVORITES_KEY, favorites);

export const toggleFavoriteEntry = (item) => {
    const favorites = loadFavorites();
    const existingIndex = favorites.findIndex(
        (favorite) => favorite.id === item.id && favorite.type === item.type
    );

    if (existingIndex >= 0) {
        const nextFavorites = favorites.filter((_, index) => index !== existingIndex);
        saveFavorites(nextFavorites);
        return nextFavorites;
    }

    const nextFavorites = [item, ...favorites];
    saveFavorites(nextFavorites);
    return nextFavorites;
};