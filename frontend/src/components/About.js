import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="min-h-screen mt-[100px] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 text-white p-8">
        <div className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-md text-white p-10 rounded-2xl shadow-2xl transition-opacity duration-1000 ease-out animate-fade-in border border-white/20">
          <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x">
            Hi, I’m Ankur Verma
          </h1>

          <motion.p
            className="mb-4 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            I’m a <span className="text-yellow-300 font-semibold">Associate Software Developer</span> with a passion for
            crafting seamless user experiences.
          </motion.p>

          <motion.p
            className="mb-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            I graduated from LPU with a degree in Mechanical Engineering. I’ve worked on projects using React,
            Node.js, and more. My tech journey began with a campus event app.
          </motion.p>

          <motion.p
            className="mb-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            My expertise lies in JavaScript frameworks and <span className="text-teal-300 font-semibold">UI/UX design</span>.
            I build intuitive interfaces with a focus on performance and accessibility.
          </motion.p>

          <motion.p
            className="mb-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            When I’m not coding, I enjoy hiking, playing guitar, and exploring emerging tech.
          </motion.p>

          <motion.div
            className="text-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xl font-semibold mb-2">📬 Get in touch:</p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Mail className="text-yellow-400" />
                <a href="mailto:vankur017@gmail.com" className="text-blue-300 hover:underline">
                  vankur017@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Linkedin className="text-sky-400" />
                <a href="https://www.linkedin.com/in/ankur-verma-6b80b416a/" target="_blank" rel="noreferrer" className="text-sky-300 hover:underline">
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-xl font-semibold mb-2">🚀 Projects:</p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <Github className="text-gray-300" />
                <a href="https://github.com/vankur017" target="_blank" rel="noreferrer" className="text-white hover:underline">
                  GitHub Portfolio
                </a>
              </li>
              <li className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <img src="https://api.iconify.design/ph/fork-knife.svg" alt="bite" className="w-5 h-5 text-pink-300" />
                <a href="https://bite-buddy-food.netlify.app/" target="_blank" rel="noreferrer" className="text-pink-300 hover:underline">
                  Bite Buddy Food App 🍽️
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
