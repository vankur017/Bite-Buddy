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
      <div>
       
      </div>
      <div className="about-section">
        <p>
          Hi, I’m Ankur Verma, a Frontend Developer with a passion for crafting
          seamless user experiences.
        </p>
        <p>
          I graduated from Lovely Professional University with a degree in Mechanical
          Engineering. Over the past one years, I've worked on numerous projects
          that involved React, Node.js, and other modern web technologies. My
          journey in tech began when I developed a small app in college that
          helped organize campus events.
        </p>
        <p>
          My expertise lies in JavaScript frameworks and UI/UX design. I enjoy
          building intuitive interfaces and optimizing web performance. I'm
          passionate about creating accessible web applications and believe in
          continuous learning and adaptation.
        </p>
        <p>
          When I'm not coding, I enjoy hiking, playing guitar, and love
          exploring new technologies.
        </p>
        <p>
          Feel free to reach out to me at :-
          <ul>
              <li><a href="mailto:vankur017@gmail.com">Email</a></li> 
              <li><a href="https://www.linkedin.com/in/ankur-verma-6b80b416a/"> LinkedIn</a></li>
              <li><a href="https://github.com/vankur017">GitHub</a></li>
          </ul>. I'm always open
          to discussing new projects or ideas!
        </p>
      </div>
    </motion.div>
  );
};

export default About;
