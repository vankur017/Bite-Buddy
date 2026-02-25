import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "app/store/index.js";
import UserContext from "app/context/UserContext.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "app/components/common/Header.js";
import Footer from "app/components/common/Footer.js";
import Error from "app/components/common/Error.js";
import Shimmer from "app/components/common/Shimmer.js";
import Cart from "app/features/cart/Cart.js";
import Payment from "app/features/cart/Payment.js";
import PaymentSuccess from "app/features/cart/PaymentSuccess.js";
import Store from "app/features/store/Store.js";
import StoreCart from "app/features/store/StoreCart.js";
import StorePayment from "app/features/store/StorePayment.js";
import StorePaymentSuccess from "app/features/store/StorePaymentSuccess.js";

const Body = lazy(() => import("app/features/restaurants/Body.js"));
const About = lazy(() => import("app/features/pages/About.js"));
const RestaurantMenu = lazy(() => import("app/features/restaurants/RestaurantMenu.js"));
const Contact = lazy(() => import("app/features/pages/ContactUs.js"));
const StoreProduct = lazy(() => import("app/features/store/Storeproduct.js"));

const AppLayout = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const data = { name: "Ankur Verma" };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white backdrop-blur-lg">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<Shimmer />}>
              <Routes>
                <Route path="/" element={<Navigate to="/browse" replace />} />
                <Route path="/browse" element={<Body />} />
                <Route path="/about" element={<About />} />
                <Route path="/store/" element={<Store />} />
                <Route path="/store/cart" element={<StoreCart />} />
                <Route path="/store/cart/payment" element={<StorePayment />} />
                <Route path="/store/cart/payment/success" element={<StorePaymentSuccess />} />
                <Route path="/store/:id" element={<StoreProduct />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/payment" element={<Payment />} />
                <Route
                  path="/cart/payment/payment-success"
                  element={<PaymentSuccess />}
                />
                <Route path="*" element={<Error />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);
