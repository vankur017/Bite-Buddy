// ✅ Core imports
import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";


// ✅ Redux & Context
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import UserContext from "./utils/UserContext.js";

// ✅ Router
import { BrowserRouter , Routes, Route } from "react-router-dom";

// ✅ Common components
import Header from "./src/components/Header.js";
import Footer from "./src/components/Footer.js";
import Error from "./src/components/Error.js";
import Shimmer from "./src/components/Shimmer.js";
import Cart from "./src/components/Cart.js";
import LoginPage from "./src/components/LoginPage.js";
import Payment from "./src/components/Payment.js";
import PaymentSuccess from "./src/components/PaymentSuccess.js";
import Store from "./src/components/Store.js";
import Storeproduct from "./src/components/Storeproduct.js";


// ✅ Lazy-loaded components
const Body = lazy(() => import("./src/components/Body.js"));
const About = lazy(() => import("./src/components/About.js"));
const RestaurantMenu = lazy(() => import("./src/components/RestautrantMenu.js"));
const Contact = lazy(() => import("./src/components/ContactUs.js"));

// ✅ App Layout
const AppLayout = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Mock API call
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
                <Route path="/" element={<LoginPage />} />
                <Route path="/browse" element={<Body />} />
                <Route path="/about" element={<About />} />
                <Route path="/store/" element={<Store />} />
                <Route path="/store/:id" element={<Storeproduct />} />
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
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

// ✅ Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);
