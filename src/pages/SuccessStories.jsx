import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FaQuoteLeft, FaStar, FaGlobe, FaTractor,
  FaChartLine, FaUsers, FaHeart, FaShare,
  FaPlay, FaPause, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HelmetTags from '../components/SEO/HelmetTags';


const SuccessStories = () => {
  const location = useLocation();
const selectedStoryId = location.state?.storyId;
  const [selectedStory, setSelectedStory] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);


  useEffect(() => {
  if (selectedStoryId) {
    const foundStory = stories.find(
      (story) => story.id === selectedStoryId
    );

    if (foundStory) {
      setSelectedStory(foundStory);
    }
  }
}, [selectedStoryId]);

  const stories = [
    {
      id: 1,
      farmer: "Rajesh Kumar",
      location: "Uttarakhand, India",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      coverImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
      title: "From 1 Acre to Global Exports",
      subtitle: "How organic honey changed my life",
      story: "Starting with just one acre of land and a few beehives, Rajesh Kumar now exports organic honey to 12 countries. His journey began when he joined AgroValue Connect and learned about value-added products. Instead of selling raw honey at low prices, he started processing and packaging it as premium organic honey. Today, his products are sold in health food stores across Europe and North America.",
      impact: {
        revenue: "+450%",
        customers: "10,000+",
        countries: "12",
        employees: "25"
      },
      video: "https://example.com/video1.mp4",
      products: ["Wild Honey", "Creamed Honey", "Honey Comb"],
      quote: "The platform helped me reach customers I never thought possible. Now my honey is enjoyed by families around the world."
    },
    {
      id: 2,
      farmer: "Priya Sharma",
      location: "Andhra Pradesh, India",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      coverImage: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17",
      title: "Empowering 50 Women Farmers",
      subtitle: "Creating a pickle cooperative",
      story: "Priya Sharma started with a small kitchen operation making traditional pickles. Through AgroValue Connect, she connected with other women in her village and formed a cooperative. Together, they now produce 15 varieties of pickles and chutneys, employing 50 women and exporting to 8 countries. Her products have won multiple awards for authenticity and quality.",
      impact: {
        revenue: "+600%",
        customers: "25,000+",
        countries: "8",
        employees: "50"
      },
      video: "https://example.com/video2.mp4",
      products: ["Mango Pickle", "Lime Pickle", "Mixed Vegetable Pickle"],
      quote: "We're not just making pickles; we're creating opportunities for women in our community."
    },
    {
      id: 3,
      farmer: "Amit Patel",
      location: "California, USA",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      coverImage: "https://images.csmonitor.com/csm/2020/08/0825%20DDP%20MILLET%20women%20LEDE.jpg?alias=standard_1200x800",
      title: "Reviving Ancient Grain Farming",
      subtitle: "Bringing heritage grains back to life",
      story: "Amit Patel, a third-generation farmer, was struggling with conventional farming until he discovered the market for heritage grains. Through AgroValue Connect, he found buyers willing to pay premium prices for organic, ancient wheat varieties. He now farms 500 acres with heritage grains and supplies to artisan bakeries across the US.",
      impact: {
        revenue: "+300%",
        customers: "5,000+",
        countries: "3",
        employees: "15"
      },
      video: "https://example.com/video3.mp4",
      products: ["Einkorn Wheat", "Emmer Farro", "Spelt Flour"],
      quote: "These grains were almost forgotten. Now they're feeding families who appreciate real nutrition."
    },
    {
      id: 4,
      farmer: "Sunita Devi",
      location: "Uttar Pradesh, India",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      coverImage: "https://www.cadburydessertscorner.com/hs-fs/hubfs/dc-website-2022/articles/golden-goodness-mastering-the-art-of-traditional-jaggery-sweets-at-home/golden-goodness-mastering-the-art-of-traditional-jaggery-sweets-at-home-feature.webp?width=1920&height=464&name=golden-goodness-mastering-the-art-of-traditional-jaggery-sweets-at-home-feature.webp",
      title: "Sweet Success with Jaggery",
      subtitle: "From local sweet to international delicacy",
      story: "Sunita Devi grew up watching her family make traditional jaggery. When she joined AgroValue Connect, she saw an opportunity to introduce this healthy sweetener to health-conscious consumers worldwide. She modernized her production while maintaining traditional methods. Today, her organic jaggery is sold in premium stores across 15 countries.",
      impact: {
        revenue: "+550%",
        customers: "15,000+",
        countries: "15",
        employees: "30"
      },
      video: "https://example.com/video4.mp4",
      products: ["Organic Jaggery", "Ginger Jaggery", "Coconut Jaggery"],
      quote: "Our traditional sweet is now a global superfood. I'm proud to share our heritage with the world."
    },
    {
      id: 5,
      farmer: "Krishna Reddy",
      location: "Karnataka, India",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      coverImage: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17",
      title: "Spice Up Your Life",
      subtitle: "Building a spice empire",
      story: "Krishna Reddy started with a small spice grinding operation. Through AgroValue Connect, he learned about international quality standards and organic certification. He now runs a state-of-the-art spice processing facility that exports to 20 countries, working directly with 200+ small farmers in his region.",
      impact: {
        revenue: "+700%",
        customers: "50,000+",
        countries: "20",
        employees: "75"
      },
      video: "https://example.com/video5.mp4",
      products: ["Turmeric", "Cumin", "Coriander", "Garam Masala"],
      quote: "Every spice tells a story. We're sharing the rich flavors of Indian cuisine with the world."
    },
    {
      id: 6,
      farmer: "Maria Garcia",
      location: "Andalusia, Spain",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      coverImage: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
      title: "Liquid Gold from Spain",
      subtitle: "Premium olive oil from family groves",
      story: "Maria Garcia's family has been growing olives for generations. When she joined AgroValue Connect, she saw an opportunity to market their extra virgin olive oil directly to consumers. She invested in modern processing equipment while maintaining traditional grove practices. Her oil now competes with the world's best and is featured in top restaurants.",
      impact: {
        revenue: "+400%",
        customers: "8,000+",
        countries: "10",
        employees: "12"
      },
      video: "https://example.com/video6.mp4",
      products: ["Extra Virgin Olive Oil", "Flavored Olive Oil", "Olive Tapenade"],
      quote: "Our olives have been in the family for 100 years. Now the world can taste our legacy."
    }
  ];

  const stats = {
    totalFarmers: 1250,
    totalRevenue: "45M+",
    totalCountries: 45,
    avgIncrease: 320
  };

  return (
    <>
      <HelmetTags 
        title="Success Stories | AgroValue Connect"
        description="Read inspiring stories of farmers who transformed their lives through value-added products and global connections."
      />
      
      <div className="min-h-screen bg-gray-50">
        
        {/* Header */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24 mt-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-6"
            >
              Farmer Success Stories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto opacity-90"
            >
              Real farmers. Real transformations. Inspiring journeys from local farms to global markets.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">{stats.totalFarmers}+</div>
                <div className="text-gray-600">Farmers Empowered</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">${stats.totalRevenue}</div>
                <div className="text-gray-600">Total Revenue Generated</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">{stats.totalCountries}</div>
                <div className="text-gray-600">Countries Reached</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">{stats.avgIncrease}%</div>
                <div className="text-gray-600">Average Income Increase</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Story */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-96 md:h-auto">
                  <img
                    src={stories[0].coverImage}
                    alt={stories[0].farmer}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm opacity-90 mb-2">Featured Story</p>
                    <h3 className="text-2xl font-bold mb-1">{stories[0].farmer}</h3>
                    <p className="opacity-90">{stories[0].location}</p>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <FaQuoteLeft className="text-4xl text-primary-200 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{stories[0].title}</h2>
                  <p className="text-gray-600 mb-6">{stories[0].story}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary-600">{stories[0].impact.revenue}</div>
                      <div className="text-sm text-gray-600">Revenue Growth</div>
                    </div>
                    <div className="bg-primary-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary-600">{stories[0].impact.countries}</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStory(stories[0])}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
                  >
                    Read Full Story
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* All Stories Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">More Inspiring Stories</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover how farmers around the world are transforming their lives
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.slice(1).map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.coverImage}
                      alt={story.farmer}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold">{story.farmer}</h3>
                      <p className="text-sm opacity-90">{story.location}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{story.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{story.subtitle}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <FaGlobe className="text-primary-600" />
                        <span>{story.impact.countries} countries</span>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        Read More →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of farmers who have transformed their lives through AgroValue Connect
              </p>
              <Link
                to="/register?role=farmer"
                className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition duration-300 inline-flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Story Modal */}
        <AnimatePresence>
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedStory(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64">
                  <img
                    src={selectedStory.coverImage}
                    alt={selectedStory.farmer}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/70 transition duration-300"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center space-x-4 mb-2">
                      <img
                        src={selectedStory.image}
                        alt={selectedStory.farmer}
                        className="w-16 h-16 rounded-full border-2 border-white"
                      />
                      <div>
                        <h2 className="text-2xl font-bold">{selectedStory.farmer}</h2>
                        <p className="opacity-90">{selectedStory.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedStory.title}</h3>
                  <p className="text-lg text-primary-600 mb-6">{selectedStory.subtitle}</p>
                  
                  <div className="bg-primary-50 rounded-xl p-6 mb-6">
                    <FaQuoteLeft className="text-3xl text-primary-300 mb-2" />
                    <p className="text-gray-700 italic text-lg">{selectedStory.quote}</p>
                  </div>

                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-600">{selectedStory.story}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary-600">{selectedStory.impact.revenue}</div>
                      <div className="text-sm text-gray-600">Revenue Growth</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary-600">{selectedStory.impact.customers}</div>
                      <div className="text-sm text-gray-600">Customers</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary-600">{selectedStory.impact.countries}</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary-600">{selectedStory.impact.employees}</div>
                      <div className="text-sm text-gray-600">Employees</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold mb-3">Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.products.map((product, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                    >
                      Close
                    </button>
                    <Link
                      to="/contact"
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition duration-300"
                    >
                      Connect with {selectedStory.farmer.split(' ')[0]}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SuccessStories;