import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu as FiMenu, X as FiX, Sun as FiSun, Moon as FiMoon, Globe as FiGlobe } from 'react-feather';
import { Link } from 'react-scroll';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import logo from '../../assets/images/logo.png';

// Custom Link component with active indicator
const NavLink = ({ to, children, darkMode, scrolled, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <Link
      activeClass="active"
      to={to}
      spy={true}
      smooth={true}
      offset={-100}
      duration={800}
      onSetActive={() => setIsActive(true)}
      onSetInactive={() => setIsActive(false)}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
        scrolled 
          ? darkMode 
            ? isActive 
              ? 'text-white' 
              : 'text-gray-300 hover:text-white' 
            : isActive 
              ? 'text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          : 'text-white hover:text-opacity-80'
      }`}
      onClick={onClick}
    >
      {children}
      <motion.span 
        className={`absolute bottom-0 left-0 w-full h-0.5 ${
          scrolled 
            ? darkMode ? 'bg-white' : 'bg-primary-600' 
            : 'bg-white'
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </Link>
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
      <motion.div 
        className="h-full bg-primary-500"
        style={{ width }}
      />
    </div>
  );
};
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangDropdown(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: t('navigation.about'), to: 'about' },
    { name: t('navigation.services'), to: 'services' },
    { name: t('navigation.projects'), to: 'projects' },
    { name: t('navigation.contact'), to: 'contact' },
  ];

  // RTL support
  const isRTL = i18n.language === 'ar';
  const directionClass = isRTL ? 'rtl' : 'ltr';

  // Navbar background style based on scroll state
  const navbarStyle = {
    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    color: scrolled ? 'inherit' : '#ffffff',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    boxShadow: scrolled ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
    transition: 'all 0.3s ease-in-out',
    borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'
  };

  // Dark mode adjustments
  if (darkMode) {
    navbarStyle.backgroundColor = scrolled ? 'rgba(17, 24, 39, 0.95)' : 'transparent';
    navbarStyle.borderBottom = scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none';
  }

  return (
    <>
      <ScrollProgress />
      <nav 
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="hero" 
                smooth={true} 
                duration={800}
                offset={-100}
                className="flex items-center group"
              >
                <motion.img
                  className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                  src={logo}
                  alt="Logo"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex items-center space-x-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navLinks.map((link) => (
                <div key={link.to} className="relative group">
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className={`relative px-4 py-2.5 ${scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-white/80'} dark:text-gray-200 font-medium transition-all duration-300 cursor-pointer group dark:hover:text-primary-400`}
                    activeClass="text-primary-600 dark:text-primary-400"
                    spy={true}
                    offset={-80}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-500 dark:bg-primary-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                  </Link>
                </div>
              ))}
              
              <div className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
                {/* Language Selector - Desktop */}
                <div className="relative group">
                  <button 
                    onClick={() => setShowLangDropdown(!showLangDropdown)}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-all duration-300 hover:shadow-sm"
                  >
                    <FiGlobe className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-primary-500 transition-colors" />
                    <span className="uppercase text-sm font-medium">{i18n.language}</span>
                  </button>
                  <AnimatePresence>
                    {showLangDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-100 dark:border-gray-700`}
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left px-4 py-2 text-sm ${
                              i18n.language === lang.code
                                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 hover:shadow-sm"
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? (
                    <FiSun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <FiMoon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="whitespace-nowrap px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {t('navigation.getStarted', 'Get Started')}
                </Link>
              </div>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div 
              className="md:hidden z-50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                whileTap={{ scale: 0.95 }}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FiX 
                    className={`h-6 w-6 ${scrolled && !darkMode ? 'text-gray-900' : 'text-white'}`} 
                    aria-hidden="true" 
                  />
                ) : (
                  <FiMenu 
                    className={`h-6 w-6 ${scrolled && !darkMode ? 'text-gray-900' : 'text-white'}`} 
                    aria-hidden="true" 
                  />
                )}
              </motion.button>
            </motion.div>    
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={500}
                      className="block py-4 px-2 text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Language and Theme Toggle - Mobile */}
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between px-2 py-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('language', 'Language')}
                    </span>
                    <div className="flex space-x-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`px-3 py-1 text-xs rounded-md transition-colors ${
                            i18n.language === lang.code
                              ? 'bg-primary-100 dark:bg-primary-800/80 text-primary-700 dark:text-primary-100 font-medium shadow-sm dark:shadow-primary-500/20'
                              : 'bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/90'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between px-2 py-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t('theme', 'Theme')}
                    </span>
                    <button
                      onClick={toggleDarkMode}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      {darkMode ? (
                        <FiSun className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <FiMoon className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full text-center py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {t('navigation.getStarted', 'Get Started')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      smooth={true}
      duration={800}
      offset={-100}
      className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
