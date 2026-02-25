import { ShoppingBag, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800 pt-16 pb-8">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="text-white" size={18} />
                            </div>
                            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
                                Bite<span className="text-orange-500">Buddy</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
                            Delivering happiness to your doorstep, one bite at a time. The most premium food delivery experience.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/browse" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 text-sm font-bold transition-colors">Restaurants</Link></li>
                            <li><Link to="/store" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 text-sm font-bold transition-colors">Grocery Store</Link></li>
                            <li><Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 text-sm font-bold transition-colors">Our Story</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 text-sm font-bold transition-colors">Help Center</Link></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 text-sm font-bold transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 text-sm font-bold transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white dark:bg-dark-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-orange-500 shadow-sm transition-all border border-gray-100 dark:border-dark-700">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white dark:bg-dark-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-400 shadow-sm transition-all border border-gray-100 dark:border-dark-700">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white dark:bg-dark-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-all border border-gray-100 dark:border-dark-700">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        © 2024 BiteBuddy. All rights reserved.
                    </p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        Made with <span className="text-red-500">❤️</span> by Ankur Verma
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
