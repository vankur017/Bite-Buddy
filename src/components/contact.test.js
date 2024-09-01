import { render, screen } from "@testing-library/react"
import Contact from "./ContactUs"
import "@testing-library/jest-dom"

test("Should load contact us component", ()=>{
    render(<Contact/>) // rendered to jsdom

   const heading= screen.getByRole("heading")
   expect(heading).toBeInTheDocument()
})
test("Should load Button inside Contact Component", ()=>{
    render(<Contact/>) // rendered to jsdom

   const button= screen.getByRole("button")
   expect(button).toBeInTheDocument()

})

test("Should load input name inside Contact component",()=>{
    render(<Contact/>)
    const input = screen.getByPlaceholderText("name");

    expect(input).toBeInTheDocument()
})

test("Should load two input boxes inside Contact component",()=>{
    render(<Contact/>)
    //Querying
    const inputBoxes = screen.getAllByRole("textbox");
    console.log(inputBoxes);
    
    expect(inputBoxes.length).toBe(2)
})