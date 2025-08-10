import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import { Footer } from "./src/components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./src/components/Error.js";
import Shimmer from "./src/components/Shimmer.js";
import UserContext from "./utils/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Cart from "./src/components/Cart.js";
import LoginPage from "./src/components/LoginPage.js";
import Payment from "./src/components/Payment.js";
import PaymentSuccess from "./src/components/PaymentSuccess.js";
import Store from "./src/components/Store.js";

const Body = lazy(() => import("./src/components/Body.js"));
const About = lazy(() => import("./src/components/About.js"));
const RestaurantMenu = lazy(() =>
  import("./src/components/RestautrantMenu.js")
);
const Contact = lazy(() => import("./src/components/ContactUs"));

const AppLayout = () => {
  // authentication
  const [userName, setUserName] = useState();

  useEffect(() => {
    // Mock API call
    const data = {
      name: "Ankur Verma",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        <div className="flex-wrap">
          <Outlet />
        </div>
        <Footer  className='absolute'/>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true, // 👈 makes LoginPage the default route
        element: <LoginPage />,
      },
      {
        path: "browse",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "restaurant/:resId",
        element: (
          <Suspense fallback={<Shimmer />}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "cart/payment",
        element: <Payment />,
      },
      {
        path: "cart/payment/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
