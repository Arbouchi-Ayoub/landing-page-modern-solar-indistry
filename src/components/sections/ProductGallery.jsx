import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

const ProductGallery = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample product images (replace with your actual images)
  const productImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
      alt: 'Solar panels on a rooftop',
      category: 'residential'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
      alt: 'Solar panel installation',
      category: 'commercial'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
      alt: 'Solar water heater',
      category: 'water_heater'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
      alt: 'Solar panel maintenance',
      category: 'maintenance'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
      alt: 'Solar panel monitoring',
      category: 'monitoring'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
      alt: 'Solar panel components',
      category: 'components'
    }
  ];

  const categories = [
    { id: 'all', name: t('gallery.categories.all') },
    { id: 'residential', name: t('gallery.categories.residential') },
    { id: 'commercial', name: t('gallery.categories.commercial') },
    { id: 'water_heater', name: t('gallery.categories.water_heater') }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = activeCategory === 'all' 
    ? productImages 
    : productImages.filter(img => img.category === activeCategory);

  const openImage = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigate = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = filteredImages.length - 1;
    if (newIndex >= filteredImages.length) newIndex = 0;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium px-4 py-1 rounded-full mb-4">
            {t('gallery.tagline')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('gallery.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => openImage(image, index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <span className="inline-block bg-primary-600 text-white text-xs px-2 py-1 rounded-full mb-2">
                    {t(`gallery.categories.${image.category}`)}
                  </span>
                  <h3 className="font-medium">{image.alt}</h3>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiMaximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {filteredImages.length > 6 && (
          <div className="text-center mt-10">
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
              {t('gallery.viewMore')}
            </button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeImage();
              }}
            >
              <FiX className="w-8 h-8" />
            </button>
            
            <button 
              className="absolute left-4 text-white hover:text-primary-400 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
            >
              <FiChevronLeft className="w-10 h-10" />
            </button>
            
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
              <motion.img
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm opacity-70">
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </div>
            
            <button 
              className="absolute right-4 text-white hover:text-primary-400 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
            >
              <FiChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGallery;
