import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import {Provider} from "react-redux";
import Header from "../Header"
import appStore from "../../../utils/appStore"
import {BrowserRouter} from "react-router-dom";


it("Should render header component with Login Button", ()=>{
    render(
    <BrowserRouter>
        <Provider store={appStore}>
               <Header />
        </Provider>
    </BrowserRouter>   
)

const loginbutton = screen.getByRole("button", {name: "Login"});
expect(loginbutton).toBeInTheDocument()

})