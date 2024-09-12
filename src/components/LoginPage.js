import { useRef, useState } from "react";
import { checkValidData } from "../../utils/validate";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {

    const [isSignInForm, setForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const email = useRef(null);
    const password = useRef(null)
    const navigate = useNavigate('/')

    // console.log(email.current.value, password.current.value);
    

    const toggleSignInForm = ()=>{
        setForm(!isSignInForm)
    }
    const handleClick= ()=>{ 
        
       const message =  checkValidData(email.current.value, password.current.value);

        setErrorMessage(message)
   
        
        if(message) return;


        //Sign Up Form
        if(!isSignInForm){
            createUserWithEmailAndPassword(
                  auth,
                  email.current.value,
                  password.current.value
                ).then((userCredential) => {
    // Signed up 
               const user = userCredential.user;
                console.log(user);
                navigate('/browse')
                
    // ...
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ '-' + errorMessage)
             
    // ..
            });
        }


        // Sign In Form
        else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate('/browse')
    // ...
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
  });
        }
    }  
    


    return (
        <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-3/12">
                <h1 className="text-white text-2xl font-bold mb-6 text-center"> {isSignInForm? 'Login Page' : 'Sign Up Page'}</h1>
                <form onSubmit={(e)=>{e.preventDefault()}} className="space-y-4">
                    
                    {
                        !isSignInForm && 
                        <input type="text" 
                        placeholder="name"
                        className="p-4 w-full border-2 border-sky-500 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                        />
                    }

                    <input
                        ref={email}
                        type="email"
                        placeholder="Email"
                        className="p-4 w-full border-2 border-sky-500 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                    />
                    <input 
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="p-4 w-full border-2 border-sky-500 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                    />
                     <p className='text-white font-bold text-lg py-2'>{errorMessage}</p>
                    <button
                     className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                     onClick={handleClick}
                     >
                        {isSignInForm? 'Sign In' : 'Sign Up'}
                    </button>

                    <p className="cursor-pointer hover:translate-x-1 text-white " onClick={toggleSignInForm}>
                        
                        {isSignInForm?  'New to BiteBuddy? Sign Up' : 'Already a User? Sign In Now'}
                        
                        </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
