import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaStar, FaShoppingCart, FaHeart, FaRegHeart, 
  FaShare, FaCheckCircle, FaTruck, FaShieldAlt,
  FaLeaf, FaGlobe, FaAward, FaClock, FaMinus, FaPlus,
  FaImage, FaSpinner
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import HelmetTags from '../components/SEO/HelmetTags';
import { useCart } from '../context/CartContext';
import  {useAuth}  from '../context/AuthContext';
import toast from 'react-hot-toast';

// Placeholder image for products without images
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/600x400?text=No+Image+Available';
const PLACEHOLDER_AVATAR = 'https://via.placeholder.com/100x100?text=User';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Simulate API call with dynamic product data based on ID
    setTimeout(() => {
      // Create a product database with all products
      const productsDatabase = {
        1: {
          id: 1,
          name: 'Organic Wild Honey',
          farmer: 'Rajesh Kumar',
          farmerId: 101,
          farmerAvatar: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
          farmerRating: 4.9,
          farmerProducts: 12,
          location: 'Uttarakhand, India',
          price: 12.99,
          originalPrice: 15.99,
          rating: 4.8,
          reviews: [
            {
              id: 1,
              user: 'John Smith',
              avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
              rating: 5,
              date: '2024-01-15',
              comment: 'Best honey I\'ve ever tasted! You can really taste the difference with raw honey.',
              verified: true
            },
            {
              id: 2,
              user: 'Maria Garcia',
              avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
              rating: 5,
              date: '2024-01-14',
              comment: 'Amazing quality. My family loves it. Will definitely order again.',
              verified: true
            },
            {
              id: 3,
              user: 'Ahmed Hassan',
              avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
              rating: 4,
              date: '2024-01-12',
              comment: 'Good product but shipping took longer than expected.',
              verified: true
            }
          ],
          description: 'Pure, raw, and unfiltered wild honey harvested from the pristine forests of Uttarakhand. This honey is collected by indigenous communities using traditional methods, ensuring the highest quality and sustainability.',
          longDescription: 'Our organic wild honey is sourced from the deep forests of the Himalayas, where bees collect nectar from a variety of wildflowers. Unlike commercial honey, this is never heated or filtered, preserving all the natural goodness. It contains natural pollen, propolis, and enzymes that are beneficial for health.\n\nEach jar is hand-packed and sealed at the source, ensuring freshness and authenticity. The honey has a rich amber color and crystallizes naturally over time, which is a sign of its purity.',
          images: [
            'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
            'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352847-9a8c5b7c3b9f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352848-9a8c5b7c3b9f?w=600&h=400&fit=crop'
          ],
          isOrganic: true,
          isNew: true,
          discount: 20,
          category: 'honey',
          tags: ['raw', 'unfiltered', 'natural', 'wild', 'organic'],
          inStock: 150,
          minOrder: 1,
          maxOrder: 10,
          specifications: {
            weight: '500g',
            shelfLife: '24 months',
            storage: 'Store in cool, dry place',
            origin: 'Uttarakhand, India',
            certifications: ['Organic', 'Non-GMO', 'Fair Trade']
          },
          nutritionInfo: {
            servingSize: '21g (1 tbsp)',
            calories: 60,
            totalFat: 0,
            sodium: '0mg',
            totalCarb: '17g',
            protein: '0g'
          }
        },
        2: {
          id: 2,
          name: 'Handcrafted Mango Pickle',
          farmer: 'Priya Sharma',
          farmerId: 102,
          farmerAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          farmerRating: 4.8,
          farmerProducts: 8,
          location: 'Andhra Pradesh, India',
          price: 8.99,
          originalPrice: null,
          rating: 4.9,
          reviews: [
            {
              id: 1,
              user: 'Priya Patel',
              avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
              rating: 5,
              date: '2024-02-10',
              comment: 'Reminds me of my grandmother\'s pickle! So authentic.',
              verified: true
            },
            {
              id: 2,
              user: 'Rahul Singh',
              avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
              rating: 5,
              date: '2024-02-05',
              comment: 'Perfect spice level. Goes well with everything.',
              verified: true
            }
          ],
          description: 'Traditional handcrafted mango pickle made with family recipe passed down through generations. Uses raw, firm mangoes and a special blend of spices for that authentic taste.',
          longDescription: 'Our mango pickle is made using traditional methods that have been in our family for over 50 years. We select the finest raw mangoes, cut them by hand, and mix them with a secret blend of spices including mustard seeds, fenugreek, red chili powder, and asafoetida. The pickle is then left to mature in the sun for 7 days, allowing the flavors to develop fully.\n\nNo preservatives or artificial colors are used. The result is a tangy, spicy pickle that perfectly complements any meal.',
          images: [
            'https://avakaayapickleshouse.com/wp-content/uploads/2024/10/Mango-pickle-6_2_11zon.webp',
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352847-9a8c5b7c3b9f?w=600&h=400&fit=crop'
          ],
          isOrganic: true,
          isNew: false,
          discount: 0,
          category: 'pickles',
          tags: ['traditional', 'spicy', 'homemade', 'mango'],
          inStock: 75,
          minOrder: 2,
          maxOrder: 20,
          specifications: {
            weight: '500g',
            shelfLife: '12 months',
            storage: 'Refrigerate after opening',
            origin: 'Andhra Pradesh, India',
            certifications: ['Organic', 'Traditional']
          },
          nutritionInfo: {
            servingSize: '15g',
            calories: 35,
            totalFat: 2,
            sodium: '180mg',
            totalCarb: '3g',
            protein: '1g'
          }
        },
        3: {
          id: 3,
          name: 'Cold-Pressed Almond Oil',
          farmer: 'Amit Patel',
          farmerId: 103,
          farmerAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
          farmerRating: 4.7,
          farmerProducts: 15,
          location: 'California, USA',
          price: 15.99,
          originalPrice: null,
          rating: 4.7,
          reviews: [
            {
              id: 1,
              user: 'Sarah Johnson',
              avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
              rating: 5,
              date: '2024-01-28',
              comment: 'Great quality oil. Use it for my salads and also as a moisturizer.',
              verified: true
            },
            {
              id: 2,
              user: 'Michael Chen',
              avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
              rating: 4,
              date: '2024-01-20',
              comment: 'Good product, slightly expensive but worth it.',
              verified: true
            }
          ],
          description: 'Premium cold-pressed almond oil extracted from high-quality California almonds. Retains all natural nutrients and has a light, nutty flavor perfect for cooking and skincare.',
          longDescription: 'Our almond oil is made using traditional cold-press methods. The almonds are slowly pressed at low temperatures to extract the oil without damaging the natural nutrients. This preserves the vitamin E, healthy fats, and antioxidants that make almond oil so beneficial.\n\nUnlike refined oils, our cold-pressed almond oil retains its natural aroma and flavor. It\'s perfect for salad dressings, low-heat cooking, or as a moisturizer for skin and hair.',
          images: [
            'https://healthyroots.com/cdn/shop/files/ColdPressedAlmondoils.jpg?v=1763794735',
            'https://images.unsplash.com/photo-1519591095661-9e5e2f6c9d5b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f?w=600&h=400&fit=crop'
          ],
          isOrganic: false,
          isNew: true,
          discount: 0,
          category: 'oils',
          tags: ['virgin', 'chemical-free', 'cold-pressed'],
          inStock: 30,
          minOrder: 1,
          maxOrder: 5,
          specifications: {
            weight: '250ml',
            shelfLife: '18 months',
            storage: 'Store in cool, dark place',
            origin: 'California, USA',
            certifications: ['Non-GMO', 'Gluten-Free']
          },
          nutritionInfo: {
            servingSize: '14g (1 tbsp)',
            calories: 120,
            totalFat: 14,
            sodium: '0mg',
            totalCarb: '0g',
            protein: '0g'
          }
        },
        4: {
          id: 4,
          name: 'Traditional Jaggery',
          farmer: 'Sunita Devi',
          farmerId: 104,
          farmerAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
          farmerRating: 4.6,
          farmerProducts: 10,
          location: 'Uttar Pradesh, India',
          price: 6.99,
          originalPrice: 8.99,
          rating: 4.6,
          reviews: [
            {
              id: 1,
              user: 'Anita Desai',
              avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
              rating: 5,
              date: '2024-02-01',
              comment: 'Much better than the jaggery powder from stores. Real traditional taste.',
              verified: true
            },
            {
              id: 2,
              user: 'Vikram Mehta',
              avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
              rating: 4,
              date: '2024-01-25',
              comment: 'Good quality. Using it in my tea instead of sugar.',
              verified: true
            }
          ],
          description: 'Traditional organic jaggery made from sugarcane juice using age-old methods. A healthy alternative to refined sugar, rich in minerals and iron.',
          longDescription: 'Our jaggery is made the traditional way - sugarcane juice is boiled in large pans until it thickens, then poured into molds to set. This process retains all the natural minerals and nutrients that are lost in refined sugar production.\n\nRich in iron, magnesium, and potassium, jaggery is considered a healthy sweetener in Ayurveda. It has a complex, caramel-like flavor that adds depth to sweets, teas, and traditional recipes.',
          images: [
            'https://img.freepik.com/free-vector/organic-jaggery-powder-blocks-with-fresh-sugar-cane-color-background-realistic-vector-illustration_1284-78025.jpg',
            'https://images.unsplash.com/photo-1587049352847-9a8c5b7c3b9f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352848-9a8c5b7c3b9f?w=600&h=400&fit=crop'
          ],
          isOrganic: true,
          isNew: false,
          discount: 15,
          category: 'jaggery',
          tags: ['organic', 'chemical-free', 'traditional'],
          inStock: 200,
          minOrder: 3,
          maxOrder: 50,
          specifications: {
            weight: '1kg',
            shelfLife: '24 months',
            storage: 'Store in airtight container',
            origin: 'Uttar Pradesh, India',
            certifications: ['Organic', 'Fair Trade']
          },
          nutritionInfo: {
            servingSize: '20g',
            calories: 76,
            totalFat: 0,
            sodium: '2mg',
            totalCarb: '18g',
            protein: '0.2g'
          }
        },
        5: {
          id: 5,
          name: 'Spice Mix - Garam Masala',
          farmer: 'Meera Singh',
          farmerId: 105,
          farmerAvatar: 'https://randomuser.me/api/portraits/women/11.jpg',
          farmerRating: 4.7,
          farmerProducts: 6,
          location: 'Rajasthan, India',
          price: 7.99,
          originalPrice: null,
          rating: 4.7,
          reviews: [
            {
              id: 1,
              user: 'Rajiv Khanna',
              avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
              rating: 5,
              date: '2024-02-15',
              comment: 'The most authentic garam masala I\'ve found! Aroma is incredible.',
              verified: true
            },
            {
              id: 2,
              user: 'Neha Gupta',
              avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
              rating: 4,
              date: '2024-02-08',
              comment: 'Very fresh and fragrant. Makes my curries taste restaurant-quality.',
              verified: true
            }
          ],
          description: 'Authentic garam masala blend made from freshly roasted spices. No preservatives, no fillers - just pure aromatic spices ground to perfection.',
          longDescription: 'Our garam masala is made using a traditional family recipe that has been perfected over generations. We start with whole spices - cardamom, cinnamon, cloves, cumin, coriander, and black pepper - which are gently roasted to release their essential oils before being ground.\n\nThe result is a fragrant, complex spice blend that adds depth and warmth to any dish. Use it in curries, lentil dishes, or even sprinkle on roasted vegetables for an Indian twist.',
          images: [
            'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1596090906393-4b5b5a5a5a5a?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f?w=600&h=400&fit=crop'
          ],
          isOrganic: true,
          isNew: false,
          discount: 0,
          category: 'spices',
          tags: ['authentic', 'fresh', 'aromatic', 'blend'],
          inStock: 120,
          minOrder: 2,
          maxOrder: 20,
          specifications: {
            weight: '100g',
            shelfLife: '12 months',
            storage: 'Store in airtight container away from sunlight',
            origin: 'Rajasthan, India',
            certifications: ['Organic', 'Gluten-Free']
          },
          nutritionInfo: {
            servingSize: '2g',
            calories: 8,
            totalFat: 0.3,
            sodium: '1mg',
            totalCarb: '1.5g',
            protein: '0.3g'
          }
        },
        6: {
          id: 6,
          name: 'Premium Chana Dal',
          farmer: 'Krishna Reddy',
          farmerId: 106,
          farmerAvatar: 'https://randomuser.me/api/portraits/men/14.jpg',
          farmerRating: 4.7,
          farmerProducts: 9,
          location: 'Karnataka, India',
          price: 12.99,
          originalPrice: null,
          rating: 4.7,
          reviews: [
            {
              id: 1,
              user: 'Lakshmi Narayan',
              avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
              rating: 5,
              date: '2024-02-12',
              comment: 'High quality dal, cooks evenly and has great texture.',
              verified: true
            },
            {
              id: 2,
              user: 'Prakash Rao',
              avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
              rating: 4,
              date: '2024-02-03',
              comment: 'Fresh and clean. No stones or impurities.',
              verified: true
            }
          ],
          description: 'Premium quality chana dal (split chickpeas) sourced directly from farms. Carefully cleaned, sorted, and packed to ensure the highest quality.',
          longDescription: 'Our chana dal is sourced from family farms in Karnataka where it is grown using traditional methods. After harvest, the chickpeas are sun-dried, split, and then meticulously cleaned to remove any stones or imperfect grains.\n\nThe result is a uniformly sized, golden-yellow dal that cooks evenly and has a wonderful nutty flavor. Perfect for making traditional Indian dishes like chana dal fry, vada, or even sweet dishes like payasam.',
          images: [
            'https://m.media-amazon.com/images/I/51vdr3+AsWL._AC_UF894,1000_QL80_.jpg',
            'https://images.unsplash.com/photo-1586201375761-83865001e8c7?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352847-9a8c5b7c3b9f?w=600&h=400&fit=crop'
          ],
          isOrganic: true,
          isNew: false,
          discount: 0,
          category: 'pulses',
          tags: ['authentic', 'raw', 'pulses', 'protein-rich'],
          inStock: 1000,
          minOrder: 50,
          maxOrder: 500,
          specifications: {
            weight: '1kg',
            shelfLife: '24 months',
            storage: 'Store in cool, dry place',
            origin: 'Karnataka, India',
            certifications: ['Organic', 'Non-GMO']
          },
          nutritionInfo: {
            servingSize: '100g (cooked)',
            calories: 127,
            totalFat: 0.5,
            sodium: '5mg',
            totalCarb: '22g',
            protein: '7g'
          }
        },
        7: {
          id: 7,
          name: 'Organic Basmati Rice',
          farmer: 'Harpreet Singh',
          farmerId: 107,
          farmerAvatar: 'https://randomuser.me/api/portraits/men/17.jpg',
          farmerRating: 4.8,
          farmerProducts: 5,
          location: 'Punjab, India',
          price: 24.99,
          originalPrice: null,
          rating: 4.8,
          reviews: [
            {
              id: 1,
              user: 'Simran Kaur',
              avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
              rating: 5,
              date: '2024-02-14',
              comment: 'The aroma of this rice while cooking is amazing! Perfect for biryani.',
              verified: true
            },
            {
              id: 2,
              user: 'Arjun Singh',
              avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
              rating: 5,
              date: '2024-02-07',
              comment: 'Long grains, cooks perfectly without becoming mushy.',
              verified: true
            }
          ],
          description: 'Premium aged basmati rice from the foothills of the Himalayas. Known for its distinctive aroma, long grains, and perfect texture when cooked.',
          longDescription: 'Our basmati rice is grown in the traditional basmati belt of Punjab, where the unique climate and soil conditions create the world\'s most aromatic rice. The paddy is aged for 12-18 months to enhance its flavor and cooking properties.\n\nEach grain is long, slender, and expands to more than twice its length when cooked. The rice has a distinctive nutty aroma and stays fluffy and separate - perfect for biryanis, pulaos, or as an everyday rice.',
          images: [
            'https://www.greendna.in/cdn/shop/products/basmati6_945x.jpg?v=1742283085',
            'https://images.unsplash.com/photo-1586201375761-83865001e8c7?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352847-9a8c5b7c3b9f?w=600&h=400&fit=crop'
          ],
          isOrganic: true,
          isNew: true,
          discount: 0,
          category: 'grains',
          tags: ['aged', 'aromatic', 'premium', 'long-grain'],
          inStock: 500,
          minOrder: 1,
          maxOrder: 20,
          specifications: {
            weight: '5kg',
            shelfLife: '24 months',
            storage: 'Store in airtight container',
            origin: 'Punjab, India',
            certifications: ['Organic', 'Non-GMO']
          },
          nutritionInfo: {
            servingSize: '100g (cooked)',
            calories: 130,
            totalFat: 0.3,
            sodium: '1mg',
            totalCarb: '28g',
            protein: '2.7g'
          }
        },
        8: {
          id: 8,
          name: 'Wood Pressed Groundnut Oil',
          farmer: 'Venkatesh Rao',
          farmerId: 108,
          farmerAvatar: 'https://randomuser.me/api/portraits/men/20.jpg',
          farmerRating: 4.6,
          farmerProducts: 7,
          location: 'Tamil Nadu, India',
          price: 19.99,
          originalPrice: null,
          rating: 4.6,
          reviews: [
            {
              id: 1,
              user: 'Lakshmi Krishnan',
              avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
              rating: 5,
              date: '2024-02-09',
              comment: 'The authentic taste of wood-pressed oil! Brings back childhood memories.',
              verified: true
            },
            {
              id: 2,
              user: 'Sundar Rajan',
              avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
              rating: 4,
              date: '2024-02-01',
              comment: 'Good quality oil. You can really taste the difference from refined oils.',
              verified: true
            }
          ],
          description: 'Traditional wood-pressed groundnut oil made using a 100-year-old wooden ghani. Retains all the natural nutrients and authentic flavor.',
          longDescription: 'Our groundnut oil is made the traditional way - using a wooden ghani (press) that slowly crushes roasted peanuts to extract the oil. This gentle, slow process does not generate heat, so all the natural nutrients, antioxidants, and flavor are preserved.\n\nThe oil has a rich, nutty aroma and golden color. Unlike chemically refined oils, our wood-pressed oil contains no solvents or preservatives. It\'s perfect for everyday cooking, especially for deep frying where it imparts a wonderful flavor.',
          images: [
            'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1519591095661-9e5e2f6c9d5b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1587049352847-9a8c5b7c3b9f?w=600&h=400&fit=crop'
          ],
          isOrganic: true,
          isNew: false,
          discount: 0,
          category: 'oils',
          tags: ['cold-pressed', 'chemical-free', 'traditional', 'wood-pressed'],
          inStock: 200,
          minOrder: 1,
          maxOrder: 10,
          specifications: {
            weight: '1L',
            shelfLife: '12 months',
            storage: 'Store in cool, dark place',
            origin: 'Tamil Nadu, India',
            certifications: ['Traditional', 'Non-GMO']
          },
          nutritionInfo: {
            servingSize: '14g (1 tbsp)',
            calories: 119,
            totalFat: 13.5,
            sodium: '0mg',
            totalCarb: '0g',
            protein: '0g'
          }
        }
      };

      // Get the product based on ID
      const productData = productsDatabase[id];
      
      if (productData) {
        setProduct(productData);
        
        // Create array of all products for related section
        const allProducts = Object.values(productsDatabase);
        
        // Filter out current product and shuffle to get random 3
        const related = allProducts
          .filter(p => p.id !== parseInt(id))
          .sort(() => 0.5 - Math.random()) // Shuffle array
          .slice(0, 3);
        
        setRelatedProducts(related);
      } else {
        // Product not found - redirect to products page
        navigate('/products');
        toast.error('Product not found');
        return;
      }
      
      setLoading(false);
    }, 1000);
  }, [id, navigate]);

  const handleImageError = (imageIndex) => {
    setImageErrors(prev => ({ ...prev, [imageIndex]: true }));
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login?redirect=/product/' + id);
      return;
    }

    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setTimeout(() => setIsAddingToCart(false), 500);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login?redirect=/checkout');
      return;
    }
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Product link copied to clipboard!');
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'reviews', label: `Reviews (${product?.reviews?.length || 0})` }
  ];

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
            >
              Browse Products
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HelmetTags 
        title={`${product.name} | AgroValue Connect`}
        description={product.description}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 mt-16">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center mb-8 text-sm">
            <a href="/" className="text-gray-600 hover:text-primary-600">Home</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="/products" className="text-gray-600 hover:text-primary-600">Products</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href={`/category/${product.category}`} className="text-gray-600 hover:text-primary-600 capitalize">{product.category}</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
          </nav>

          {/* Main Product Section */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div>
                <div className="mb-4 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={imageErrors[`main-${selectedImage}`] ? PLACEHOLDER_IMAGE : product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-64 md:h-96 object-cover"
                    onError={() => handleImageError(`main-${selectedImage}`)}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 md:gap-4">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`border-2 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={imageErrors[`thumb-${index}`] ? PLACEHOLDER_IMAGE : img} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-16 md:h-20 object-cover"
                        onError={() => handleImageError(`thumb-${index}`)}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-6">
                  {product.isNew && (
                    <span className="bg-secondary-500 text-white text-xs md:text-sm px-3 py-1 rounded-full inline-block mb-4">
                      New Arrival
                    </span>
                  )}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                  
                  {/* Farmer Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.farmerAvatar} 
                        alt={product.farmer} 
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PLACEHOLDER_AVATAR;
                        }}
                      />
                      <div>
                        <p className="text-sm text-gray-600">Sold by</p>
                        <a href={`/farmer/${product.farmerId}`} className="font-semibold text-primary-600 hover:underline">
                          {product.farmer}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{product.farmerRating}</span>
                      <span className="text-gray-600">({product.farmerProducts} products)</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews?.length || 0} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end flex-wrap">
                      <span className="text-3xl md:text-4xl font-bold text-primary-600">${product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="ml-3 text-lg md:text-xl text-gray-400 line-through">${product.originalPrice}</span>
                          <span className="ml-3 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs md:text-sm font-semibold">
                            Save {product.discount}%
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-green-600 mt-1">+ Free Shipping on orders over $50</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Short Description */}
                  <div className="mb-6">
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                          className="px-3 py-2 hover:bg-gray-100 transition"
                          disabled={quantity <= product.minOrder}
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(Math.min(product.maxOrder, quantity + 1))}
                          className="px-3 py-2 hover:bg-gray-100 transition"
                          disabled={quantity >= product.maxOrder}
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">{product.inStock} available</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                      className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-primary-700 transition duration-300 disabled:opacity-50"
                    >
                      {isAddingToCart ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <FaShoppingCart />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 bg-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition duration-300"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-600" />}
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                      aria-label="Share product"
                    >
                      <FaShare className="text-gray-600" />
                    </button>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                    <div className="text-center">
                      <FaTruck className="text-2xl text-primary-600 mx-auto mb-2" />
                      <p className="text-xs md:text-sm font-medium">Free Shipping</p>
                      <p className="text-xs text-gray-500">On orders $50+</p>
                    </div>
                    <div className="text-center">
                      <FaShieldAlt className="text-2xl text-primary-600 mx-auto mb-2" />
                      <p className="text-xs md:text-sm font-medium">Secure Payment</p>
                      <p className="text-xs text-gray-500">100% secure</p>
                    </div>
                    <div className="text-center">
                      <FaClock className="text-2xl text-primary-600 mx-auto mb-2" />
                      <p className="text-xs md:text-sm font-medium">24/7 Support</p>
                      <p className="text-xs text-gray-500">Dedicated support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-8">
            <div className="border-b mb-6 overflow-x-auto">
              <nav className="flex space-x-4 md:space-x-8 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 font-medium border-b-2 transition-colors duration-300 whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="prose max-w-none">
              {activeTab === 'description' && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Product Details</h4>
                  <p className="text-gray-600 whitespace-pre-line">{product.longDescription}</p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Specifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b pb-2">
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                        <span className="text-gray-600">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Nutrition Information</h4>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm text-gray-600 mb-4">Serving Size: {product.nutritionInfo.servingSize}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Calories</span>
                        <span className="font-semibold">{product.nutritionInfo.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Fat</span>
                        <span className="font-semibold">{product.nutritionInfo.totalFat}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sodium</span>
                        <span className="font-semibold">{product.nutritionInfo.sodium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Carbohydrates</span>
                        <span className="font-semibold">{product.nutritionInfo.totalCarb}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein</span>
                        <span className="font-semibold">{product.nutritionInfo.protein}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {/* Review Summary */}
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-primary-600">{product.rating}</div>
                      <div className="flex text-yellow-400 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Based on {product.reviews.length} reviews</p>
                    </div>
                    
                    <div className="flex-1 w-full">
                      {[5,4,3,2,1].map(rating => (
                        <div key={rating} className="flex items-center space-x-2 mb-2">
                          <span className="text-sm w-8">{rating} star</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-yellow-400 rounded-full" 
                              style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">
                            {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Write Review Button */}
                  {user && (
                    <button className="mb-8 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300">
                      Write a Review
                    </button>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {product.reviews.map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={review.avatar} 
                              alt={review.user} 
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = PLACEHOLDER_AVATAR;
                              }}
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">{review.user}</span>
                                {review.verified && (
                                  <span className="flex items-center space-x-1 text-green-600 text-sm">
                                    <FaCheckCircle />
                                    <span>Verified Purchase</span>
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 ml-14">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;