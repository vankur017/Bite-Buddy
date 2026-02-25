import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import Button from "app/components/common/Button";

const Contact = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black mb-6 tracking-tight">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-[2.5rem] border-white/20">
              <h2 className="text-2xl font-black mb-8 text-gray-900 dark:text-white">Contact Info</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                    <p className="text-gray-900 dark:text-white font-bold">support@bitebuddy.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Call Us</p>
                    <p className="text-gray-900 dark:text-white font-bold">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Visit Us</p>
                    <p className="text-gray-900 dark:text-white font-bold">123 Foodie Blvd, Silicon Valley</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 rounded-[2.5rem] border-white/20"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Email</label>
                  <input type="email" className="w-full px-6 py-4 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Subject</label>
                <input type="text" className="w-full px-6 py-4 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Message</label>
                <textarea rows="4" className="w-full px-6 py-4 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 focus:ring-2 focus:ring-orange-500 transition-all font-bold" placeholder="Your message here..."></textarea>
              </div>
              <Button size="lg" className="w-full py-5 rounded-2xl shadow-xl shadow-orange-500/10">
                Send Message
                <Send className="ml-2" size={18} />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
