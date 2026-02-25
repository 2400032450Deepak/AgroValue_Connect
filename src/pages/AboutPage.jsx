import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaLeaf, FaGlobe, FaHandshake, FaSeedling, 
  FaTractor, FaUsers, FaAward, FaHeart,
  FaQuoteLeft, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import HelmetTags from '../components/SEO/HelmetTags';

const AboutPage = () => {
  const stats = [
    { value: '10K+', label: 'Farmers', icon: FaTractor },
    { value: '50K+', label: 'Buyers', icon: FaUsers },
    { value: '100+', label: 'Countries', icon: FaGlobe },
    { value: '1M+', label: 'Products Sold', icon: FaAward }
  ];

  const values = [
    {
      icon: FaSeedling,
      title: 'Sustainability',
      description: 'Promoting sustainable farming practices and reducing food waste through value addition.'
    },
    {
      icon: FaHandshake,
      title: 'Fair Trade',
      description: 'Ensuring farmers get fair prices and buyers get authentic products directly from source.'
    },
    {
      icon: FaHeart,
      title: 'Community',
      description: 'Building a global community of farmers and buyers who share passion for quality food.'
    },
    {
      icon: FaLeaf,
      title: 'Quality',
      description: 'Maintaining highest standards of quality through verification and farmer training.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Former farmer with 20 years experience in organic farming'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Farmer Relations',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Agricultural economist passionate about farmer empowerment'
    },
    {
      name: 'Amit Patel',
      role: 'Technology Director',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'Tech innovator building solutions for agricultural challenges'
    },
    {
      name: 'Sunita Devi',
      role: 'Quality Assurance',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      bio: 'Food scientist ensuring product quality and safety'
    }
  ];

  return (
    <>
      <HelmetTags 
        title="About Us | AgroValue Connect"
        description="Learn about our mission to empower farmers and connect them with global buyers through value-added products."
      />
      
      <div className="min-h-screen bg-gray-50">
       

        {/* Hero Section */}
        <section className="relative bg-linear-to-r from-primary-600 to-primary-800 text-white py-24 mt-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-6"
            >
              Empowering Farmers, Connecting the World
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto opacity-90"
            >
              We're on a mission to transform agriculture by helping farmers create value-added products 
              and connect directly with global buyers.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Icon className="text-4xl text-primary-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    AgroValue Connect was born from a simple observation: farmers work hard to grow 
                    quality crops, but they often don't get fair prices. Meanwhile, consumers worldwide 
                    struggle to find authentic, farm-fresh products.
                  </p>
                  <p>
                    Our founder, Rajesh Kumar, a third-generation farmer from India, experienced this 
                    challenge firsthand. He saw how farmers could increase their income by processing 
                    raw crops into value-added products like honey, pickles, and oils, but they lacked 
                    the platform to reach global buyers.
                  </p>
                  <p>
                    In 2020, we launched AgroValue Connect with a vision to bridge this gap. Today, 
                    we've helped thousands of farmers across 100+ countries transform their businesses 
                    and connect with buyers who appreciate quality, authentic products.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449"
                  alt="Farmer in field"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <FaQuoteLeft className="text-3xl text-primary-600 mb-2" />
                  <p className="italic text-gray-600">
                    "Every farmer deserves a fair price for their hard work."
                  </p>
                  <p className="font-semibold mt-2">- Rajesh Kumar, Founder</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition duration-300"
                  >
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-3xl text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Passionate people dedicated to transforming agriculture
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
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
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Whether you're a farmer looking to grow your business or a buyer seeking authentic products, 
                we're here to help.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  to="/register?role=farmer"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Join as Farmer
                </Link>
                <Link
                  to="/register?role=buyer"
                  className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition duration-300"
                >
                  Join as Buyer
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;