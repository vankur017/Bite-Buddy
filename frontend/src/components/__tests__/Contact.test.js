import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // ✅ add this
import ContactUs from "../ContactUs";

test("Should load contact us component ", () => {
  render(<ContactUs />);
  const heading = screen.getByRole("heading");
  
  expect(heading).toBeInTheDocument();

});
