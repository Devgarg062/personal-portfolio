import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef([]);
  const taglineText = "Backend | Cloud | AI developer";
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);

  const handleResumeDownload = () => {
    const resumeUrl = "/CV.Dev.pdf";
    window.open(resumeUrl, "_blank");
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setMessageStatus(null); 
    const API_ENDPOINT = '/api/send-email';

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessageStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); 
      } else {
        const errorData = await response.json();
        setMessageStatus('error');
        console.error('Error submitting form:', errorData);
      }
    } catch (error) {
      setMessageStatus('error');
      console.error('Network error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    if (isTyping) {
      let i = 0;
      const typingInterval = setInterval(() => {
        setDisplayedTagline(taglineText.substring(0, i));
        i++;
        if (i > taglineText.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [isTyping, taglineText]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const skills = [
    { name: "C/C++", level: 90 },
    { name: "Python", level: 95 },
    { name: "AWS/GCP/Azure", level: 88 },
    { name: "FastAPI", level: 92 },
    { name: "LangChain", level: 85 },
    { name: "Linux/Git", level: 93 }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gradient-to-br from-gray-900 to-black text-gray-100" : "bg-gray-50 text-gray-900"} font-sans transition-colors duration-500`}>
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 w-full z-50 ${darkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            >
              Dev Garg
            </motion.div>

            <div className="hidden md:flex space-x-1">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm capitalize ${
                    activeSection === item
                      ? darkMode
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-800"
                      : darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
              {/* Dark mode toggle in nav */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full text-sm ${
                  darkMode ? "text-yellow-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.45 4.75a.75.75 0 001.06-1.06L15 13.19V11a.75.75 0 00-1.5 0v2.19l-1.06 1.06a.75.75 0 000 1.06zM3.75 10a.75.75 0 01.75-.75h2.19l1.06-1.06a.75.75 0 011.06 1.06L8.19 10h2.19a.75.75 0 010 1.5h-2.19l-1.06 1.06a.75.75 0 01-1.06-1.06L3.75 10zM10 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4 6a.75.75 0 01.75-.75h1.06l1.06-1.06a.75.75 0 011.06 1.06L6.19 6H4a.75.75 0 01-.75-.75zm9.25 0a.75.75 0 01.75-.75h2.19l1.06-1.06a.75.75 0 011.06 1.06L16.19 6H14a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 right-4 z-40 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl p-4 md:hidden`}
          >
            <div className="flex flex-col gap-2">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-full text-sm capitalize text-left ${
                    activeSection === item
                      ? darkMode
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-800"
                      : darkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section
        id="home"
        ref={(el) => (sectionsRef.current[0] = el)}
        className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden"
      >
        {/* Animated background particles - ENHANCED */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.random() * 400 - 200, 0],
                y: [0, Math.random() * 400 - 200, 0],
                opacity: [0.05, 0.25, 0.05],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className={`absolute rounded-full ${
                darkMode ? "bg-purple-500/10" : "bg-purple-300/15"
              } mix-blend-screen`}
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: `blur(${Math.random() * 1.5}px)`
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto z-10"
        >
          {/* "Hi, I'm Dev Garg." text - Reverted to gradient */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Hi, I'm Dev Garg</span>
          </motion.h1>

          {/* Tagline with Typewriter effect */}
          <motion.p
            key={displayedTagline}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`text-xl md:text-2xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            {displayedTagline}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="inline-block ml-1"
            >
              |
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ y: -3, scale: 1.02, boxShadow: "0 8px 20px rgba(128, 0, 128, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full font-semibold text-lg shadow-lg
                ${darkMode ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-purple-500 hover:bg-purple-600 text-white"}
                transition-all duration-200 ease-in-out`}
            >
              Connect with me
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        ref={(el) => (sectionsRef.current[1] = el)}
        className={`py-20 px-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/3"
            >
              <div className={`relative rounded-2xl overflow-hidden shadow-xl ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                <div className="aspect-square w-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-8xl">
                  👨‍💻
                </div>
                <div className="p-6">
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href="https://github.com/Devgarg062"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className={`p-2 rounded-full ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                      <span className="text-xl">🐙</span>
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/devgarg0203"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className={`p-2 rounded-full ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                      <span className="text-xl">💼</span>
                    </motion.a>
                    <motion.a
                      href="mailto:devgarg062@gmail.com"
                      whileHover={{ y: -3 }}
                      className={`p-2 rounded-full ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                      <span className="text-xl">📧</span>
                    </motion.a>
                    <motion.a
                      href="tel:8447052600"
                      whileHover={{ y: -3 }}
                      className={`p-2 rounded-full ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                      <span className="text-xl">📱</span>
                    </motion.a>
                  </div>
                  {/*resume button in about section */}
                  <motion.button
                    onClick={handleResumeDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-4 w-full py-2 rounded-lg font-medium ${
                      darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"
                    } text-white`}
                  >
                    Download Resume
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-2/3"
            >
              <h3 className="text-2xl font-semibold mb-4">Summary</h3>
              <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                B.Tech Computer Science student with hands-on experience in cloud-native development, backend engineering, and AI integration. Built scalable systems using AWS (Lambda, Kinesis), FastAPI, and NLP tools like spaCy. Passionate about solving real-world problems with efficient, clean, and modular code.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                    <p className="font-medium">B.Tech Computer Science</p>
                    <p className="text-sm">Manipal University Jaipur (2023-2027)</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Focus Areas</h4>
                  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Backend Development</li>
                      <li>Cloud Architecture</li>
                      <li>AI/ML Integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        ref={(el) => (sectionsRef.current[2] = el)}
        className={`py-20 px-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl shadow-md text-center ${
                  darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="text-3xl mb-2">
                  {["💻", "🐍", "☁️", "🚀", "🔗", "🐧"][index]}
                </div>
                <h3 className="font-medium">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        ref={(el) => (sectionsRef.current[3] = el)}
        className={`py-20 px-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Real-Time Fraud Detection System",
                description: "Designed a serverless system using Kinesis, Lambda, DynamoDB, and SNS to detect suspicious transactions in real-time. Optimized for AWS Free Tier with minimal latency and high scalability.",
                tags: ["AWS", "Lambda", "Kinesis", "DynamoDB"]
              },
              {
                title: "AWS Cloud Optimization Tool",
                description: "Developed a cloud cost optimization system using EC2, S3, and Lambda monitoring. Integrated AWS Cost Explorer and CloudWatch to track usage, automate scaling, and reduce expenses.",
                tags: ["AWS", "CloudWatch", "Cost Optimization"]
              },
              {
                title: "Legal Document Analyzer",
                description: "Built a FastAPI app to analyze legal documents by extracting text from PDFs and Word files. Applied NLP using spaCy for NER, keyword extraction, and frequency analysis.",
                tags: ["FastAPI", "NLP", "spaCy"]
              },
              {
                title: "HealthConnect Telemedicine Platform",
                description: "Developed a secure, full-stack telemedicine platform with FastAPI, real-time WebSocket chat, and Jitsi video calls. Built dynamic dashboards with JWT-based auth.",
                tags: ["FastAPI", "WebSockets", "Jitsi"]
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`rounded-xl overflow-hidden shadow-lg ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className={`h-48 flex items-center justify-center text-6xl ${
                  darkMode ? "bg-gray-600" : "bg-gray-200"
                }`}>
                  {["🔍", "💰", "📄", "🏥"][index]}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-xs px-3 py-1 rounded-full ${
                          darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        id="experience"
        ref={(el) => (sectionsRef.current[4] = el)}
        className={`py-20 px-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div
              className={`absolute left-1/2 w-0.5 h-full -translate-x-1/2 ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>

            {[
              {
                title: "Intern – NanoBios Lab, IIT Bombay",
                period: "May 2025 - June 2025",
                description: [
                  "Worked on experimental systems related to computer vision and automated form data processing",
                  "Built independent modules focusing on data extraction, backend logic, and automated workflows",
                  "Gained exposure to research-driven development practices and early-stage prototyping"
                ],
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-8 ${index % 2 === 0 ? "pr-8 text-middle" : "pl-8"}`}
              >
                <div
                  className={`absolute top-0 left-1/2 w-8 h-8 rounded-full flex items-center justify-center -translate-x-1/2 ${
                    darkMode ? "bg-purple-600" : "bg-purple-400"
                  }`}
                >
                  {/* Icon for experience - you can replace with specific ones */}
                  {index === 0 && "🔬"}
                </div>
                <div
                  className={`p-6 rounded-lg shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-gray-100"
                  } ${index % 2 === 0 ? "mr-8" : "ml-8"}`}
                >
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className={`mb-3 text-sm ${
                    darkMode ? "text-purple-300" : "text-purple-600"
                  }`}>
                    {exp.period}
                  </p>
                  <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        ref={(el) => (sectionsRef.current[5] = el)}
        className={`py-20 px-4 text-center ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="relative inline-block">
                <span className="relative z-10">Let's Connect</span>
                <span className={`absolute bottom-1 left-0 w-full h-2 ${darkMode ? "bg-purple-500/50" : "bg-purple-300/50"} -z-0`}></span>
              </span>
            </h2>

            <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Interested in working together or have questions about my work? Feel free to reach out through any of these channels.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { icon: "�", label: "Email", link: "mailto:devgarg062@gmail.com", text: "devgarg062@gmail.com" },
                { icon: "💼", label: "LinkedIn", link: "https://linkedin.com/in/devgarg0203", text: "devgarg0203" },
                { icon: "🐙", label: "GitHub", link: "https://github.com/Devgarg062", text: "Devgarg062" },
                { icon: "📱", label: "Phone", link: "tel:8447052600", text: "+91 8447052600" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.action ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onClick={item.action ? (e) => { e.preventDefault(); item.action(); } : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"} shadow-md`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{item.text}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`max-w-xl mx-auto p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-700" : "bg-white"}`}
            >
              <h3 className="text-xl font-semibold mb-4">Send me a message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {/* Message Status Feedback */}
                <AnimatePresence>
                  {messageStatus === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-green-500 mt-4"
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.p>
                  )}
                  {messageStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-red-500 mt-4"
                    >
                      Failed to send message. Please try again later or contact me directly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-8 ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">© {new Date().getFullYear()} Dev Garg. All rights reserved.</p>
          <p className="text-sm">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;