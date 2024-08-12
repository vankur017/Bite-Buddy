import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Loginpage = ()=>{

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate();

    const handleLoginBtn = (event)=>{
        event.preventDefault();
        if(!username && !password){
            alert("Please enter user and password")
        }
        navigate("/")
    }

    return (

        <div className="login-page">
            <h1>Bite Buddy</h1>
            <h3>Welcome to Sign-In Page</h3>

            <form>
                <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
                <input
                 type="text"
                 placeholder="password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                />
            </form>


        </div>
    )
}

export default Loginpage