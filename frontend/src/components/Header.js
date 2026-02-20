import { LOGO_URL } from "../../utils/constants";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {useOnlineStatus} from "../../utils/useOnlineStatus.js";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../../utils/userSlice";
import { auth } from "../../utils/firebase";
import { clearAllItem } from "../../utils/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  // const onlineStatus = useOnlineStatus();
  const [signIn, setSignIn] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.mycart.items);
  const storeCartItems = useSelector((store) => store.storeCart.items);
  // const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearAllItem());
        dispatch(removeUser());
        navigate("/");
        setSignIn(true);
      })
      .catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));

        if (window.location.pathname === "/") navigate("/browse");
        setSignIn(false);
      } else {
        dispatch(removeUser());

        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  if (!user) {
    return <></>
  }

  return (
    signIn === false && (
      <>
        {/* Desktop Header */}
        <motion.div
          className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
            {/* Logo */}
            <Link to="/browse" className="flex items-center space-x-3">
              <motion.img
                src={LOGO_URL}
                alt="Logo"
                className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-blue-400"

                transition={{ type: "spring", stiffness: 200 }}
              />
              <span className="text-2xl font-extrabold text-blue-600 drop-shadow-md">
                BiteBuddy
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex space-x-6 font-semibold text-lg text-gray-700">
              {["browse", "about", "contact", "store"].map((route) => (
                <motion.li key={route} >
                  <Link
                    to={`/${route}`}
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    {route.charAt(0).toUpperCase() + route.slice(1)}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Right Side (Cart + Status + Logout) */}
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/cart" className="relative">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6.3 5H21L19 12H7.38M20 16H8L6 3H3M9 20a1 1 0 11-2 0 1 1 0 012 0zm11 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </Link>

              {/* Store Cart icon */}
              <Link to="/store/cart" className="relative">
                <span className="text-2xl">🛍️</span>
                {storeCartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {storeCartItems.length}
                  </span>
                )}
              </Link>

              <span className="text-lg font-medium text-gray-800">
                {user?.displayName || loggedInUser}
              </span>
              <button
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md"


                onClick={handleSignout}
              >
                Logout
              </button>
            </div>

            {/* Mobile Burger Icon */}
            <button
              className="md:hidden block text-gray-800 focus:outline-none"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Mobile Slide Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6 gap-6 text-gray-800"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="self-end text-gray-800 text-2xl"
                  aria-label="Close menu"

                  onClick={() => setMenuOpen(false)}
                >
                  ✕
                </button>
                {["browse", "about", "contact", "store"].map((route) => (
                  <Link
                    key={route}
                    to={`/${route}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-semibold hover:text-blue-500 transition"
                  >
                    {route.charAt(0).toUpperCase() + route.slice(1)}
                  </Link>
                ))}
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-blue-500 transition"
                >
                  🛒 Food Cart ({cartItems.length})
                </Link>
                <Link
                  to="/store/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-orange-500 transition"
                >
                  🛍️ Store Cart ({storeCartItems.length})
                </Link>

                {/* {onlineStatus ? "✅ Online" : "🔴 Offline"} */}

                <span className="text-lg font-medium">{user?.displayName || loggedInUser}</span>
                <button
                  onClick={() => {
                    handleSignout();
                    setMenuOpen(false);
                  }}
                  className="mt-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow-md"
                >
                  Logout
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  );
};

export default Header;
