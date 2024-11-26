import { LOGO_URL } from "/utils/constants";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "/utils/useOnlineStatus";
import UserContext from "../../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../../utils/userSlice";
import { auth } from "../../utils/firebase";
import { clearAllItem } from "../../utils/cartSlice";

const Header = () => {

  const onlinestatus = useOnlineStatus();
  const [signIn, setSignIn] = useState(true)
  
  const dispatch = useDispatch()
  const user = useSelector((userstore)=>userstore.user)
  //console.log(user);
  
  const navigate = useNavigate()
 
  
  const handleSignout = ()=>{
    signOut(auth)
    .then(() => {
      dispatch(clearAllItem())
      dispatch(removeUser());
      navigate('/')
      setSignIn(true)
    })
    .catch((error) => {
      // An error happened.
      navigate("/error")
    });
}
   
  const {loggedInUser} = useContext(UserContext);

  // console.log(loggedInUser);
  
  //Subscribing to the redux Store (appStore) Selector
useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, (user)=>{
    if(user){
      const {uid, email, displayName} = user;
        dispatch(addUser({
          uid : uid,
          email : email,
          displayName : displayName
          
        }))

        navigate("/browse")
        setSignIn(false)
    }
    else {
      // User is signed out
      // ...
      dispatch(removeUser());
      navigate('/')
  
    }
  });

  return ()=> unsubscribe()
}, [])

  // const userLoggedIn = useSelector((userLogin)=>userLogin.user)
  // console.log(userLoggedIn);
  // const myuser = useSelector((userlogin)=> userlogin.user)
  // console.log(myuser.displayName);
  
  const cartItems = useSelector((store)=>store.mycart.items)
  //console.log(cartItems);
  // for(let i=0; i<cartItems.length; i++){
  //   console.log(cartItems[i].card.info.name);
    
  // }
  

  return (
  !signIn &&
      <div className="p-0 m-0 flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
        <div className="justify-center">
        
            <Link to="/"><img className="w-40 p-10" src={LOGO_URL} /></Link>
            <li className="list-none">BiteBuddy.com</li>
        </div>
        <div className="flex items-center justify-center">
          <ul className= "flex p-4 m-4 space-x-5 font-bold ">
            <li className="status">Online Status {onlinestatus ? "✅" : "🔴"}</li>
            
            <li className="bg-green-50 hover:bg-slate-100">
              <Link to="/browse">Home</Link>
            </li>
            <li className="bg-green-50 hover:bg-slate-100">
              <Link to="/about">About Us</Link>
            </li>
            <li className="bg-green-50 hover:bg-slate-100">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li id="cart-logo" className="cursor-pointer flex">

              <Link to="/cart">  
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="40px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                  d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  />
                  </svg>
              </Link>
               ({
               
               cartItems.length} items) 
            
            </li>
        { user &&
            <li className="bg-green-50 hover:bg-slate-100">
               {user.displayName }
            </li>
            }

          </ul>
          <button 
              className="bg-red-400 p-3 rounded-lg"
              onClick={handleSignout}
            >
              Logout
            </button>
        </div>
      
      </div>
     
  );
};

export default Header;
