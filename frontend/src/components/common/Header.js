import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserContext from "app/context/UserContext.js";
import {
  ShoppingCart,
  Menu,
  X,
  Moon,
  Sun,
  ShoppingBag,
  Search,
  User,
  Info,
  PhoneCall
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const cartItems = useSelector((store) => store.mycart.items);
  const storeCartItems = useSelector((store) => store.storeCart.items);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Browse", path: "/browse", icon: <Search size={18} /> },
    { name: "Store", path: "/store", icon: <ShoppingBag size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> },
    { name: "Contact", path: "/contact", icon: <PhoneCall size={18} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-dark-800 transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
            Bite<span className="text-orange-500">Buddy</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center gap-2 text-sm font-black text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors uppercase tracking-widest"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-gray-50 dark:bg-dark-900 text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-500 transition-all"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/store/cart" className="relative p-3 rounded-2xl bg-gray-50 dark:bg-dark-900 text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-500 transition-all">
            <ShoppingBag size={20} />
            {storeCartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-dark-950">
                {storeCartItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-3 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-orange-600 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-orange-500">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button
            className="lg:hidden p-3 rounded-2xl bg-gray-50 dark:bg-dark-900 text-gray-500 dark:text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t border-gray-100 dark:border-dark-800 bg-white dark:bg-dark-950 p-6 space-y-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white font-black uppercase tracking-widest text-sm"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
