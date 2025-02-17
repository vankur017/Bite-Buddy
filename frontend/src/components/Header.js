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
import { motion } from "framer-motion";

const Header = () => {
  const onlinestatus = useOnlineStatus();
  const [signIn, setSignIn] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((userstore) => userstore.user);
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.mycart.items);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearAllItem());
        dispatch(removeUser());
        navigate("/");
        setSignIn(true);
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));

        if (window.location.pathname === "/") {
          navigate("/browse");
          setSignIn(false);
        }
        setSignIn(false);
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    signIn === false && (
      <motion.div
        className="fixed top-0 left-0 w-full bg-opacity-90 backdrop-blur-lg shadow-lg z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo & Brand Name */}
          <Link to="/browse" className="flex items-center space-x-3">
            <motion.img
              src={LOGO_URL}
              alt="BiteBuddy Logo"
              className="w-16 h-16 rounded-full object-cover shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <span className="text-2xl font-extrabold text-gray-900">BiteBuddy</span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6 font-semibold text-lg">
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/browse" className="hover:text-green-600 transition">Home</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/about" className="hover:text-green-600 transition">About</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/contact" className="hover:text-green-600 transition">Contact</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/store" className="hover:text-green-600 transition">Store</Link>
            </motion.li>
          </ul>

          {/* Cart & Status */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Link to="/cart" className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
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
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </Link>
            </div>

            {/* Online Status */}
            <span className="text-sm bg-gray-200 px-3 py-1 rounded-lg">
              {onlinestatus ? "✅ Online" : "🔴 Offline"}
            </span>

            {/* User & Logout */}
            {user && <span className="text-lg font-medium">{user.displayName}</span>}
            <motion.button
              className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              whileHover={{ scale: 1.1 }}
              onClick={handleSignout}
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Header;
