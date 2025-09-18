import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import VideoModal from '../common/VideoModal';
import { FiArrowRight, FiArrowLeft, FiPlay } from 'react-icons/fi';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const { t } = useTranslation();

  // Hero slides data
  const slides = [
    {
      title: 'hero.title1',
      subtitle: 'hero.subtitle1',
      image: '/images/hero/hero-1.jpeg',
      cta: 'hero.requestQuote',
      videoId: 'your-video-id-1',
      bgPosition: 'center 30%'
    },
    {
      title: 'hero.title2',
      subtitle: 'hero.subtitle2',
      image: '/images/hero/hero-2.jpg',
      cta: 'hero.requestQuote',
      videoId: 'your-video-id-2',
      bgPosition: 'center 60%'
    },
    {
      title: 'hero.title3',
      subtitle: 'hero.subtitle3',
      image: '/images/hero/hero-3.jpg',
      cta: 'hero.requestQuote',
      videoId: 'your-video-id-3',
      bgPosition: 'center 40%'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Animation variants
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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
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

  return (
    <section id="hero" className="relative overflow-hidden h-screen min-h-[700px] max-h-[1000px] w-full">
      {/* Background slider */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.8 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                willChange: 'transform'
              }}
              aria-label={t(slides[currentSlide].title)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 dark:from-black/40 dark:to-black/60 backdrop-blur-[1px]" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 dark:from-black/50 dark:to-black/80" />
      </div>

      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={`slide-${currentSlide}`}
              className="max-w-4xl mx-auto text-center relative z-10"
              custom={direction}
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                variants={item}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-100">
                  {t(slides[currentSlide].title)}
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
                variants={item}
              >
                {t(slides[currentSlide].subtitle)}
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={item}>
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  {t('hero.requestQuote')}
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <FiPlay className="w-5 h-5 mr-2" />
                  {t('hero.watchVideo')}
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous slide"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-white' 
                      : 'w-4 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next slide"
            >
              <FiArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoId={slides[currentSlide].videoId} 
      />
    </section>
  );
};
export default Hero;
