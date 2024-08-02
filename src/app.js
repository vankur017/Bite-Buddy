import React from "react";
import ReactDOM from "react-dom/client";
import Header  from "../components/Header";
import Body from "../components/Body";
import { Footer } from "../components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "../components/About";
import RestaurantMenu from "../components/RestautrantMenu";
import Contact from "../components/ContactUs";
import Error from "../components/Error.js";

const AppLayout = ()=>(
    <div className="app">
      
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
)

 const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [ 
        {
            path: "/",
            element: <Body/>
        },
        
        {
            path: "/about",
            element: <About/>
        },
        {
            path: "/contact",
            element: <Contact/>
        },
        {
            path:"/restaurant/:resId",
            element: <RestaurantMenu/>
        }
    ],
        errorElement: <Error/>
    },
   
   
 ]);



const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<RouterProvider router={appRouter}/>)