import reducer, { addItem, clearAllItem, removeItem } from "./cartSlice.js";

describe("cartSlice", () => {
    test("adds and removes restaurant items", () => {
        const item = { card: { info: { id: "rest-1", name: "Paneer Bowl" } } };
        let state = reducer(undefined, addItem(item));

        expect(state.items).toHaveLength(1);

        state = reducer(state, removeItem("rest-1"));

        expect(state.items).toHaveLength(0);
    });

    test("clears the cart", () => {
        const item = { card: { info: { id: "rest-1", name: "Paneer Bowl" } } };
        const populatedState = reducer(undefined, addItem(item));
        const clearedState = reducer(populatedState, clearAllItem());

        expect(clearedState.items).toEqual([]);
    });
});