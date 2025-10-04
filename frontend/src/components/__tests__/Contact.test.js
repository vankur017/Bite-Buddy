import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import ContactUs from "../ContactUs";





describe("Should load ContactUs Component", ()=>{
 
  
  it("Should load contact us component ", () => {
  render(<ContactUs />);
  const heading = screen.getByRole("heading");
  
  expect(heading).toBeInTheDocument();
});


  it("Should check 2 input boxes in ContactUs page", ()=>{
  render(<ContactUs />);
  const inputBoxes = screen.getAllByRole("textbox"); // ✅ textbox is correct role for <input type="text">
  expect(inputBoxes.length).toBe(3);

  
  
})

  it("Should load button in ContactUs PAge", ()=>{
    render(<ContactUs />)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })
  

})