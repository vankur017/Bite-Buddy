import { LOGO_URL } from "../../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((store) => store.mycart.items);
  const storeCartItems = useSelector((store) => store.storeCart.items);

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  const navRoutes = ["browse", "about", "contact", "store"];

  return (
    <>
      {/* Desktop Header */}
      <motion.div
        className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-6">
          {/* Logo */}
          <Link to="/browse" className="flex items-center space-x-3">
            <img
              src={LOGO_URL}
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-blue-400"
            />
            <span className="text-2xl font-extrabold text-blue-600 drop-shadow-sm">
              BiteBuddy
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex space-x-6 font-semibold text-base text-gray-700">
            {navRoutes.map((route) => (
              <li key={route}>
                <Link
                  to={`/${route}`}
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side — Cart Icons */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Food Cart */}
            <Link to="/cart" className="relative group">
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700 group-hover:text-orange-500 transition-colors"
              >
                <path d="M6.3 5H21L19 12H7.38M20 16H8L6 3H3M9 20a1 1 0 11-2 0 1 1 0 012 0zm11 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Store Cart */}
            <Link to="/store/cart" className="relative group">
              <span className="text-2xl group-hover:scale-110 inline-block transition-transform">
                🛍️
              </span>
              {storeCartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {storeCartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden block text-gray-800 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-50 flex flex-col p-6 gap-5 text-gray-800"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              transition={{ duration: 0.28 }}
            >
              <button
                className="self-end text-gray-500 hover:text-gray-800 text-2xl leading-none"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>

              {navRoutes.map((route) => (
                <Link
                  key={route}
                  to={`/${route}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-semibold hover:text-orange-500 transition-colors"
                >
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </Link>
              ))}

              <hr className="border-gray-200" />

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 hover:text-orange-500 transition-colors"
              >
                🛒 Food Cart
                {cartItems.length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/store/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 hover:text-orange-500 transition-colors"
              >
                🛍️ Store Cart
                {storeCartItems.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {storeCartItems.length}
                  </span>
                )}
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
