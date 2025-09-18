import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiSend, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.name.required');
    }
    
    if (!formData.email) {
      newErrors.email = t('contact.form.errors.email.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.email.invalid');
    }
    
    if (!formData.phone) {
      newErrors.phone = t('contact.form.errors.phone.required');
    } else if (!/^[0-9+\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = t('contact.form.errors.phone.invalid');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.message.required');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.form.errors.message.tooShort');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form on successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium px-4 py-1 rounded-full mb-4">
            {t('contact.tagline', 'Get In Touch')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title', 'Contact Us')}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle', 'Have questions or ready to go solar? Our team is here to help.')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('contact.form.title', 'Send Us a Message')}
            </h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg">
                {t('contact.form.success', 'Thank you for your message! We will get back to you soon.')}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
                {t('contact.form.error', 'Something went wrong. Please try again later.')}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('contact.form.name', 'Full Name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                  placeholder={t('contact.form.placeholders.name', 'John Doe')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.form.email', 'Email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.form.phone', 'Phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                    placeholder={t('contact.form.placeholders.phone', '+212 600 000000')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('contact.form.message', 'Message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                  placeholder={t('contact.form.placeholders.message', 'Tell us about your project...')}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.form.submitting', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5 mr-2" />
                      {t('contact.form.submit', 'Send Message')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">
                {t('contact.info.title', 'Contact Information')}
              </h3>
              <p className="mb-6">
                {t('contact.info.description', 'Have questions or need assistance? Our team is here to help you with all your solar energy needs.')}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium">{t('contact.info.address.title', 'Our Office')}</h4>
                    <p className="text-sm text-primary-100">
                      {t('contact.info.address.value', '123 Solar Street, Casablanca, Morocco')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium">{t('contact.info.phone.title', 'Phone')}</h4>
                    <p className="text-sm text-primary-100">+212 600 000000</p>
                    <p className="text-sm text-primary-100">+212 522 000000</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium">{t('contact.info.email.title', 'Email')}</h4>
                    <p className="text-sm text-primary-100">info@safisolar.ma</p>
                    <p className="text-sm text-primary-100">support@safisolar.ma</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium">{t('contact.info.hours.title', 'Working Hours')}</h4>
                    <p className="text-sm text-primary-100">
                      {t('contact.info.hours.weekdays', 'Monday - Friday')}: 8:30 AM - 7:00 PM
                    </p>
                    <p className="text-sm text-primary-100">
                      {t('contact.info.hours.weekend', 'Saturday')}: 9:00 AM - 2:00 PM
                    </p>
                    <p className="text-sm text-primary-100">
                      {t('contact.info.hours.sunday', 'Sunday')}: {t('contact.info.hours.closed', 'Closed')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                {t('contact.faq.title', 'Frequently Asked Questions')}
              </h4>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                      {t(`contact.faq.q${item}.question`, `Question ${item}?`)}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t(`contact.faq.q${item}.answer`, `Answer to question ${item}.`)}
                    </p>
                  </div>
                ))}
                <a 
                  href="#" 
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                >
                  {t('contact.faq.viewAll', 'View all FAQs')}
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
