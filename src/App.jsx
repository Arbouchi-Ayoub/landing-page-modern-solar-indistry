import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import ProductDescription from './components/sections/ProductDescription';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import CTA from './components/sections/CTA';
import ContactForm from './components/sections/ContactForm';
import ProductGallery from './components/sections/ProductGallery';
import Footer from './components/layout/Footer';
import FloatingContactForm from './components/common/FloatingContactForm';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const { i18n } = useTranslation();

  // Apply theme class to document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        setDarkMode(mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Set document direction and language based on i18n
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <AnimatePresence mode="wait">
        <motion.div
          key={i18n.language}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="flex-grow"
        >
          <main>
            <Hero />
            <ProductDescription />
            <Features />
            <ProductGallery />
            <Testimonials />
            <CTA />
            <ContactForm />
          </main>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <FloatingContactForm />
    </div>
  );
}

export default App;
