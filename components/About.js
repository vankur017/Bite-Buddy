import User from "./User"
import { useEffect, useState } from "react"
import Shimmer from "./Shimmer"
import UserClass from "./UserClass"
import React from "react";
// Class Based Aboutn Component

//LIFFECYCLE

/* 
    --MOUNTING--

    => Parent Consturctor(dummy)
    => Parent Render(dummy)
       <HTML dummy>
    => In parent render we have child class =>(1) Child Constructor, (2) child render, (3)child componentDidMount 
    
    --Updating--
    render(API Data), this.setState()


    => After child componentDidMount, setState, New Props, forceUpdate are being replaced by the dummy data. In updaing first we have rendering of new props, setState, forceUpdate. Then In commit Phase we got to know where in the DOM these changes will be get applied.
    => After the above step componentDidUpdate method will be called to actually update the UI

    --UnMounting--



*/

// class About extends React.Component {

//     constructor(props){
//         super(props);
//         console.log("Parent Contructor");

//     }

//     componentDidMount(){
//         console.log('Parent component mounted');
        
//     }

//     render() {
//         console.log("Parent render");
        
//         return  (
        
//             <div className="About">
//                 <h1>This is Our team who work behind the scenese to provide you services </h1>
//                 <div>
//                     <UserClass name={"First Child"} Location={"Raebareli"} Contact={"+91-6386942812"}/>
//                     <UserClass name={"Second Child"} Location={"LKO"} Contact={"+91-638dad6942812"}/>
//                 </div>
//             </div>
//         )
//     }
// }



const About = () => {
     const [user, setUser] = useState([])
     async function apidata() {
        const data = await fetch('https://randomuser.me/api/?results=25')
        const res = await data.json()
        console.log(res);
        
        const userdata = res.results
        
        setUser( userdata )
        //Accessing results key
    }
    console.log(user);
    
    useEffect(() => {
        apidata()
    }, []) 

    
    return user.length==0? (<Shimmer/>) : (
        
        <div className="About">
            <p>dasdas</p>
            <h1>This is Our team who work behind the scenese to provide you services </h1>
          
            <div className="team-members">
               {user.map((profile, index) => (
                   <User key={index} peopleData={profile} />
               ))}
            </div>
        </div>
    )
}

export default About
