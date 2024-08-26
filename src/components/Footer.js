import { createContext } from "react"
import UserContext from "../../utils/UserContext"
export const Footer = ()=>{
    
    const {loggedInUser} = createContext(UserContext)

    return (

    <div id="footer">
        <div className="foot-content"> 

            <ul>
                <h3>Copyright Information</h3>
                <li>BiteBuddy 2024 Limited</li>
                <li>© 2024 Bundl Technologies Pvt. Ltd</li>
         
            </ul>

        </div>
        <div className="foot-content"> 

            <ul>
                <h3>Made By</h3>
                <h4>{loggedInUser}</h4>
              
              
            </ul>

        </div>
        
    </div>

)
}