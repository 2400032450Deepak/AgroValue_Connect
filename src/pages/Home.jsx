import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { 
  FaArrowRight, FaTractor, FaHandshake, FaGlobe, 
  FaChartLine, FaSeedling, FaRecycle, FaAward,
  FaPlay, FaStar, FaQuoteLeft, FaCheckCircle, FaLeaf,
  FaUser, FaShoppingBag, FaStore, FaHeart
} from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const { user, isAuthenticated, isFarmer, isBuyer, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    farmers: 0,
    buyers: 0,
    products: 0,
    countries: 0
  });

  useEffect(() => {
    // Animate stats on load
    const interval = setInterval(() => {
      setStats(prev => ({
        farmers: Math.min(prev.farmers + 5, 1250),
        buyers: Math.min(prev.buyers + 8, 3450),
        products: Math.min(prev.products + 3, 890),
        countries: Math.min(prev.countries + 1, 45)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Wild Honey',
      farmer: 'Rajesh Kumar',
      location: 'Uttarakhand, India',
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.8,
      reviews: 128,
      image: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
      isOrganic: true,
      isNew: true,
      discount: 20,
      tags: ['raw', 'unfiltered', 'natural']
    },
    {
      id: 2,
      name: 'Handcrafted Mango Pickle',
      farmer: 'Priya Sharma',
      location: 'Andhra Pradesh, India',
      price: 8.99,
      rating: 4.9,
      reviews: 256,
      image: 'https://avakaayapickleshouse.com/wp-content/uploads/2024/10/Mango-pickle-6_2_11zon.webp',
      isOrganic: true,
      tags: ['traditional', 'spicy', 'homemade']
    },
    {
      id: 3,
      name: 'Cold-Pressed Almond Oil',
      farmer: 'Amit Patel',
      location: 'California, USA',
      price: 15.99,
      rating: 4.7,
      reviews: 89,
      image: 'https://healthyroots.com/cdn/shop/files/ColdPressedAlmondoils.jpg?v=1763794735',
      isOrganic: false,
      isNew: true,
      tags: ['virgin', 'chemical-free']
    },
    {
      id: 4,
      name: 'Traditional Jaggery',
      farmer: 'Sunita Devi',
      location: 'Uttar Pradesh, India',
      price: 6.99,
      originalPrice: 8.99,
      rating: 4.6,
      reviews: 167,
      image: 'https://img.freepik.com/free-vector/organic-jaggery-powder-blocks-with-fresh-sugar-cane-color-background-realistic-vector-illustration_1284-78025.jpg',
      isOrganic: true,
      discount: 15,
      tags: ['organic', 'chemical-free']
    }
  ];

  const testimonials = [
    {
      name: "John Mitchell",
      role: "International Buyer",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      content: "AgroValue Connect transformed how I source organic products. The quality is exceptional and farmers are truly passionate.",
      rating: 5,
      country: "USA"
    },
    {
      name: "Lakshmi Reddy",
      role: "Farmer",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      content: "My income has tripled since joining. I now export my pickles to 5 countries and support 10 other women in my village.",
      rating: 5,
      country: "India"
    },
    {
      name: "Maria Garcia",
      role: "Restaurant Owner",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      content: "The direct farmer connection ensures I get the freshest ingredients. My customers love the authentic flavors!",
      rating: 5,
      country: "Spain"
    }
  ];

  const successStories = [
    {
      id: 1,
      title: "From 1 Acre to Global Exports",
      farmer: "Rajesh Kumar",
      story: "Started with organic honey, now exporting to 12 countries",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449"
    },
    {
      id: 2,
      title: "Empowering 50 Women Farmers",
      farmer: "Priya Sharma",
      story: "Created a cooperative that now produces traditional pickles for international markets",
      image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17"
    }
  ];

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (isFarmer) return '/farmer';
    if (isBuyer) return '/buyer';
    if (isAdmin) return '/admin';
    return '/';
  };

  // Get personalized message based on role
  const getPersonalizedMessage = () => {
    if (!user) return null;
    
    if (isFarmer) {
      return {
        title: `Welcome back, ${user.name}!`,
        subtitle: 'Manage your farm products, track orders, and grow your business.',
        buttonText: 'Go to Farmer Dashboard',
        icon: FaTractor
      };
    }
    if (isBuyer) {
      return {
        title: `Welcome back, ${user.name}!`,
        subtitle: 'Discover fresh products, track your orders, and manage your wishlist.',
        buttonText: 'Go to Buyer Dashboard',
        icon: FaShoppingBag
      };
    }
    if (isAdmin) {
      return {
        title: `Welcome back, ${user.name}!`,
        subtitle: 'Monitor platform activity, manage users, and view reports.',
        buttonText: 'Go to Admin Dashboard',
        icon: FaStore
      };
    }
    return null;
  };

  const personalizedMessage = getPersonalizedMessage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449"
            alt="Farm background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary-900/90 to-primary-800/80" />
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Transform Your Harvest Into{' '}
            <span className="text-secondary-400">Global Opportunity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Connect directly with international buyers, process your crops into premium products,
            and grow your farming business with technology
          </motion.p>

          {/* Conditional Rendering - Show different content based on auth status */}
          {isAuthenticated && personalizedMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto border border-white/20"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">{personalizedMessage.title}</h2>
              <p className="text-lg mb-6 opacity-90">{personalizedMessage.subtitle}</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  to={getDashboardLink()}
                  className="bg-secondary-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary-600 transition duration-300 flex items-center justify-center space-x-2 group"
                >
                  <personalizedMessage.icon />
                  <span>{personalizedMessage.buttonText}</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products"
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition duration-300"
                >
                  Browse Products
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <Link
                to="/register?role=farmer"
                className="bg-secondary-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary-600 transition duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Start Selling as Farmer</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register?role=buyer"
                className="bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300"
              >
                Start Buying as Importer
              </Link>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            <div>
              <div className="text-4xl font-bold text-secondary-400">{stats.farmers}+</div>
              <div className="text-sm uppercase tracking-wider">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-400">{stats.buyers}+</div>
              <div className="text-sm uppercase tracking-wider">Global Buyers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-400">{stats.products}+</div>
              <div className="text-sm uppercase tracking-wider">Value-Added Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-400">{stats.countries}</div>
              <div className="text-sm uppercase tracking-wider">Countries Reached</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Value Addition Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">
              From Farm to <span className="text-primary-600">Global Value</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We help farmers transform raw crops into premium, export-ready products
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: FaSeedling,
                title: "Harvest",
                description: "Quality raw crops from verified farmers",
                color: "bg-green-100 text-green-600"
              },
              {
                icon: FaRecycle,
                title: "Process",
                description: "Transform into value-added products",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: FaGlobe,
                title: "Connect",
                description: "Match with international buyers",
                color: "bg-purple-100 text-purple-600"
              },
              {
                icon: FaChartLine,
                title: "Grow",
                description: "Scale your business globally",
                color: "bg-orange-100 text-orange-600"
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`${step.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-4xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200">
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary-600 rounded-full" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">
              Premium <span className="text-primary-600">Value-Added</span> Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover artisanal products crafted by farmers with traditional methods
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-primary-600 font-semibold text-lg hover:text-primary-700 transition duration-300 group"
            >
              <span>View All Products</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Personalized CTA Section for Logged-in Users */}
      {isAuthenticated && (
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {isFarmer && "Ready to list more products?"}
                    {isBuyer && "Discover new products today!"}
                    {isAdmin && "Monitor platform activity"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isFarmer && "Expand your reach and connect with more buyers worldwide."}
                    {isBuyer && "Explore our latest additions from farmers around the world."}
                    {isAdmin && "Check recent reports and user activity."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                      to={isFarmer ? '/farmer/products' : isBuyer ? '/products' : '/admin/users'}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300"
                    >
                      {isFarmer && "Add New Product"}
                      {isBuyer && "Browse Products"}
                      {isAdmin && "View Users"}
                    </Link>
                    <Link
                      to={getDashboardLink()}
                      className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition duration-300"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center">
                    {isFarmer && <FaTractor className="text-6xl text-primary-600" />}
                    {isBuyer && <FaShoppingBag className="text-6xl text-primary-600" />}
                    {isAdmin && <FaStore className="text-6xl text-primary-600" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">
              Farmer <span className="text-primary-600">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real farmers, real transformations - from local markets to global exports
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                  <p className="text-lg mb-2">by {story.farmer}</p>
                  <p className="text-gray-200 mb-4">{story.story}</p>
                  <Link
                    to="/stories"
                    state={{ storyId: story.id }}
                    className="inline-block bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Read Full Story
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">
              What Our <span className="text-primary-600">Community Says</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by farmers and buyers across the globe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-8 relative"
              >
                <FaQuoteLeft className="text-4xl text-primary-200 absolute top-4 right-4" />
                
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-primary-600 text-sm">{testimonial.country}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 italic">"{testimonial.content}"</p>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <FaCheckCircle className="text-green-500 mr-1" />
                  <span>Verified {testimonial.role.includes('Farmer') ? 'Farmer' : 'Buyer'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <section className="py-24 bg-primary-800">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Ready to Transform Your Agricultural Business?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of farmers and buyers already growing their business with AgroValue Connect
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  to="/register?role=farmer"
                  className="bg-secondary-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary-600 transition duration-300"
                >
                  Start Selling as Farmer
                </Link>
                <Link
                  to="/register?role=buyer"
                  className="bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300"
                >
                  Start Buying as Importer
                </Link>
              </div>

              <p className="text-primary-200 mt-6">
                <FaCheckCircle className="inline mr-1" />
                Free registration • No commission for first 3 months
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <FaLeaf className="text-3xl text-primary-500" />
                <span className="font-display font-bold text-xl">AgroValueConnect</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering farmers to create value-added products and connect with global markets through technology.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="text-white" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition duration-300"
                >
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="text-white" />
                </a>
              </div>
            </div>

            {/* For Farmers Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">For Farmers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/farmer-resources#how-to-sell" className="hover:text-white transition duration-300">
                    How to Sell
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white transition duration-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/stories" className="hover:text-white transition duration-300">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link to="/farmer-resources#guide" className="hover:text-white transition duration-300">
                    Farmer Guide
                  </Link>
                </li>
                <li>
                  <Link to="/farmer-resources#tips" className="hover:text-white transition duration-300">
                    Processing Tips
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Buyers Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">For Buyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/buyer-resources#how-to-buy" className="hover:text-white transition duration-300">
                    How to Buy
                  </Link>
                </li>
                <li>
                  <Link to="/buyer-resources#quality" className="hover:text-white transition duration-300">
                    Quality Standards
                  </Link>
                </li>
                <li>
                  <Link to="/buyer-resources#shipping" className="hover:text-white transition duration-300">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="hover:text-white transition duration-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/buyer-resources#trust" className="hover:text-white transition duration-300">
                    Trust & Safety
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white transition duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition duration-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-white transition duration-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white transition duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="hover:text-white transition duration-300">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} AgroValue Connect. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;