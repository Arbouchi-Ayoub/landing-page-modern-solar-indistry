import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {t('contact.formTitle', 'Get a Free Quote')}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <div className="absolute top-3 left-3">
              <FiMessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              placeholder={t('contact.message', 'Your Message')}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FiSend className="mr-2 h-5 w-5" />
            {t('contact.submit', 'Send Message')}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
