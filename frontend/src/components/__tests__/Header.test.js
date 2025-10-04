import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../..//utils/userSlice";
import cartReducer from "../../../utils/cartSlice";
import { BrowserRouter } from "react-router-dom";

// Mock Firebase signOut to avoid actual network calls
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),   // <-- add this
  signOut: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn((auth, cb) => {
    // Fake logged-in user
    cb({ uid: "1", email: "test@test.com", displayName: "Test User" });
    return jest.fn(); // unsubscribe fn
  }),
}));

function renderWithProviders(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: {
      user: userReducer,
      mycart: cartReducer,
    },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

describe("Header component", () => {
  test("renders logo and desktop links", async () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        user: { uid: "1", email: "test@test.com", displayName: "Test User" },
        mycart: { items: [] },
      },
    });

    // Wait for auth state to trigger
    await waitFor(() => {
      expect(screen.getByText("BiteBuddy")).toBeInTheDocument();
    });

    expect(screen.getByText("Browse")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  test("opens and closes mobile menu", async () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        user: { uid: "1", email: "test@test.com", displayName: "Test User" },
        mycart: { items: [] },
      },
    });

    // Wait until component loads
    await waitFor(() => {
      expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
    });

    // Open menu
    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(await screen.findByLabelText("Close menu")).toBeInTheDocument();

    // Close menu
    fireEvent.click(screen.getByLabelText("Close menu"));
    await waitFor(() => {
      expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
    });
  });
});
