import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaShieldAlt, FaTruck, FaUndo,
  FaCreditCard, FaStar, FaQuestionCircle, FaFileAlt,
  FaGlobe, FaClock, FaCheckCircle, FaArrowRight,
  FaFlask, FaLeaf, FaHands, FaBan, FaSeedling,  FaChevronDown
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HelmetTags from '../components/SEO/HelmetTags';
import GuideModal from '../components/GuideModal';
import { useNavigate } from 'react-router-dom';
const BuyerResources = () => {
   const [selectedGuide, setSelectedGuide] = useState(null);
   const navigate = useNavigate();
  const guides = [
    {
      title: "How to Find Quality Products",
      description: "Tips for discovering the best farm-fresh products",
      icon: FaSearch,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Understanding Quality Labels",
      description: "Learn about organic, fair trade, and other certifications",
      icon: FaShieldAlt,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Shipping & Delivery Guide",
      description: "Everything you need to know about shipping times and costs",
      icon: FaTruck,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Returns & Refunds Policy",
      description: "Our hassle-free return process explained",
      icon: FaUndo,
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  const benefits = [
    {
      icon: FaCheckCircle,
      title: "Direct from Farmers",
      description: "No middlemen, better prices, authentic products"
    },
    {
      icon: FaStar,
      title: "Quality Guaranteed",
      description: "All products are verified for quality and authenticity"
    },
    {
      icon: FaGlobe,
      title: "Global Selection",
      description: "Access products from farmers around the world"
    },
    {
      icon: FaClock,
      title: "Fresh Delivery",
      description: "Fast shipping directly from farm to your door"
    }
  ];

  const categories = [
    {
      name: "Organic Products",
      description: "Certified organic products from sustainable farms",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
      count: 234
    },
    {
      name: "Artisanal Foods",
      description: "Handcrafted products made with traditional methods",
      image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17",
      count: 156
    },
    {
      name: "Specialty Ingredients",
      description: "Unique ingredients for gourmet cooking",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
      count: 189
    }
  ];

  const faqs = [
    {
      question: "How do I know the products are authentic?",
      answer: "All farmers are verified and products are regularly inspected. You can also read reviews from other buyers."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay. All payments are secure and encrypted."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic shipping typically takes 3-5 business days. International shipping takes 7-14 business days."
    },
    {
      question: "Can I return products if I'm not satisfied?",
      answer: "Yes, we have a 30-day satisfaction guarantee. If you're not happy with your purchase, we'll refund or replace it."
    }
  ];

  return (
    <>
      <HelmetTags 
        title="Buyer Resources | AgroValue Connect"
        description="Learn how to find the best farm products, understand quality standards, and make the most of your shopping experience."
      />
      
      <div className="min-h-screen bg-gray-50">
        

        {/* Header */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Buyer Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto opacity-90"
            >
              Everything you need to know about finding and buying quality farm products
            </motion.p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Buy from Us</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the difference of buying directly from farmers
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-2xl text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Buyer Guides */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Buyer Guides</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Learn how to make the most of your shopping experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guides.map((guide, index) => {
  const Icon = guide.icon;
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 cursor-pointer"
      onClick={() => setSelectedGuide(guide)}
    >
      <div className={`${guide.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="text-xl" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
      <span className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
        Read Guide <FaArrowRight className="ml-2" />
      </span>
    </motion.div>
  );
})}
            </div>
          </div>
        </section>

       {/* Popular Categories */}
<section className="py-16 bg-gradient-to-br from-primary-50 to-white">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Categories</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Explore our most popular product categories
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -8 }}
          className="group relative cursor-pointer"
        >
          <div className="relative rounded-2xl overflow-hidden h-80">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-secondary-400 transition">
                {category.name}
              </h3>
              <p className="text-sm text-gray-200 mb-3">{category.count} products</p>
              
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/30 rounded-full mb-3">
                <div 
                  className="h-full bg-secondary-400 rounded-full"
                  style={{ width: `${Math.min(100, (category.count / 300) * 100)}%` }}
                />
              </div>
              
              <p className="text-sm text-gray-300 line-clamp-2">{category.description}</p>
              
              {/* Explore Button - NOW WORKING */}
              <button 
                onClick={() => {
                  const categoryParam = category.name.toLowerCase().replace(/\s+/g, '-');
                  navigate(`/products?category=${categoryParam}`);
                }}
                className="mt-4 inline-flex items-center text-sm font-semibold text-white group-hover:text-secondary-400 transition"
              >
                Explore Category 
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        {/* Quality Standards */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Quality Standards</h2>
        <div className="space-y-6">
          {/* Standard 1 */}
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary-50 transition"
          >
            <div className="bg-green-100 p-3 rounded-lg">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Verified Farmers</h3>
              <p className="text-gray-600">All farmers are verified through a rigorous process including document verification and farm inspections.</p>
            </div>
          </motion.div>

          {/* Standard 2 */}
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary-50 transition"
          >
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaFlask className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Product Testing</h3>
              <p className="text-gray-600">Regular quality checks and testing for all products to ensure they meet our strict standards.</p>
            </div>
          </motion.div>

          {/* Standard 3 */}
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary-50 transition"
          >
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FaStar className="text-2xl text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Customer Reviews</h3>
              <p className="text-gray-600">Authentic reviews from verified buyers help you make informed decisions.</p>
            </div>
          </motion.div>

          {/* Standard 4 */}
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary-50 transition"
          >
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaShieldAlt className="text-2xl text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Satisfaction Guarantee</h3>
              <p className="text-gray-600">30-day money-back guarantee on all purchases. Shop with confidence!</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Quality Certifications */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-xl p-8"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quality Certifications</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Organic */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center border border-green-200"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <FaLeaf className="text-3xl text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">USDA Organic</span>
          </motion.div>

          {/* Fair Trade */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center border border-blue-200"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <FaHands className="text-3xl text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Fair Trade</span>
          </motion.div>

          {/* Non-GMO */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center border border-purple-200"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <FaBan className="text-3xl text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Non-GMO</span>
          </motion.div>

          {/* Gluten Free */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center border border-yellow-200"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
            <FaSeedling className="text-3xl text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Gluten Free</span>
          </motion.div>
        </div>

        {/* Certification Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Certified Products</span>
            <span className="font-semibold text-primary-600">1,234+</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '75%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

       {/* FAQ Section */}
<section className="py-16 bg-gradient-to-br from-gray-50 to-white">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Frequently Asked <span className="text-primary-600">Questions</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Common questions from buyers like you
      </p>
    </motion.div>

    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        // Create a unique state for each FAQ item
        const [isOpen, setIsOpen] = useState(false);
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
          >
            <div
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
                isOpen ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-lg'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Question */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'bg-primary-600' : ''
                  }`}>
                    <FaQuestionCircle className={`text-xl ${
                      isOpen ? 'text-white' : 'text-primary-600'
                    }`} />
                  </div>
                  <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                    isOpen ? 'text-primary-600' : 'text-gray-800'
                  }`}>
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isOpen ? 'bg-primary-600' : 'bg-gray-100'
                  }`}
                >
                  <FaChevronDown className={`text-sm ${
                    isOpen ? 'text-white' : 'text-gray-600'
                  }`} />
                </motion.div>
              </div>

              {/* Answer - Animated */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <div className="flex items-start space-x-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Still have questions? CTA */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-center mt-12"
    >
      <Link
        to="/contact"
        className="inline-flex items-center space-x-3 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition hover:shadow-lg group"
      >
        <FaQuestionCircle className="text-xl" />
        <span>Still have questions? Contact Support</span>
        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  </div>
</section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Browse thousands of products directly from farmers around the world
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Browse Products
                </Link>
                <Link
                  to="/register?role=buyer"
                  className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition duration-300"
                >
                  Create Account
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      {/* Guide Modal */}
<AnimatePresence>
  {selectedGuide && (
    <GuideModal 
      guide={selectedGuide} 
      onClose={() => setSelectedGuide(null)} 
    />
  )}
</AnimatePresence>
    </>
  );
  
};

export default BuyerResources;