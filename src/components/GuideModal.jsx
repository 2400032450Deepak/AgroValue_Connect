import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaDownload, FaShare, FaPrint, FaBookmark,
  FaRegBookmark, FaCheckCircle, FaLightbulb, FaExclamationTriangle,
  FaHeart, FaLeaf, FaShippingFast, FaUndo, FaSearch,
  FaShieldAlt, FaTruck, FaArrowRight, FaStar
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const GuideModal = ({ guide, onClose }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('guide');

  // Guide content based on title
  const getGuideContent = () => {
    const contents = {
      "How to Find Quality Products": {
        icon: FaSearch,
        color: "blue",
        sections: [
          {
            title: "🔍 Look for Verified Farmers",
            content: "All farmers on our platform go through a strict verification process. Look for the 'Verified Farmer' badge on seller profiles. This ensures you're buying from authentic sources."
          },
          {
            title: "📸 Examine Product Photos",
            content: "Quality sellers provide multiple high-resolution photos showing different angles. Look for images that show texture, color, and packaging details. Beware of stock photos!"
          },
          {
            title: "⭐ Check Reviews & Ratings",
            content: "Read through recent reviews, especially those with photos. Pay attention to comments about freshness, packaging, and delivery time. Look for patterns in feedback."
          },
          {
            title: "📋 Read Product Descriptions Carefully",
            content: "Quality listings include detailed information about origin, harvest date, processing methods, and storage instructions. Vague descriptions are red flags."
          },
          {
            title: "🏷️ Compare Prices",
            content: "If a price seems too good to be true, it probably is. Compare with similar products to ensure you're getting fair value without compromising quality."
          }
        ],
        tips: [
          "Always check the farmer's response rate",
          "Look for products with 'Organic' certification",
          "Check the 'Sold' count to gauge popularity",
          "Message farmers directly with questions"
        ],
        summary: "Finding quality products is about being an informed buyer. Use these guidelines to make confident purchases."
      },
      
      "Understanding Quality Labels": {
        icon: FaShieldAlt,
        color: "green",
        sections: [
          {
            title: "🌱 Organic Certification",
            content: "Products labeled 'Organic' meet strict standards: no synthetic pesticides, no GMOs, and sustainable farming practices. Look for USDA Organic, India Organic, or EU Organic logos."
          },
          {
            title: "🤝 Fair Trade Certified",
            content: "Fair Trade ensures farmers receive fair wages and work in safe conditions. It promotes community development and environmental sustainability."
          },
          {
            title: "🧬 Non-GMO Verified",
            content: "This label guarantees the product wasn't produced using genetic engineering. Look for the Non-GMO Project Verified seal."
          },
          {
            title: "🌾 Gluten-Free Certification",
            content: "Essential for those with celiac disease or gluten sensitivity. Certified products contain less than 20ppm of gluten."
          },
          {
            title: "🏔️ Geographical Indication (GI)",
            content: "GI tags identify products originating from specific regions with unique qualities. Examples include Darjeeling Tea, Basmati Rice, and Alphonso Mangoes."
          }
        ],
        tips: [
          "Multiple certifications often indicate higher quality",
          "Research what each certification means for your needs",
          "Some farmers may have pending certifications - ask them!",
          "Certifications can vary by country"
        ],
        summary: "Understanding these labels helps you make informed choices aligned with your values and health needs."
      },
      
      "Shipping & Delivery Guide": {
        icon: FaTruck,
        color: "purple",
        sections: [
          {
            title: "🚚 Shipping Methods",
            content: "We offer various shipping options: Standard (5-7 days), Express (2-3 days), and Priority (1-2 days). Some farmers may offer local pickup."
          },
          {
            title: "📦 Packaging Standards",
            content: "Farmers use appropriate packaging to maintain freshness: insulated boxes for perishables, vacuum sealing for dry goods, and protective layers for fragile items."
          },
          {
            title: "🌡️ Temperature Control",
            content: "Perishable items like dairy, meat, and some produce are shipped with ice packs or dry ice in insulated containers to maintain proper temperature."
          },
          {
            title: "🔍 Tracking Your Order",
            content: "Once shipped, you'll receive a tracking number via email. You can also track all orders in your dashboard under 'My Orders'."
          },
          {
            title: "⚠️ What to Do If Delivery Is Delayed",
            content: "If your order is delayed, first check tracking. If significantly delayed, contact support immediately. We'll work with the farmer to resolve the issue."
          }
        ],
        tips: [
          "Order perishables early in the week to avoid weekend delays",
          "Provide accurate delivery address and phone number",
          "Check weather conditions that might affect delivery",
          "Be available during estimated delivery window"
        ],
        summary: "Understanding our shipping process ensures your farm-fresh products arrive in perfect condition."
      },
      
      "Returns & Refunds Policy": {
        icon: FaUndo,
        color: "yellow",
        sections: [
          {
            title: "✅ 30-Day Satisfaction Guarantee",
            content: "We stand behind every purchase. If you're not satisfied with your order, you have 30 days from delivery to request a return or refund."
          },
          {
            title: "📸 Documenting Issues",
            content: "If products arrive damaged or not as described, take clear photos within 48 hours. This helps us process your claim quickly with the farmer."
          },
          {
            title: "🔄 Return Process",
            content: "Contact support to initiate a return. For perishable items, we may issue a refund without requiring return shipping to prevent waste."
          },
          {
            title: "💰 Refund Timeline",
            content: "Once approved, refunds are processed within 5-7 business days and will appear on your original payment method."
          },
          {
            title: "🤝 Quality Disputes",
            content: "If you believe product quality doesn't match description, our team will mediate between you and the farmer to find a fair resolution."
          }
        ],
        tips: [
          "Inspect packages immediately upon delivery",
          "Keep original packaging for photos",
          "Contact support before discarding damaged items",
          "Read seller's specific return policy (some may vary)"
        ],
        summary: "Your satisfaction is our priority. We make returns hassle-free so you can shop with confidence."
      }
    };

    return contents[guide.title] || {
      icon: FaSearch,
      color: "primary",
      sections: [
        {
          title: "Guide Content",
          content: guide.description
        }
      ],
      tips: ["Check back soon for detailed guide"],
      summary: guide.description
    };
  };

  const content = getGuideContent();
  const Icon = content.icon;

  const handleDownload = () => {
    const guideText = `
      ${guide.title}
      ${'='.repeat(guide.title.length)}
      
      ${guide.description}
      
      ${content.sections.map(s => `${s.title}\n${s.content}`).join('\n\n')}
      
      PRO TIPS:
      ${content.tips.map(t => `• ${t}`).join('\n')}
      
      ${content.summary}
      
      ---
      Downloaded from AgroValue Connect
    `;

    const blob = new Blob([guideText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${guide.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Guide downloaded!');
  };

  const handleShare = () => {
    const text = `Check out this guide: ${guide.title} on AgroValue Connect!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const savedGuides = JSON.parse(localStorage.getItem('savedGuides') || '[]');
    
    if (!isBookmarked) {
      savedGuides.push(guide.title);
      localStorage.setItem('savedGuides', JSON.stringify(savedGuides));
      toast.success('Guide saved to bookmarks!');
    } else {
      const updated = savedGuides.filter(g => g !== guide.title);
      localStorage.setItem('savedGuides', JSON.stringify(updated));
      toast.success('Guide removed from bookmarks');
    }
  };

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      gradient: 'from-blue-600 to-blue-700',
      light: 'bg-blue-100'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      gradient: 'from-green-600 to-green-700',
      light: 'bg-green-100'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      gradient: 'from-purple-600 to-purple-700',
      light: 'bg-purple-100'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      gradient: 'from-yellow-600 to-yellow-700',
      light: 'bg-yellow-100'
    },
    primary: {
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      text: 'text-primary-700',
      gradient: 'from-primary-600 to-primary-700',
      light: 'bg-primary-100'
    }
  };

  const colors = colorClasses[content.color] || colorClasses.primary;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white sticky top-0 z-10`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{guide.title}</h2>
                <p className="text-white/90 mt-1">{guide.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="border-b border-gray-200 px-6 py-3 flex flex-wrap gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <FaDownload />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <FaShare />
            <span>Share</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <FaPrint />
            <span>Print</span>
          </button>
          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              isBookmarked 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            <span>{isBookmarked ? 'Saved' : 'Save Guide'}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <nav className="flex space-x-6">
            <button
              onClick={() => setActiveTab('guide')}
              className={`py-4 px-2 font-medium border-b-2 transition ${
                activeTab === 'guide' 
                  ? `${colors.text} border-${colors.color}-600` 
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              Guide
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-4 px-2 font-medium border-b-2 transition ${
                activeTab === 'tips' 
                  ? `${colors.text} border-${colors.color}-600` 
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              Pro Tips
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'guide' && (
              <motion.div
                key="guide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {content.sections.map((section, idx) => (
                  <div key={idx} className={`${colors.bg} rounded-xl p-6`}>
                    <h3 className={`text-lg font-semibold ${colors.text} mb-3`}>
                      {section.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}

                <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
                  <div className="flex items-start space-x-3">
                    <FaLightbulb className="text-2xl text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Summary</h4>
                      <p className="text-gray-600">{content.summary}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tips' && (
              <motion.div
                key="tips"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className={`${colors.bg} rounded-xl p-6`}>
                  <h3 className={`text-lg font-semibold ${colors.text} mb-4 flex items-center`}>
                    <FaStar className="mr-2" /> Pro Tips for Buyers
                  </h3>
                  <div className="space-y-4">
                    {content.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <FaExclamationTriangle className="text-2xl text-yellow-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Important Note</h4>
                      <p className="text-gray-600">
                        These tips are based on experienced buyers' feedback. 
                        Always use your best judgment when making purchases.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Guide last updated: March 2024
            </p>
            <button
              onClick={onClose}
              className={`px-6 py-2 bg-gradient-to-r ${colors.gradient} text-white rounded-lg hover:shadow-lg transition`}
            >
              Close Guide
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GuideModal;