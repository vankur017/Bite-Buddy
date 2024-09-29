import { useRef, useState } from "react";
import { checkValidData } from "../../utils/validate";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { APP_BACKGROUND } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const LoginPage = () => {
    const [isSignInForm, setForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate('/');
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setForm(!isSignInForm);
    };

    const handleClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        // Sign Up Form
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: "https://example.com/jane-q-user/profile.jpg"
                    }).then(() => {
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(addUser({ uid, email, displayName }));
                    });
                })
                .catch((error) => setErrorMessage(error.code + '-' + error.message));
        } else {
            // Sign In Form
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .catch((error) => setErrorMessage(error.code + '-' + error.message));
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-red-600 flex items-center justify-center">
            <img className="w-full h-screen p-0 m-0 absolute" src={APP_BACKGROUND} alt="Not Rendered"/>
            <div className="bg-orange-200 p-6 rounded-2xl shadow-2xl w-[600px] h-[450px] opacity-90 animate-fadeIn">
                <h1 className="text-black text-2xl font-bold mb-6 text-center">
                    {isSignInForm ? 'Login Page' : 'Sign Up Page'}
                </h1>
                <form onSubmit={(e) => { e.preventDefault(); }} className=" space-y-4">
                    {!isSignInForm && (
                        <input
                            ref={name}
                            type="text"
                            placeholder="Name"
                            className="p-4 w-full border-2 border-transparent focus:border-sky-500 focus:ring-2 focus:ring-sky-500 rounded-lg bg-gray-900 text-white placeholder-gray-400 transition-colors duration-300"
                        />
                    )}
                    <input
                        ref={email}
                        type="email"
                        placeholder="Email"
                        className="p-4 w-full border-2 border-transparent focus:border-sky-500 focus:ring-2 focus:ring-sky-500 rounded-lg bg-gray-900 text-white placeholder-gray-400 transition-colors duration-300"
                    />
                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="p-4 w-full border-2 border-transparent focus:border-sky-500 focus:ring-2 focus:ring-sky-500 rounded-lg bg-gray-900 text-white placeholder-gray-400 transition-colors duration-300"
                    />
                    <p className="text-white font-bold text-lg py-2">{errorMessage}</p>
                    <button
                        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-lg hover:animate-bounce transition-all duration-300"
                        onClick={handleClick}
                    >
                        {isSignInForm ? 'Sign In' : 'Sign Up'}
                    </button>
                    <p
                        className="cursor-pointer hover:translate-x-1 text-black hover:text-red-400 transition-transform duration-300 ease-in-out"
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm ? 'New to BiteBuddy? Sign Up' : 'Already a User? Sign In Now'}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
