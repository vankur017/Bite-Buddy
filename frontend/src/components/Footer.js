import { createContext, useContext } from "react"
import UserContext from "../../utils/UserContext"
export const Footer = ()=>{
    
    const {loggedInUser} = useContext(UserContext)

    return (
<footer className="bg-gray-800 text-white py-4 w-full my-0 ">
    
        <div className="container mx-auto flex justify-between">
            <div className="foot-content">
    
                <ul>
                    <h3>Copyright Information</h3>
                    <li>BiteBuddy 2024 Limited</li>
                    <li>© 2024 BiteBuddy Technologies Pvt. Ltd</li>
    
                </ul>
    
            </div>
            <div className="foot-content">
    
                <ul>
                    <h3>Made By</h3>
                    <h4>{loggedInUser}</h4>
    
    
                </ul>
    
            </div>
    
        </div>
</footer>

)
}