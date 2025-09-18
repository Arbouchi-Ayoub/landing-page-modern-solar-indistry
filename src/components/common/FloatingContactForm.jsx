import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMessageSquare, FiMail, FiPhone, FiUser, FiChevronDown } from 'react-icons/fi';

const FloatingContactForm = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Marketing',
    'Consulting'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: ''
      });
      setIsOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-80 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{t('contact.title', 'Get in Touch')}</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-white/90 mt-1">
                {t('contact.subtitle', 'Our team will get back to you shortly')}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('contact.thankYou', 'Thank You!')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('contact.successMessage', 'We\'ve received your message and will contact you soon.')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.name', 'Your Name')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.email', 'Email Address')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.phone', 'Phone Number')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                    <FiMessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder={t('contact.message', 'Your Message')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {t('contact.sendMessage', 'Send Message')}
                </button>
              </form>
            )}
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
          >
            <div className="flex items-center space-x-2">
              <FiMessageSquare className="w-6 h-6" />
              <span className="font-medium">{t('contact.contactUs', 'Contact Us')}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingContactForm;
