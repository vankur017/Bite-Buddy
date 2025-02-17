import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
  
      <div className="min-h-screen mt-[100px] flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 text-white p-8">
  <div className="max-w-4xl w-full bg-white text-gray-800 p-8 rounded-lg shadow-lg transition-opacity duration-1000 ease-out opacity-1 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 transition-transform transform hover:scale-105 duration-300 ease-in-out">Hi, I’m Ankur Verma</h1>
    <p className="mb-4 text-lg">
      I’m a Frontend Developer with a passion for crafting seamless user experiences.
    </p>
    <p className="mb-4 text-lg">
      I graduated from Lovely Professional University with a degree in Mechanical Engineering. Over the past year, I've worked on numerous projects that involved React, Node.js, and other modern web technologies. My journey in tech began when I developed a small app in college that helped organize campus events.
    </p>
    <p className="mb-4 text-lg">
      My expertise lies in JavaScript frameworks and UI/UX design. I enjoy building intuitive interfaces and optimizing web performance. I'm passionate about creating accessible web applications and believe in continuous learning and adaptation.
    </p>
    <p className="mb-4 text-lg">
      When I'm not coding, I enjoy hiking, playing guitar, and love exploring new technologies.
    </p>
    <p className="text-lg">
      Feel free to reach out to me at:
      <ul className="list-disc list-inside mt-2 text-left mx-auto max-w-xs flex space-x-24">
        <li><a href="mailto:vankur017@gmail.com" className="text-blue-500 hover:underline transition-transform transform hover:scale-105 duration-300 ease-in-out">Email</a></li>
        <li><a href="https://www.linkedin.com/in/ankur-verma-6b80b416a/" className="text-blue-500 hover:underline transition-transform transform hover:scale-105 duration-300 ease-in-out">LinkedIn</a></li>
      </ul>. I'm always open to discussing new projects or ideas!
    </p>
    <p className="text-lg">
      Checkout my some Personal Projects:
      <ul className="list-disc list-inside mt-2 text-left mx-auto max-w-xs flex space-x-24">
        <li><a href="https://github.com/vankur017" className="text-blue-500 hover:underline transition-transform transform hover:scale-105 duration-300 ease-in-out">GitHub</a></li>
        <li><a href="https://bite-buddy-food.netlify.app/" className="text-blue-500 hover:underline transition-transform transform hover:scale-105 duration-300 ease-in-out">Bite Buddy</a></li>
      </ul>
    </p>
  </div>
</div>



    </motion.div>
  );
};

export default About;
