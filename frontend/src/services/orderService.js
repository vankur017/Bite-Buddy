import { API_URL } from "app/services/constants.js";

export const submitOrder = async ({ email, method, productList, source }) => {
    const response = await fetch(`${API_URL}/api/payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            method,
            productList,
            source,
        }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(payload.error || "Unable to submit order right now.");
    }

    return payload;
};