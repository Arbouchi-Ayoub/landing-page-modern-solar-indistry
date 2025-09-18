import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ProductDescription = () => {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    {
      title: t('product.highEfficiency.title', 'High Efficiency'),
      description: t('product.highEfficiency.description', 'Our solar panels use advanced photovoltaic technology to maximize energy production even in low-light conditions.')
    },
    {
      title: t('product.durability.title', 'Durability'),
      description: t('product.durability.description', 'Built to withstand harsh weather conditions with a robust aluminum frame and tempered glass protection.')
    },
    {
      title: t('product.easyInstallation.title', 'Easy Installation'),
      description: t('product.easyInstallation.description', 'Quick and straightforward installation process with our certified technicians handling everything from A to Z.')
    },
    {
      title: t('product.smartMonitoring.title', 'Smart Monitoring'),
      description: t('product.smartMonitoring.description', 'Monitor your energy production in real-time through our user-friendly mobile application.')
    }
  ];

  return (
    <section id="product" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('product.title', 'Premium Solar Solutions')}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('product.subtitle', 'High-quality solar energy solutions designed for maximum efficiency and durability.')}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative"
            variants={item}
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src="/images/solar-panels-installation.jpg" 
                  alt={t('product.imageAlt', 'Solar panels installation')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/10 rounded-full -z-10"></div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            variants={container}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-start"
                variants={item}
              >
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/50 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('product.cta.title', 'Ready to Go Solar?')}
            </h3>
            <p className="text-primary-100 text-lg mb-6 max-w-2xl">
              {t('product.cta.description', 'Join hundreds of satisfied customers who are already saving on their energy bills with SAFI SOLAR.')}
            </p>
            <button 
              className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              {t('product.cta.button', 'Get Your Free Quote')}
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -right-20 top-1/2 w-40 h-40 bg-white/5 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDescription;
