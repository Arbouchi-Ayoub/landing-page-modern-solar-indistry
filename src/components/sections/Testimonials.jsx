import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiStar, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';

const TestimonialCard = ({ name, role, content, rating, index }) => {
  const stars = Array(5).fill(0);
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-primary-600 dark:text-primary-400">
          {name.charAt(0)}
        </div>
        <div className="mr-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {stars.map((_, i) => (
          <FiStar 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">"{content}"</p>
      
      <div className="flex justify-end">
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="text-primary-100 dark:text-primary-800">
          <path d="M0 30V0H40L25 30H0Z" fill="currentColor"/>
        </svg>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: t('testimonials.testimonial1.name', 'Karim El Amrani'),
      role: t('testimonials.testimonial1.role', 'Homeowner, Casablanca'),
      content: t('testimonials.testimonial1.content', 'SAFI SOLAR transformed our home with their solar installation. Our electricity bills have dropped by 80% and the installation process was smooth and professional.'),
      rating: 5
    },
    {
      name: t('testimonials.testimonial2.name', 'Leila Benjelloun'),
      role: t('testimonials.testimonial2.role', 'Business Owner, Rabat'),
      content: t('testimonials.testimonial2.content', 'The team at SAFI SOLAR provided excellent service from start to finish. Their expertise in commercial solar solutions saved us thousands in energy costs.'),
      rating: 5
    },
    {
      name: t('testimonials.testimonial3.name', 'Youssef Alami'),
      role: t('testimonials.testimonial3.role', 'Farmer, Marrakech'),
      content: t('testimonials.testimonial3.content', 'The solar water pumping system has been a game-changer for our farm. Reliable, efficient, and the after-sales support is exceptional.'),
      rating: 4
    },
    {
      name: t('testimonials.testimonial4.name', 'Nadia Bennis'),
      role: t('testimonials.testimonial4.role', 'School Principal, Tangier'),
      content: t('testimonials.testimonial4.content', 'We installed SAFI SOLAR panels on our school. The children are learning about renewable energy first-hand, and we\'re saving on operational costs.'),
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium px-4 py-1 rounded-full mb-4">
            {t('testimonials.tagline', 'Client Testimonials')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title', 'What Our Clients Say')}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('testimonials.subtitle', 'Hear from our satisfied customers across Morocco')}
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${testimonials.length * 100}%`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <TestimonialCard
                    name={testimonial.name}
                    role={testimonial.role}
                    content={testimonial.content}
                    rating={testimonial.rating}
                    index={0}
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={t('common.previous', 'Previous')}
            >
              <FiChevronLeft className={`w-5 h-5 ${i18n.dir() === 'rtl' ? 'transform rotate-180' : ''}`} />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-primary-600 w-6' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={t('common.goToSlide', 'Go to slide') + ' ' + (index + 1)}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={t('common.next', 'Next')}
            >
              <FiChevronRight className={`w-5 h-5 ${i18n.dir() === 'rtl' ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            {t('testimonials.cta', 'Share Your Experience')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
