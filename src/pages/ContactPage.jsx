import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram,
  FaPaperPlane, FaCheckCircle
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import HelmetTags from '../components/SEO/HelmetTags';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Message sent successfully!');
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: 'support@agrovalueconnect.com',
      subDetails: 'sales@agrovalueconnect.com',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      subDetails: 'Mon-Fri, 9am-6pm EST',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      details: '123 Agriculture Street',
      subDetails: 'New York, NY 10001, USA',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: 'Monday - Friday: 9am - 6pm',
      subDetails: 'Saturday: 10am - 4pm',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  const faqs = [
    {
      question: "How do I become a farmer on your platform?",
      answer: "Simply click 'Join as Farmer' and complete our verification process. You'll need to provide some basic information and proof of your farming activities."
    },
    {
      question: "What are the fees for using the platform?",
      answer: "We charge a small commission only when you make a sale. There are no listing fees or monthly charges. The first 3 months are completely free for new farmers."
    },
    {
      question: "How do you ensure product quality?",
      answer: "We have a strict verification process for farmers and products. Buyers can also leave reviews, and we regularly audit seller accounts to maintain quality standards."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we support international shipping. Shipping costs and times vary by location and are calculated at checkout."
    }
  ];

  return (
    <>
      <HelmetTags 
        title="Contact Us | AgroValue Connect"
        description="Get in touch with our team. We're here to help farmers and buyers with any questions about our platform."
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
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto opacity-90"
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-20">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition duration-300"
                  >
                    <div className={`${info.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`text-2xl ${info.textColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-gray-600 text-sm">{info.details}</p>
                    <p className="text-gray-500 text-sm">{info.subDetails}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                
                {submitted ? (
                  <div className="bg-green-50 rounded-xl p-8 text-center">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheckCircle className="text-4xl text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="small" color="white" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Map & Social */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                  <h3 className="text-xl font-bold mb-4">Our Location</h3>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147701455!2d-74.11976317304636!3d40.69740341795717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564612345!5m2!1sen!2s"
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: '0.75rem' }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                  <p className="text-gray-600">
                    123 Agriculture Street, New York, NY 10001, United States
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <p className="text-gray-600 mb-6">
                    Stay connected with us on social media for updates, success stories, and farming tips.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition duration-300"
                    >
                      <FaFacebook className="text-xl" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition duration-300"
                    >
                      <FaTwitter className="text-xl" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition duration-300"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition duration-300"
                    >
                      <FaInstagram className="text-xl" />
                    </a>
                  </div>
                </div>
              </motion.div>
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
                Find answers to common questions about our platform
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

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link
                to="/help"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <span>Visit our Help Center</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;