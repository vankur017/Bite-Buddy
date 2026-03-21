import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage.js";
import UserContext from "../../context/UserContext.js";

describe("LoginPage", () => {
    test("submits a valid user profile", () => {
        const login = jest.fn();

        render(
            <MemoryRouter initialEntries={[{ pathname: "/login", state: { redirectTo: "/orders" } }]}>
                <UserContext.Provider value={{ login, isAuthenticated: false, currentUser: null }}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/orders" element={<div>Orders</div>} />
                    </Routes>
                </UserContext.Provider>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/ankur verma/i), { target: { value: "Test User" } });
        fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: "test@example.com" } });
        fireEvent.click(screen.getByRole("button", { name: /continue/i }));

        expect(login).toHaveBeenCalledWith({
            name: "Test User",
            email: "test@example.com",
        });
    });
});