import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-gray-200 px-6 py-16"
    >
      <motion.div
        className="max-w-3xl w-full bg-gradient-to-b from-zinc-900/90 to-black/90 rounded-2xl shadow-xl p-10 border border-zinc-800/50"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
          Hi, I’m Ankur Verma
        </h1>

        {/* Bio */}
        {[{
          text: 'I’m an Associate Software Developer with a passion for crafting seamless user experiences.',
          delay: 0.2
        },{
          text: 'I graduated from LPU with a degree in Mechanical Engineering and have worked with React, Node.js, and more.',
          delay: 0.4
        },{
          text: 'My expertise lies in JavaScript frameworks and UI/UX design, focusing on performance and accessibility.',
          delay: 0.6
        },{
          text: 'Outside of work, I enjoy hiking, playing guitar, and exploring emerging technologies.',
          delay: 0.8
        }].map((item, i) => (
          <motion.p
            key={i}
            className="mb-4 text-lg leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item.delay }}
          >
            {item.text}
          </motion.p>
        ))}

        {/* Contact Section */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xl font-semibold mb-3 text-purple-400">📬 Get in touch</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 hover:text-purple-300 transition-colors">
              <Mail size={20} />
              <a href="mailto:vankur017@gmail.com" className="hover:underline">vankur017@gmail.com</a>
            </li>
            <li className="flex items-center gap-3 hover:text-purple-300 transition-colors">
              <Linkedin size={20} />
              <a href="https://www.linkedin.com/in/ankur-verma-6b80b416a/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn Profile</a>
            </li>
          </ul>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-xl font-semibold mb-3 text-pink-400">🚀 Projects</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 hover:text-pink-300 transition-colors">
              <Github size={20} />
              <a href="https://github.com/vankur017" target="_blank" rel="noreferrer" className="hover:underline">GitHub Portfolio</a>
            </li>
            <li className="flex items-center gap-3 hover:text-pink-300 transition-colors">
              <img src="https://api.iconify.design/ph/fork-knife.svg" alt="bite" className="w-5 h-5" />
              <a href="https://bite-buddy-food.netlify.app/" target="_blank" rel="noreferrer" className="hover:underline">Bite Buddy Food App 🍽️</a>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
