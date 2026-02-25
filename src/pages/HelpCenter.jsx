import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaQuestionCircle, FaTruck, FaCreditCard, FaUser,
  FaShieldAlt, FaBox, FaSearch, FaHeadphones,
  FaChevronDown, FaChevronUp, FaEnvelope, FaPhone,
  FaComments, FaFileAlt, FaVideo, FaBook, FaStar,
  FaThumbsUp, FaClock, FaCheckCircle, FaExclamationTriangle,
  FaArrowRight, FaCopy, FaPrint, FaShare, FaDownload,   FaEye 
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HelmetTags from '../components/SEO/HelmetTags';
import toast from 'react-hot-toast';

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
    priority: 'normal'
  });
  const [formErrors, setFormErrors] = useState({});
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [liveChatAvailable, setLiveChatAvailable] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics', icon: FaQuestionCircle, color: 'primary', count: 10 },
    { id: 'account', name: 'Account', icon: FaUser, color: 'blue', count: 2 },
    { id: 'orders', name: 'Orders & Shipping', icon: FaTruck, color: 'green', count: 2 },
    { id: 'payment', name: 'Payment', icon: FaCreditCard, color: 'purple', count: 2 },
    { id: 'products', name: 'Products', icon: FaBox, color: 'orange', count: 2 },
    { id: 'security', name: 'Security', icon: FaShieldAlt, color: 'red', count: 2 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click on the "Login" button in the top right corner and select "Create Account". You can choose to register as a farmer or buyer. Fill in your details and verify your email address to get started.',
      helpful: 45,
      views: 1234,
      lastUpdated: '2024-03-15'
    },
    {
      id: 2,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'On the login page, click "Forgot Password". Enter your email address and we\'ll send you a link to reset your password. Follow the instructions in the email to create a new password.',
      helpful: 32,
      views: 987,
      lastUpdated: '2024-03-10'
    },
    {
      id: 3,
      category: 'orders',
      question: 'How long does shipping take?',
      answer: 'Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination. You can track your order in the "My Orders" section.',
      helpful: 67,
      views: 2156,
      lastUpdated: '2024-03-12'
    },
    {
      id: 4,
      category: 'orders',
      question: 'Can I track my order?',
      answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track all your orders in the "My Orders" section of your account dashboard.',
      helpful: 89,
      views: 3456,
      lastUpdated: '2024-03-14'
    },
    {
      id: 5,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment partners.',
      helpful: 54,
      views: 1876,
      lastUpdated: '2024-03-13'
    },
    {
      id: 6,
      category: 'payment',
      question: 'Is it safe to use my credit card?',
      answer: 'Absolutely! We use industry-standard encryption and secure payment gateways. Your payment information is never stored on our servers.',
      helpful: 78,
      views: 2987,
      lastUpdated: '2024-03-11'
    },
    {
      id: 7,
      category: 'products',
      question: 'How do I know products are authentic?',
      answer: 'All farmers are verified before they can list products. We also have a review system where buyers can share their experiences. Products with organic or other certifications are clearly labeled.',
      helpful: 92,
      views: 4123,
      lastUpdated: '2024-03-09'
    },
    {
      id: 8,
      category: 'products',
      question: 'What if I receive a damaged product?',
      answer: 'If you receive a damaged product, please contact us within 48 hours with photos. We\'ll arrange for a replacement or refund. Our buyer protection policy covers all purchases.',
      helpful: 43,
      views: 1567,
      lastUpdated: '2024-03-08'
    },
    {
      id: 9,
      category: 'security',
      question: 'How do you protect my personal information?',
      answer: 'We use industry-standard security measures including encryption, secure servers, and regular security audits. Your personal information is never shared with third parties without your consent.',
      helpful: 61,
      views: 2345,
      lastUpdated: '2024-03-07'
    },
    {
      id: 10,
      category: 'security',
      question: 'What should I do if I suspect fraudulent activity?',
      answer: 'If you notice any suspicious activity on your account, please contact our support team immediately. We\'ll help secure your account and investigate the issue.',
      helpful: 37,
      views: 1234,
      lastUpdated: '2024-03-06'
    }
  ];

  const popularTopics = [
    { title: "Shipping Policy", icon: FaTruck, link: "/shipping-policy", views: 5432, color: "blue" },
    { title: "Return & Refund", icon: FaBox, link: "/return-policy", views: 4321, color: "green" },
    { title: "Payment Methods", icon: FaCreditCard, link: "/payment-methods", views: 3987, color: "purple" },
    { title: "Account Settings", icon: FaUser, link: "/account-settings", views: 2876, color: "orange" },
    { title: "Privacy Policy", icon: FaShieldAlt, link: "/privacy", views: 2345, color: "red" },
    { title: "Contact Support", icon: FaHeadphones, link: "/contact", views: 1987, color: "primary" }
  ];

  const quickGuides = [
    { title: "Getting Started Guide", icon: FaBook, link: "/getting-started", duration: "5 min read" },
    { title: "Video Tutorials", icon: FaVideo, link: "/tutorials", duration: "15 min watch" },
    { title: "FAQs", icon: FaQuestionCircle, link: "#faqs", duration: "3 min read" },
    { title: "Community Forum", icon: FaComments, link: "/forum", duration: "Join discussion" }
  ];

  // Search functionality
  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  }, [searchTerm]);

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (searchTerm.length < 3 || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!contactForm.name) errors.name = 'Name is required';
    if (!contactForm.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errors.email = 'Email is invalid';
    if (!contactForm.topic) errors.topic = 'Please select a topic';
    if (!contactForm.message) errors.message = 'Message is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fill all required fields');
      return;
    }

    // Simulate ticket submission
    setTicketSubmitted(true);
    toast.success('Support ticket created! Check your email for updates.');
    setTimeout(() => setTicketSubmitted(false), 5000);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleFaqHelpful = (faqId) => {
    toast.success('Thanks for your feedback!');
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessages([...chatMessages, { text: chatMessage, sender: 'user', time: new Date() }]);
    setChatMessage('');
    
    // Simulate agent response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        text: "Thanks for your message. An agent will be with you shortly.", 
        sender: 'agent', 
        time: new Date() 
      }]);
    }, 1000);
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'primary';
  };

  return (
    <>
      <HelmetTags 
        title="Help Center | AgroValue Connect"
        description="Find answers to common questions, get support, and learn how to make the most of our platform."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header with Gradient */}
        <section className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-20 mt-16 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              How can we <span className="text-secondary-400">help</span> you?
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
            >
              Search our knowledge base or browse topics below
            </motion.p>
            
            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto relative"
            >
              <div className="relative">
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search for answers, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.length > 2 && setShowSearchSuggestions(true)}
                  className="w-full pl-14 pr-36 py-5 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-secondary-500/50 text-lg shadow-2xl"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
                    {filteredFaqs.length} results
                  </span>
                </div>
              </div>

              {/* Search Suggestions */}
              <AnimatePresence>
                {showSearchSuggestions && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-20"
                  >
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          setExpandedFaq(result.id);
                          setSearchTerm(result.question);
                          setShowSearchSuggestions(false);
                        }}
                        className="w-full px-6 py-4 text-left hover:bg-primary-50 transition border-b last:border-0"
                      >
                        <p className="font-medium text-gray-800">{result.question}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{result.answer}</p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-primary-200">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-primary-200">Help Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15min</div>
                <div className="text-sm text-primary-200">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-primary-200">Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Guides */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-4">
              {quickGuides.map((guide, index) => {
                const Icon = guide.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate(guide.link)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Icon className="text-2xl text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{guide.title}</h3>
                        <p className="text-sm text-gray-500">{guide.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories with Counts */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      isActive
                        ? `bg-${category.color}-600 text-white shadow-lg`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon />
                      <span>{category.name}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        isActive ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Topics with View Counts */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Topics</h2>
              <p className="text-gray-600">Most viewed by our community</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer group"
                    onClick={() => navigate(topic.link)}
                  >
                    <div className={`w-16 h-16 mx-auto mb-3 bg-${topic.color}-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition`}>
                      <Icon className={`text-3xl text-${topic.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{topic.title}</h3>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <FaEye className="text-xs" />
                      <span>{topic.views.toLocaleString()} views</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced FAQs */}
        <section className="py-16 bg-white" id="faqs">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to commonly asked questions
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {filteredFaqs.map((faq) => {
                const categoryColor = getCategoryColor(faq.category);
                const isExpanded = expandedFaq === faq.id;
                
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <motion.div
                      animate={{ scale: isExpanded ? 1.02 : 1 }}
                      transition={{ duration: 0.2 }}
                      className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-${categoryColor}-500`}
                    >
                      {/* Question Header */}
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className={`w-10 h-10 rounded-full bg-${categoryColor}-100 flex items-center justify-center`}>
                              <FaQuestionCircle className={`text-${categoryColor}-600`} />
                            </div>
                            <div>
                              <span className={`text-xs font-medium text-${categoryColor}-600 uppercase tracking-wider`}>
                                {faq.category}
                              </span>
                              <h3 className="font-semibold text-gray-800 mt-1">{faq.question}</h3>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isExpanded ? `bg-${categoryColor}-500` : 'bg-gray-100'
                            }`}
                          >
                            <FaChevronDown className={`text-sm ${
                              isExpanded ? 'text-white' : 'text-gray-600'
                            }`} />
                          </motion.div>
                        </div>
                      </button>

                      {/* Answer Section */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                              <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                              
                              {/* FAQ Actions */}
                              <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => handleFaqHelpful(faq.id)}
                                    className="flex items-center space-x-2 text-sm text-gray-500 hover:text-green-600 transition"
                                  >
                                    <FaThumbsUp />
                                    <span>Helpful ({faq.helpful})</span>
                                  </button>
                                  <button
                                    onClick={() => handleCopyToClipboard(faq.answer)}
                                    className="flex items-center space-x-2 text-sm text-gray-500 hover:text-primary-600 transition"
                                  >
                                    <FaCopy />
                                    <span>Copy</span>
                                  </button>
                                </div>
                                <div className="flex items-center space-x-4 text-xs text-gray-400">
                                  <span className="flex items-center">
                                    <FaEye className="mr-1" />
                                    {faq.views} views
                                  </span>
                                  <span className="flex items-center">
                                    <FaClock className="mr-1" />
                                    Updated {new Date(faq.lastUpdated).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <FaExclamationTriangle className="text-5xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No FAQs found matching your search.</p>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    View All FAQs
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Enhanced Contact Support */}
        <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-4xl font-bold mb-4">Still Need Help?</h2>
                <p className="text-xl text-primary-100 mb-8">
                  Can't find what you're looking for? Our support team is here to help you 24/7.
                </p>
                
                <div className="space-y-6">
                  {/* Live Chat Status */}
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 bg-white/10 rounded-xl p-4 cursor-pointer"
                    onClick={() => setShowChat(true)}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <FaComments className="text-2xl" />
                      </div>
                      {liveChatAvailable && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">Live Chat</p>
                      <p className="text-sm text-primary-200">Average response: 2 minutes</p>
                    </div>
                    <FaArrowRight />
                  </motion.div>

                  {/* Email Support */}
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 bg-white/10 rounded-xl p-4"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">Email Support</p>
                      <p className="text-sm text-primary-200">support@agrovalueconnect.com</p>
                    </div>
                    <button
                      onClick={() => handleCopyToClipboard('support@agrovalueconnect.com')}
                      className="p-2 hover:bg-white/20 rounded-lg transition"
                    >
                      <FaCopy />
                    </button>
                  </motion.div>

                  {/* Phone Support */}
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 bg-white/10 rounded-xl p-4"
                  >
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <FaPhone className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">Phone Support</p>
                      <p className="text-sm text-primary-200">+1 (555) 123-4567</p>
                      <p className="text-xs text-primary-300">Mon-Fri, 9am-6pm EST</p>
                    </div>
                    <button
                      onClick={() => handleCopyToClipboard('+1 (555) 123-4567')}
                      className="p-2 hover:bg-white/20 rounded-lg transition"
                    >
                      <FaCopy />
                    </button>
                  </motion.div>
                </div>

                {/* Support Hours */}
                <div className="mt-8 bg-white/5 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Support Hours</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-primary-200">Monday - Friday</p>
                      <p className="font-medium">24/7 Live Chat</p>
                    </div>
                    <div>
                      <p className="text-primary-200">Weekends</p>
                      <p className="font-medium">Limited Support</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-2xl p-8"
              >
                {ticketSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="text-4xl text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Ticket Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                      We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setTicketSubmitted(false)}
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Submit Another Ticket
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            formErrors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <input
                          type="email"
                          placeholder="Your Email *"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <select
                          value={contactForm.topic}
                          onChange={(e) => setContactForm({...contactForm, topic: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            formErrors.topic ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Topic *</option>
                          <option value="account">Account Issue</option>
                          <option value="order">Order Problem</option>
                          <option value="payment">Payment Question</option>
                          <option value="technical">Technical Support</option>
                          <option value="other">Other</option>
                        </select>
                        {formErrors.topic && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.topic}</p>
                        )}
                      </div>

                      <div>
                        <select
                          value={contactForm.priority}
                          onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="normal">Normal Priority</option>
                          <option value="high">High Priority</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>

                      <div>
                        <textarea
                          rows="4"
                          placeholder="Your Message *"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            formErrors.message ? 'border-red-500' : 'border-gray-300'
                          }`}
                        ></textarea>
                        {formErrors.message && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition hover:shadow-lg"
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Chat Modal */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowChat(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white rounded-2xl w-full max-w-lg h-[600px] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Chat Header */}
                <div className="bg-primary-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <FaComments className="text-2xl" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></span>
                    </div>
                    <div>
                      <h3 className="font-bold">Live Chat Support</h3>
                      <p className="text-xs text-primary-200">Usually replies instantly</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition"
                  >
                    <FaChevronDown />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-primary-600 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-200' : 'text-gray-500'}`}>
                          {msg.time.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={sendChatMessage}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Links with Icons */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaBook className="text-primary-600" />
                  <h4 className="font-bold text-gray-800">Getting Started</h4>
                </div>
                <ul className="space-y-2">
                  {['Create Account', 'Verify Identity', 'Set Up Profile', 'Browse Products'].map((item, i) => (
                    <li key={i}>
                      <Link to={`/help/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-primary-600 transition flex items-center space-x-2">
                        <FaArrowRight className="text-xs" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaTruck className="text-primary-600" />
                  <h4 className="font-bold text-gray-800">For Farmers</h4>
                </div>
                <ul className="space-y-2">
                  {['Listing Products', 'Managing Orders', 'Getting Paid', 'Shipping Guide'].map((item, i) => (
                    <li key={i}>
                      <Link to={`/help/farmer/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-primary-600 transition flex items-center space-x-2">
                        <FaArrowRight className="text-xs" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaUser className="text-primary-600" />
                  <h4 className="font-bold text-gray-800">For Buyers</h4>
                </div>
                <ul className="space-y-2">
                  {['Placing Orders', 'Payment Methods', 'Tracking Orders', 'Returns & Refunds'].map((item, i) => (
                    <li key={i}>
                      <Link to={`/help/buyer/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-primary-600 transition flex items-center space-x-2">
                        <FaArrowRight className="text-xs" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaShieldAlt className="text-primary-600" />
                  <h4 className="font-bold text-gray-800">Legal</h4>
                </div>
                <ul className="space-y-2">
                  {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Security'].map((item, i) => (
                    <li key={i}>
                      <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-primary-600 transition flex items-center space-x-2">
                        <FaArrowRight className="text-xs" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Stay Updated</h3>
              <p className="text-gray-600 mb-6">Get the latest updates, tips, and news from AgroValue Connect</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HelpCenter;