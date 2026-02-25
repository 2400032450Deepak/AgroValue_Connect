import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBook, FaVideo, FaFilePdf, FaHeadphones,
  FaUsers, FaChartLine, FaTruck, FaShieldAlt,
  FaSeedling, FaHandHoldingHeart, FaAward,
  FaDownload, FaPlay, FaArrowRight, FaCheckCircle,
  FaYoutube, FaCalendarAlt, FaClock, FaUserTie,
  FaMapMarkerAlt, FaBell, FaCheck, FaTimes,
  FaRegCalendarCheck, FaRegClock, FaRegUser,
  FaWhatsapp, FaEnvelope, FaPhone, FaLock,
  FaCreditCard, FaPaypal, FaApple, FaGoogle,
  FaSpinner, FaCertificate, FaCalculator, FaBox,
  FaWeightHanging, FaRuler, FaPrint, FaShare, 
  FaHistory, FaSave, FaTrash, FaGlobe, FaPercent,
  FaDollarSign, FaUserLock
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HelmetTags from '../components/SEO/HelmetTags';
import { downloadGuide, getDownloadHistory } from '../utils/downloadUtils';
import toast from 'react-hot-toast';
import ProfitCalculator from '../components/tools/ProfitCalculator';
import ShippingCalculator from '../components/tools/ShippingCalculator';
import CertificateGenerator from '../components/tools/CertificateGenerator';

const FarmerResources = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isFarmer } = useAuth();
  const [downloadStats, setDownloadStats] = useState({});
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'beginner',
    goals: '',
    agreeTerms: false,
    receiveUpdates: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [showProfitCalculator, setShowProfitCalculator] = useState(false);
  const [showShippingCalculator, setShowShippingCalculator] = useState(false);
  const [showCertificateGenerator, setShowCertificateGenerator] = useState(false);

  // Load registered workshops from localStorage on mount
  useEffect(() => {
    // Load download stats
    const history = getDownloadHistory();
    const stats = {};
    history.forEach(item => {
      stats[item.guideName] = (stats[item.guideName] || 0) + 1;
    });
    setDownloadStats(stats);

    // Load registered workshops
    const savedRegistrations = localStorage.getItem('workshopRegistrations');
    if (savedRegistrations) {
      setRegisteredWorkshops(JSON.parse(savedRegistrations));
    }
  }, []);
  
  const handleDownload = (guide) => {
    downloadGuide(guide);
    toast.success(`Downloaded: ${guide.title}`);
    
    const history = getDownloadHistory();
    const stats = {};
    history.forEach(item => {
      stats[item.guideName] = (stats[item.guideName] || 0) + 1;
    });
    setDownloadStats(stats);
  };

  // YouTube links for each video
  const getYouTubeLink = (videoTitle) => {
    
    const youtubeLinks = {
      "How to Create Value-Added Products": "https://youtu.be/NZHBgi-AVxE?si=CA8SNi_6vAK0jdT1", 
      "Packaging Tips for Export": "https://youtu.be/1a9aG0Vicqo?si=PVAVYSDkUtRnH-rP",
      "Success Story: From Local to Global": "https://youtu.be/weIpfVpamDg?si=n43RRZceXbWpT4rC", 
    };
    return youtubeLinks[videoTitle] || "https://youtube.com/playlist?list=PLoI7sNTNyiYKBRyfIwiRT1JA7Kkl5Vhup&si=w5yP1Q-isQ7xGrn3";
  };

  const handleWatchVideo = (video) => {
    const youtubeLink = getYouTubeLink(video.title);
    window.open(youtubeLink, '_blank');
    toast.success(`Opening: ${video.title}`);
  };

  const handleViewAllVideos = () => {
    window.open('https://youtube.com/playlist?list=PLoI7sNTNyiYKBRyfIwiRT1JA7Kkl5Vhup&si=w5yP1Q-isQ7xGrn3', '_blank');
    toast.success('Opening AgroValue Connect YouTube channel');
  };

  // Workshop registration handlers with payment
  const handleRegisterClick = (workshop) => {
    // Check if user is logged in
    if (!isAuthenticated) {
      toast.error('Please login to register for workshops', {
        icon: '🔒',
        duration: 4000,
      });
      navigate('/login?redirect=/farmer-resources');
      return;
    }

    // Check if user is a farmer
    if (!isFarmer) {
      toast.error('Only farmers can register for workshops', {
        icon: '🚜',
        duration: 4000,
      });
      return;
    }

    setSelectedWorkshop(workshop);
    setShowRegistrationModal(true);
    setRegistrationForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      experience: 'beginner',
      goals: '',
      agreeTerms: false,
      receiveUpdates: true
    });
    setFormErrors({});
  };

  // YouTube links for each video
  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn how to set up your farmer profile and list your first product",
      icon: FaBook,
      type: "PDF",
      size: "2.5 MB",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Product Photography Tips",
      description: "Take professional photos of your products to attract more buyers",
      icon: FaVideo,
      type: "Video",
      duration: "15 mins",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Pricing Your Products",
      description: "Strategies for competitive pricing while maximizing profits",
      icon: FaChartLine,
      type: "PDF",
      size: "1.8 MB",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Quality Standards Guide",
      description: "Understand our quality requirements and certifications",
      icon: FaAward,
      type: "PDF",
      size: "3.1 MB",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  const videos = [
    {
      title: "How to Create Value-Added Products",
      thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
      duration: "12:34",
      views: "2.5K"
    },
    {
      title: "Packaging Tips for Export",
      thumbnail: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17",
      duration: "18:21",
      views: "1.8K"
    },
    {
      title: "Success Story: From Local to Global",
      thumbnail: "https://media.istockphoto.com/id/1346744481/photo/anonymous-chef-harvesting-fresh-vegetables-on-a-farm.jpg?s=612x612&w=0&k=20&c=U9h4fAi68nwVndAJW8TF-f2lFFCO2Y-XrZWA2gah1Xw=",
      duration: "24:15",
      views: "3.2K"
    }
  ];

  const workshops = [
    {
      id: 1,
      title: "Digital Marketing for Farmers",
      date: "March 15, 2024",
      time: "10:00 AM EST",
      speaker: "Priya Sharma",
      speakerBio: "Digital marketing expert with 8+ years experience in agribusiness",
      spots: 45,
      registered: 28,
      price: 29.99,
      category: "marketing",
      color: "from-blue-500 to-blue-600",
      icon: FaUsers,
      includes: [
        "Live interactive session",
        "Workshop recording",
        "Marketing templates",
        "Certificate of completion"
      ]
    },
    {
      id: 2,
      title: "Understanding Export Regulations",
      date: "March 20, 2024",
      time: "2:00 PM EST",
      speaker: "John Smith",
      speakerBio: "International trade consultant specializing in agricultural exports",
      spots: 30,
      registered: 15,
      price: 49.99,
      category: "legal",
      color: "from-purple-500 to-purple-600",
      icon: FaShieldAlt,
      includes: [
        "Live interactive session",
        "Export documentation templates",
        "Regulation handbook PDF",
        "Certificate of completion"
      ]
    },
    {
      id: 3,
      title: "Sustainable Farming Practices",
      date: "March 25, 2024",
      time: "11:00 AM EST",
      speaker: "Dr. Rajesh Kumar",
      speakerBio: "Agricultural scientist with 20+ years experience in sustainable farming",
      spots: 50,
      registered: 32,
      price: 39.99,
      category: "sustainability",
      color: "from-green-500 to-green-600",
      icon: FaSeedling,
      includes: [
        "Live interactive session",
        "Sustainable farming guide",
        "Case studies PDF",
        "Certificate of completion"
      ]
    }
  ];

  const tools = [
    {
      title: "Profit Calculator",
      description: "Calculate your profits after fees and shipping",
      icon: FaChartLine,
      link: "#"
    },
    {
      title: "Shipping Cost Estimator",
      description: "Estimate shipping costs to different countries",
      icon: FaTruck,
      link: "#"
    },
    {
      title: "Certificate Generator",
      description: "Create quality certificates for your products",
      icon: FaFilePdf,
      link: "#"
    }
  ];

  const faqs = [
    {
      question: "How do I get verified as a farmer?",
      answer: "Submit your ID, farm documents, and product samples. Our team will review and verify within 3-5 business days."
    },
    {
      question: "What are the commission rates?",
      answer: "We charge 5% commission on successful sales. First 3 months are commission-free for new farmers."
    },
    {
      question: "How do I receive payments?",
      answer: "Payments are processed via PayPal or bank transfer within 5-7 business days after order confirmation."
    },
    {
      question: "Can I sell internationally?",
      answer: "Yes! We support international shipping. We'll guide you through export documentation and requirements."
    }
  ];

  return (
    <>
      <HelmetTags 
        title="Farmer Resources | AgroValue Connect"
        description="Access guides, tutorials, and tools to help you succeed as a farmer on our platform."
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
              Farmer Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto opacity-90"
            >
              Everything you need to grow your farming business and reach global markets
            </motion.p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">50+</div>
                <div className="text-gray-600">Guides & Tutorials</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">10K+</div>
                <div className="text-gray-600">Farmers Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Farmer Guides</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Step-by-step guides to help you succeed
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
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
                  >
                    <div className={`${guide.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {guide.type === 'PDF' ? (
                          <FaFilePdf className="text-red-500" />
                        ) : (
                          <FaVideo className="text-blue-500" />
                        )}
                        <span className="text-xs text-gray-500">
                          {guide.type} • {guide.size || guide.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        {downloadStats[guide.title] > 0 && (
                          <span className="text-xs text-gray-400">
                            {downloadStats[guide.title]} downloads
                          </span>
                        )}
                        <button
                          onClick={() => handleDownload(guide)}
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                          title={`Download ${guide.title}`}
                        >
                          <FaDownload />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Video Tutorials</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Watch and learn from successful farmers
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handleWatchVideo(video)}
                >
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <FaPlay className="text-primary-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                      <FaYoutube />
                      <span>YouTube</span>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1 hover:text-primary-600 transition">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.views} views</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={handleViewAllVideos}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold group"
              >
                <span>View All Videos</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Watch all our tutorials on our YouTube channel
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Workshops - with role-based access */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Upcoming Workshops</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join live sessions with industry experts and level up your farming game
              </p>
              
              {/* Role-based access message */}
              {isAuthenticated && !isFarmer && (
                <div className="mt-4 inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                  <FaUserLock />
                  <span>Workshops are only for farmers. Register as a farmer to join.</span>
                </div>
              )}
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {workshops.map((workshop, index) => {
                const spotsLeft = workshop.spots - workshop.registered;
                const isRegistered = registeredWorkshops.some(w => w.workshopId === workshop.id);
                const Icon = workshop.icon;
                
                return (
                  <motion.div
                    key={workshop.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden group"
                  >
                    {/* Workshop Header with Gradient */}
                    <div className={`bg-gradient-to-r ${workshop.color} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <Icon className="text-3xl" />
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                            {workshop.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{workshop.title}</h3>
                        <p className="text-white/90 text-sm line-clamp-2">{workshop.speakerBio}</p>
                      </div>
                    </div>

                    {/* Workshop Details */}
                    <div className="p-6">
                      {/* Price Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl font-bold text-primary-600">
                          ${workshop.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          + tax
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600">
                          <FaUserTie className="mr-3 text-primary-600" />
                          <span className="font-medium">{workshop.speaker}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaCalendarAlt className="mr-3 text-primary-600" />
                          <span>{workshop.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaClock className="mr-3 text-primary-600" />
                          <span>{workshop.time}</span>
                        </div>
                      </div>

                      {/* What's Included */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-2">What's included:</h4>
                        <ul className="space-y-2">
                          {workshop.includes.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <FaCheckCircle className="text-green-500 mr-2 text-xs" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Registration</span>
                          <span className="font-semibold text-primary-600">
                            {workshop.registered}/{workshop.spots}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(workshop.registered / workshop.spots) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full bg-gradient-to-r ${workshop.color}`}
                          />
                        </div>
                      </div>

                      {/* Spots Left Indicator */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${spotsLeft < 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'} mr-2`}></div>
                          <span className="text-sm text-gray-600">
                            {spotsLeft} spots left
                          </span>
                        </div>
                        {isRegistered && (
                          <span className="flex items-center text-green-600 text-sm">
                            <FaCheckCircle className="mr-1" />
                            Registered
                          </span>
                        )}
                      </div>

                      {/* Register Button - Only enabled for farmers */}
                      {isRegistered ? (
                        <button
                          disabled
                          className="w-full bg-gray-400 text-white py-3 rounded-xl font-semibold cursor-not-allowed"
                        >
                          Already Registered
                        </button>
                      ) : !isAuthenticated ? (
                        <button
                          onClick={() => {
                            toast.error('Please login to register');
                            navigate('/login?redirect=/farmer-resources');
                          }}
                          className="w-full bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
                        >
                          Login to Register
                        </button>
                      ) : !isFarmer ? (
                        <button
                          disabled
                          className="w-full bg-gray-400 text-white py-3 rounded-xl font-semibold cursor-not-allowed"
                          title="Only farmers can register for workshops"
                        >
                          Farmers Only
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRegisterClick(workshop)}
                          className={`w-full bg-gradient-to-r ${workshop.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300`}
                        >
                          Register Now - ${workshop.price}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => {
                  const workshopsSection = document.getElementById('workshops-section');
                  if (workshopsSection) {
                    workshopsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold group"
              >
                <span>View All Workshops</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Helpful Tools</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tools to help you manage and grow your business
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Profit Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center group hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
                onClick={() => setShowProfitCalculator(true)}
              >
                <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaChartLine className="text-4xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Profit Calculator</h3>
                <p className="text-gray-600 mb-4">Calculate your profits after fees and shipping</p>
                <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Use Tool <FaArrowRight className="ml-2" />
                </span>
              </motion.div>

              {/* Shipping Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center group hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
                onClick={() => setShowShippingCalculator(true)}
              >
                <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaTruck className="text-4xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Shipping Cost Estimator</h3>
                <p className="text-gray-600 mb-4">Estimate shipping costs to different countries</p>
                <span className="inline-flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Use Tool <FaArrowRight className="ml-2" />
                </span>
              </motion.div>

              {/* Certificate Generator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center group hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
                onClick={() => setShowCertificateGenerator(true)}
              >
                <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaCertificate className="text-4xl text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Certificate Generator</h3>
                <p className="text-gray-600 mb-4">Create quality certificates for your products</p>
                <span className="inline-flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Use Tool <FaArrowRight className="ml-2" />
                </span>
              </motion.div>
            </div>

            {/* Tool Statistics */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">150+</div>
                <div className="text-sm text-gray-500">Calculations Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">45+</div>
                <div className="text-sm text-gray-500">Countries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">230+</div>
                <div className="text-sm text-gray-500">Certificates Issued</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Common questions from farmers like you
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 mb-4"
                >
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-4">Need Personalized Help?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Our farmer support team is here to help you every step of the way
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Contact Support
                </Link>
                <Link
                  to="/register?role=farmer"
                  className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition duration-300"
                >
                  Join as Farmer
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Tool Modals */}
      {showProfitCalculator && <ProfitCalculator onClose={() => setShowProfitCalculator(false)} />}
      {showShippingCalculator && <ShippingCalculator onClose={() => setShowShippingCalculator(false)} />}
      {showCertificateGenerator && <CertificateGenerator onClose={() => setShowCertificateGenerator(false)} />}
    </>
  );
};

export default FarmerResources;