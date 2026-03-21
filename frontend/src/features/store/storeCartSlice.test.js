import reducer, { addStoreItem, clearStoreCart, updateStoreItemQty } from "./storeCartSlice.js";

const sampleProduct = {
    id: 101,
    title: "Organic Apples",
    price: 12,
    discountPercentage: 10,
};

describe("storeCartSlice", () => {
    test("increments quantity when the same product is added twice", () => {
        let state = reducer(undefined, addStoreItem(sampleProduct));
        state = reducer(state, addStoreItem(sampleProduct));

        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(2);
    });

    test("removes item when quantity drops below one", () => {
        let state = reducer(undefined, addStoreItem(sampleProduct));
        state = reducer(state, updateStoreItemQty({ id: 101, delta: -1 }));

        expect(state.items).toEqual([]);
    });

    test("clears the full grocery cart", () => {
        const populatedState = reducer(undefined, addStoreItem(sampleProduct));
        const clearedState = reducer(populatedState, clearStoreCart());

        expect(clearedState.items).toEqual([]);
    });
});