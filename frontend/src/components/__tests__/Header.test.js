import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Header from "../common/Header.js";
import UserContext from "../../context/UserContext.js";
import cartReducer from "../../features/cart/cartSlice.js";
import storeCartReducer from "../../features/store/storeCartSlice.js";

describe("Header", () => {
	test("shows login action for guest users", () => {
		const store = configureStore({
			reducer: {
				mycart: cartReducer,
				storeCart: storeCartReducer,
			},
		});

		render(
			<Provider store={store}>
				<BrowserRouter>
					<UserContext.Provider value={{ currentUser: null, loggedInUser: "Guest", isAuthenticated: false, logout: jest.fn() }}>
						<Header />
					</UserContext.Provider>
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getAllByText(/login/i).length).toBeGreaterThan(0);
	});
});

