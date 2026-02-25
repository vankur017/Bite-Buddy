import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background dark:bg-dark-950 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Meet the Developer</span>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
            Crafting Digital <br />
            <span className="gradient-text">Experiences.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            I'm Ankur Verma, a Frontend Developer with 2.5+ years of experience building fast, scalable, and user-centric web applications using React, Redux, and modern JavaScript.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-4">
          {[{
            icon: <Mail className="text-orange-500" />,
            label: "Email Me",
            value: "vankur017@gmail.com",
            link: "mailto:vankur017@gmail.com"
          }, {
            icon: <Linkedin className="text-blue-500" />,
            label: "LinkedIn",
            value: "Ankur Verma",
            link: "https://www.linkedin.com/in/ankur-verma-6b80b416a/"
          }, {
            icon: <Github className="text-gray-800 dark:text-gray-200" />,
            label: "GitHub",
            value: "@vankur017",
            link: "https://github.com/vankur017"
          }].map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass group p-8 rounded-[2.5rem] flex flex-col items-center hover:shadow-2xl hover:shadow-orange-500/10 transition-all border-white/40"
            >
              <div className="w-16 h-16 bg-white dark:bg-dark-800 rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</span>
              <span className="text-gray-800 dark:text-gray-100 font-black text-sm">{item.value}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass rounded-[3rem] p-12 lg:p-20 text-left relative overflow-hidden shadow-2xl border-white/40"
        >
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight italic">
              "Building scalable architectures, optimizing performance, and delivering enterprise-grade frontend systems that handle real-world complexity."
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed mb-10">
              Currently working at DXC Technology as an Analyst I Software Engineer, I design and deliver reusable, high-performance UI components including advanced DataGrid systems with multi-field filtering, debounced search, and efficient large-scale data handling.
              I specialize in building reusable component architectures, creating custom hooks to centralize API interactions, implementing role-based access control (RBAC), and optimizing applications using code splitting, lazy loading, and memoization techniques.
              <br /><br />
              I have hands-on experience with AWS, Firebase, Serverless architecture, Fortify security remediation, and JMeter performance testing for high-traffic systems. My background in Mechanical Engineering from Lovely Professional University shaped my analytical thinking, which I now apply to designing reliable and scalable frontend systems.
            </p>
            <div className="flex flex-wrap gap-4">
              {['React', 'Redux', 'JavaScript', 'AWS', 'Firebase', 'TailwindCSS', 'Framer Motion'].map(tag => (
                <span key={tag} className="px-5 py-2 rounded-xl bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest border border-orange-200 dark:border-orange-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -ml-48 -mb-48" />
        </motion.div>
      </div>
    </div>
  );
};

export default About;