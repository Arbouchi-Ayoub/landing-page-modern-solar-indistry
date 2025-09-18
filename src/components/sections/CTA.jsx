const CTA = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-100/30 to-transparent dark:from-primary-900/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who are already using our platform to build amazing products.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="btn btn-primary px-8 py-4 text-lg"
            >
              Get Started for Free
            </a>
            <a
              href="#"
              className="btn btn-outline px-8 py-4 text-lg"
            >
              Schedule a Demo
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item}
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800"
                ></div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Join 10,000+ happy customers</p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-4 h-4 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">5.0 (2,000+ reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
