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
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const [signIn, setSignIn] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.mycart.items);
  const { loggedInUser } = useContext(UserContext);
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

        if (window.location.pathname === "/") {
          navigate("/browse");
        }
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

  return (
    signIn === false && (
      <>
        <motion.div
          className="fixed top-0 left-0 w-full bg-opacity-90 backdrop-blur-lg shadow-lg z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
            {/* Logo */}
            <Link to="/browse" className="flex items-center space-x-3">
              <motion.img
                src={LOGO_URL}
                alt="Logo"
                className="w-14 h-14 rounded-full object-cover shadow-md"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <span className="text-2xl font-extrabold text-gray-900">BiteBuddy</span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex space-x-6 font-semibold text-lg">
              {["browse", "about", "contact", "store"].map((route) => (
                <motion.li key={route} whileHover={{ scale: 1.1 }}>
                  <Link to={`/${route}`} className="hover:text-green-600 transition">
                    {route.charAt(0).toUpperCase() + route.slice(1)}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Right Side (Cart + Status + Logout) */}
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/cart" className="relative">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
                  <path d="M6.3 5H21L19 12H7.38M20 16H8L6 3H3M9 20a1 1 0 11-2 0 1 1 0 012 0zm11 0a1 1 0 11-2 0 1 1 0 012 0z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </Link>
             
              <span className="text-lg font-medium">{user?.displayName}</span>
              <motion.button
                className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                whileHover={{ scale: 1.1 }}
                onClick={handleSignout}
              >
                Logout
              </motion.button>
            </div>

            {/* Mobile Burger Icon */}
            <button
              className="md:hidden block text-black focus:outline-none"
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
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6 gap-6"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="self-end text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  ✕
                </button>
                {["browse", "about", "contact", "store"].map((route) => (
                  <Link
                    key={route}
                    to={`/${route}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-semibold hover:text-green-600 transition"
                  >
                    {route.charAt(0).toUpperCase() + route.slice(1)}
                  </Link>
                ))}
                <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center">
                  🛒 Cart ({cartItems.length})
                </Link>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-lg w-max">
                  {onlineStatus ? "✅ Online" : "🔴 Offline"}
                </span>
                <span className="text-lg font-medium">{user?.displayName}</span>
                <button
                  onClick={() => {
                    handleSignout();
                    setMenuOpen(false);
                  }}
                  className="mt-auto px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
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
