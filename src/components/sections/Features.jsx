import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiSun, FiZap, FiShield, FiTrendingUp, FiWifi, FiClock, FiDollarSign } from 'react-icons/fi';

const FeatureCard = ({ icon: Icon, title, description, index, stats }) => {
  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
    >
      <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      {stats && (
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat, i) => (
              <div key={i} className="text-sm">
                <span className="font-medium text-gray-900 dark:text-white">{stat.value}</span>
                <span className="text-gray-500 dark:text-gray-400"> {stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('features.highEfficiency.title', 'High-Efficiency Panels'),
      description: t('features.highEfficiency.description', 'Our premium solar panels deliver industry-leading efficiency ratings, ensuring maximum energy production from limited roof space.'),
      icon: FiZap,
      stats: [
        { value: '22%+', label: t('features.highEfficiency.efficiency', 'Efficiency') },
        { value: '25', label: t('features.highEfficiency.warranty', 'Year Warranty') }
      ]
    },
    {
      title: t('features.smartInverter.title', 'Smart Inverters'),
      description: t('features.smartInverter.description', 'Advanced inverters with real-time monitoring and optimization for peak performance and energy savings.'),
      icon: FiTrendingUp,
      stats: [
        { value: '99.9%', label: t('features.smartInverter.efficiency', 'Efficiency') },
        { value: '10', label: t('features.smartInverter.warranty', 'Year Warranty') }
      ]
    },
    {
      title: t('features.batteryStorage.title', 'Battery Storage'),
      description: t('features.batteryStorage.description', 'Store excess solar energy for use during peak hours or power outages with our reliable battery solutions.'),
      icon: FiClock,
      stats: [
        { value: '10+', label: t('features.batteryStorage.lifespan', 'Year Lifespan') },
        { value: '90%', label: t('features.batteryStorage.retention', 'Capacity Retention') }
      ]
    },
    {
      title: t('features.monitoring.title', '24/7 Monitoring'),
      description: t('features.monitoring.description', 'Track your system\'s performance in real-time with our user-friendly monitoring platform.'),
      icon: FiWifi,
      stats: [
        { value: 'Real-time', label: t('features.monitoring.updates', 'Updates') },
        { value: 'Alerts', label: t('features.monitoring.alerts', 'Smart Alerts') }
      ]
    },
    {
      title: t('features.warranty.title', 'Comprehensive Warranty'),
      description: t('features.warranty.description', 'Industry-leading warranty coverage for complete peace of mind on your investment.'),
      icon: FiShield,
      stats: [
        { value: '25', label: t('features.warranty.panels', 'Year Panels') },
        { value: '10', label: t('features.warranty.inverters', 'Year Inverters') }
      ]
    },
    {
      title: t('features.savings.title', 'Guaranteed Savings'),
      description: t('features.savings.description', 'Significantly reduce or eliminate your electricity bills with our solar solutions.'),
      icon: FiDollarSign,
      stats: [
        { value: '70-100%', label: t('features.savings.reduction', 'Bill Reduction') },
        { value: 'ROI', label: t('features.savings.roi', '4-6 Year ROI') }
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium px-4 py-1 rounded-full mb-4">
            {t('features.tagline', 'Why Choose Us')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('features.title', 'Premium Solar Solutions')}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('features.subtitle', 'High-performance solar solutions tailored to your energy needs')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
              stats={feature.stats}
            />
          ))}
        </div>

        <motion.div 
          className="mt-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <FiSun className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('features.cta.title', 'Ready to Save with Solar?')}
            </h3>
            <p className="text-primary-100 text-lg mb-6">
              {t('features.cta.description', 'Get a free, no-obligation quote and see how much you could save with SAFI SOLAR.')}
            </p>
            <button 
              className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center mx-auto"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              <FiSun className="w-5 h-5 mr-2" />
              {t('features.cta.button', 'Get Your Free Solar Assessment')}
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -right-20 top-1/2 w-40 h-40 bg-white/5 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
