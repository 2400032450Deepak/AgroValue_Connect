import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockProducts = [
        {
          id: 1,
          name: 'Organic Wild Honey',
          farmer: 'Rajesh Kumar',
          location: 'Uttarakhand, India',
          price: 12.99,
          originalPrice: 15.99,
          rating: 4.8,
          reviews: 128,
          image: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=' ,
          isOrganic: true,
          isNew: true,
          discount: 20,
          category: 'honey',
          inStock: true,
          freeShipping: true
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
          category: 'pickles',
          inStock: true,
          freeShipping: true
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
          category: 'oils',
          inStock: true,
          freeShipping: false
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
          category: 'jaggery',
          inStock: true,
          freeShipping: true
        },
        {
          id: 5,
          name: 'Spice Mix - Garam Masala',
          farmer: 'Meera Singh',
          location: 'Rajasthan, India',
          price: 7.99,
          rating: 4.7,
          reviews: 198,
          image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
          isOrganic: true,
          category: 'spices',
          inStock: true,
          freeShipping: false
        },
        {
          id: 6,
          name: 'Premium Chana Dal',
          farmer: 'Krishna Reddy',
          location: 'Karnataka, India',
          price: 12.99,
          rating: 4.7,
          reviews: 82,
          image: 'https://m.media-amazon.com/images/I/51vdr3+AsWL._AC_UF894,1000_QL80_.jpg',
          isOrganic: true,
          category: 'pulses',
          inStock: true,
          freeShipping: true
        },
        {
          id: 7,
          name: 'Organic Basmati Rice',
          farmer: 'Harpreet Singh',
          location: 'Punjab, India',
          price: 24.99,
          rating: 4.8,
          reviews: 145,
          image: 'https://www.greendna.in/cdn/shop/products/basmati6_945x.jpg?v=1742283085',
          isOrganic: true,
          category: 'grains',
          inStock: true,
          freeShipping: true
        },
        {
          id: 8,
          name: 'Wood Pressed Groundnut Oil',
          farmer: 'Venkatesh Rao',
          location: 'Tamil Nadu, India',
          price: 19.99,
          rating: 4.6,
          reviews: 89,
          image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
          isOrganic: true,
          category: 'oils',
          inStock: true,
          freeShipping: false
        }
      ];

      // Apply filters
      let filteredProducts = [...mockProducts];
      
      if (filters.category && filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.farmer.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.organic) {
        filteredProducts = filteredProducts.filter(p => p.isOrganic);
      }
      
      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(p => p.inStock);
      }
      
      if (filters.freeShipping) {
        filteredProducts = filteredProducts.filter(p => p.freeShipping);
      }
      
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
      }
      
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
      }

      // Apply sorting
      if (filters.sortBy) {
        switch(filters.sortBy) {
          case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
          default:
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
        }
      }

      // Apply pagination
      const total = filteredProducts.length;
      const pages = Math.ceil(total / pagination.limit);
      const start = (pagination.page - 1) * pagination.limit;
      const paginatedProducts = filteredProducts.slice(start, start + pagination.limit);

      setProducts(paginatedProducts);
      setPagination(prev => ({
        ...prev,
        total,
        pages
      }));
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.page]);

  const getProductById = async (id) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Mock product detail
      const product = {
        id: parseInt(id),
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
        reviews: 128,
        description: 'Pure, raw, and unfiltered wild honey...',
        longDescription: 'Our organic wild honey is sourced from the deep forests...',
        images: [
          'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
          'https://images.unsplash.com/photo-1587049352846-9a8c5b7c3b9f',
          'https://images.unsplash.com/photo-1587049352847-9a8c5b7c3b9f',
          'https://images.unsplash.com/photo-1587049352848-9a8c5b7c3b9f'
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
        },
        reviews: [
          {
            id: 1,
            user: 'John Smith',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            rating: 5,
            date: '2024-01-15',
            comment: 'Best honey I\'ve ever tasted!',
            verified: true
          }
        ]
      };
      return product;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch product details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({});
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const goToPage = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  return {
    products,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    clearFilters,
    getProductById,
    goToPage
  };
};

export default useProducts;