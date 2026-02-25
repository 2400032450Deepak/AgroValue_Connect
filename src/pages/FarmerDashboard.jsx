import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBox, FaShoppingCart, FaChartLine, FaUsers,
  FaCheckCircle, FaTimesCircle, FaBan, FaTrash, FaEdit,
  FaEye, FaMoneyBillWave, FaStar, FaClipboardList,
  FaStore, FaCog, FaDownload, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaFilter,
  FaSync, FaFileExport, FaPlus, FaWarehouse, FaStarHalfAlt,
  FaStoreAlt, FaTimes, FaUser, FaTruck, FaClock,
  FaExclamationTriangle, FaHeart, FaRegHeart, FaShare,
  FaSpinner, FaHistory, FaCheck
} from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProductModal from '../components/ProductModal';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const FarmerDashboard = () => {
  const { user, isFarmer } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  
  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(false);
  
  // Modal States
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Generate unique product ID
  const generateProductId = () => {
    return Math.max(...products.map(p => p.id), 0) + 1;
  };

  // Set active tab based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/farmer/products')) setActiveTab('products');
    else if (path.includes('/farmer/orders')) setActiveTab('orders');
    else if (path.includes('/farmer/analytics')) setActiveTab('analytics');
    else if (path.includes('/farmer/customers')) setActiveTab('customers');
    else if (path.includes('/farmer/inventory')) setActiveTab('inventory');
    else if (path.includes('/farmer/reviews')) setActiveTab('reviews');
    else if (path.includes('/farmer/store')) setActiveTab('store');
    else if (path.includes('/farmer/settings')) setActiveTab('settings');
    else setActiveTab('overview');
  }, [location]);

  // Redirect if not farmer
  if (!isFarmer) {
    return <Navigate to="/" replace />;
  }

  // ========== DATA WITH LOCALSTORAGE PERSISTENCE ==========

  // Stats data
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('farmerStats');
    return saved ? JSON.parse(saved) : {
      totalProducts: 24,
      totalOrders: 156,
      totalRevenue: 24590,
      averageRating: 4.8,
      pendingOrders: 8,
      processingOrders: 12,
      shippedOrders: 25,
      deliveredOrders: 111,
      newCustomers: 45,
      returningCustomers: 89,
      lowStockItems: 6,
      outOfStockItems: 2,
      totalViews: 24500,
      conversionRate: 3.8,
      avgOrderValue: 42.50
    };
  });

  // Products data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('farmerProducts');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'Organic Wild Honey', 
        price: 12.99, 
        originalPrice: 15.99,
        stock: 150, 
        sold: 128,
        revenue: 1662.72,
        status: 'active',
        image: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
        category: 'Honey',
        rating: 4.8,
        views: 1245,
        description: 'Pure organic honey from the Himalayas',
        createdAt: '2024-01-01',
        isOrganic: true,
        discount: 20,
        tags: ['raw', 'unfiltered', 'natural']
      },
      { 
        id: 2, 
        name: 'Handmade Mango Pickle', 
        price: 8.99, 
        stock: 75, 
        sold: 256,
        revenue: 2301.44,
        status: 'active',
        image: 'https://avakaayapickleshouse.com/wp-content/uploads/2024/10/Mango-pickle-6_2_11zon.webp',
        category: 'Pickles',
        rating: 4.9,
        views: 2341,
        description: 'Traditional homemade mango pickle',
        createdAt: '2024-01-05',
        isOrganic: true,
        tags: ['traditional', 'spicy', 'homemade']
      },
      { 
        id: 3, 
        name: 'Cold-Pressed Almond Oil', 
        price: 15.99, 
        stock: 30, 
        sold: 89,
        revenue: 1423.11,
        status: 'low-stock',
        image: 'https://healthyroots.com/cdn/shop/files/ColdPressedAlmondoils.jpg?v=1763794735',
        category: 'Oils',
        rating: 4.7,
        views: 876,
        description: 'Pure cold-pressed almond oil',
        createdAt: '2024-01-10',
        isOrganic: false,
        tags: ['virgin', 'chemical-free']
      },
      { 
        id: 4, 
        name: 'Traditional Jaggery', 
        price: 6.99, 
        originalPrice: 8.99,
        stock: 200, 
        sold: 167,
        revenue: 1167.33,
        status: 'active',
        image: 'https://img.freepik.com/free-vector/organic-jaggery-powder-blocks-with-fresh-sugar-cane-color-background-realistic-vector-illustration_1284-78025.jpg',
        category: 'Jaggery',
        rating: 4.6,
        views: 1023,
        description: 'Organic jaggery from sugarcane',
        createdAt: '2024-01-12',
        isOrganic: true,
        discount: 15,
        tags: ['organic', 'natural']
      }
    ];
  });

  // Orders data
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('farmerOrders');
    return saved ? JSON.parse(saved) : [
      { id: '#ORD-001', customer: 'John Smith', products: 3, total: 45.99, status: 'pending', date: '2024-01-15', items: ['Organic Wild Honey', 'Handmade Mango Pickle'] },
      { id: '#ORD-002', customer: 'Maria Garcia', products: 2, total: 23.50, status: 'processing', date: '2024-01-14', items: ['Cold-Pressed Almond Oil'] },
      { id: '#ORD-003', customer: 'Ahmed Hassan', products: 5, total: 89.75, status: 'shipped', date: '2024-01-13', items: ['Organic Wild Honey', 'Handmade Mango Pickle', 'Cold-Pressed Almond Oil'] },
      { id: '#ORD-004', customer: 'Sarah Johnson', products: 1, total: 12.99, status: 'delivered', date: '2024-01-12', items: ['Organic Wild Honey'] },
      { id: '#ORD-005', customer: 'Chen Wei', products: 4, total: 67.25, status: 'delivered', date: '2024-01-11', items: ['Handmade Mango Pickle', 'Cold-Pressed Almond Oil'] },
      { id: '#ORD-006', customer: 'Priya Patel', products: 2, total: 27.98, status: 'pending', date: '2024-01-16', items: ['Traditional Jaggery'] }
    ];
  });

  // Customers data (derived from orders)
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('farmerCustomers');
    if (saved) return JSON.parse(saved);
    
    // Generate from orders
    const customerMap = {};
    orders.forEach(order => {
      if (!customerMap[order.customer]) {
        customerMap[order.customer] = {
          id: Object.keys(customerMap).length + 1,
          name: order.customer,
          email: `${order.customer.toLowerCase().replace(' ', '.')}@example.com`,
          phone: '+1 234 567 8900',
          location: 'New York, USA',
          totalOrders: 1,
          totalSpent: order.total,
          lastOrder: order.date,
          avatar: `https://ui-avatars.com/api/?name=${order.customer}&background=4caf50&color=fff`,
          status: 'active'
        };
      } else {
        customerMap[order.customer].totalOrders += 1;
        customerMap[order.customer].totalSpent += order.total;
        if (new Date(order.date) > new Date(customerMap[order.customer].lastOrder)) {
          customerMap[order.customer].lastOrder = order.date;
        }
      }
    });
    return Object.values(customerMap);
  });

  // Reviews data
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('farmerReviews');
    return saved ? JSON.parse(saved) : [
      { id: 1, productId: 1, productName: 'Organic Wild Honey', user: 'John Smith', rating: 5, date: '2024-02-15', comment: 'Excellent quality honey! Very pure and authentic taste.', verified: true, helpful: 12 },
      { id: 2, productId: 1, productName: 'Organic Wild Honey', user: 'Maria Garcia', rating: 4, date: '2024-02-10', comment: 'Good product, delivery was fast.', verified: true, helpful: 8 },
      { id: 3, productId: 2, productName: 'Handmade Mango Pickle', user: 'Ahmed Hassan', rating: 5, date: '2024-02-08', comment: 'Just like homemade! Perfect spice level.', verified: true, helpful: 15 },
      { id: 4, productId: 3, productName: 'Cold-Pressed Almond Oil', user: 'Sarah Johnson', rating: 4, date: '2024-02-05', comment: 'Good quality oil, but packaging could be better.', verified: true, helpful: 5 }
    ];
  });

  // Store data
  const [storeData, setStoreData] = useState(() => {
    const saved = localStorage.getItem('farmerStoreData');
    return saved ? JSON.parse(saved) : {
      storeName: user?.farmName || `${user?.name}'s Farm`,
      tagline: 'Fresh from farm to your table',
      description: 'We are a family-owned farm dedicated to producing high-quality organic products using traditional methods.',
      address: '123 Farm Road, Uttarakhand, India',
      phone: '+91 98765 43210',
      email: user?.email || 'farmer@example.com',
      website: 'www.myfarmstore.com',
      established: '2020',
      socialMedia: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com'
      },
      businessHours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      shippingPolicy: 'Free shipping on orders over $50. International shipping available.',
      returnPolicy: '30-day return policy for unopened products.',
      certifications: ['Organic', 'Non-GMO', 'Fair Trade'],
      paymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer']
    };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('farmerStats', JSON.stringify(stats));
    localStorage.setItem('farmerProducts', JSON.stringify(products));
    localStorage.setItem('farmerOrders', JSON.stringify(orders));
    localStorage.setItem('farmerCustomers', JSON.stringify(customers));
    localStorage.setItem('farmerReviews', JSON.stringify(reviews));
    localStorage.setItem('farmerStoreData', JSON.stringify(storeData));
  }, [stats, products, orders, customers, reviews, storeData]);

  // ========== FILTER FUNCTIONS ==========

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredOrders = orders.filter(order => {
    return order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredCustomers = customers.filter(customer => {
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredReviews = reviews.filter(review => {
    return review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           review.user.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // ========== CHART DATA ==========

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 2500, 4200, 3800],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const categoryData = {
    labels: ['Honey', 'Pickles', 'Oils', 'Jaggery'],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
      x: { grid: { display: false } }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    cutout: '60%'
  };

  // ========== HELPER FUNCTIONS ==========

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return FaClock;
      case 'processing': return FaTruck;
      case 'shipped': return FaTruck;
      case 'delivered': return FaCheckCircle;
      default: return FaClock;
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock < 50) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  // ========== ACTION HANDLERS ==========

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Data refreshed!');
    }, 1000);
  };

  const handleExportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      farmer: user?.name,
      stats,
      products: products.length,
      orders: orders.length,
      revenue: stats.totalRevenue
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farmer-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Report exported!');
  };

  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleAddProductSubmit = (productData) => {
    const newProduct = {
      id: generateProductId(),
      ...productData,
      sold: 0,
      revenue: 0,
      rating: 0,
      views: 0,
      status: productData.stock > 0 ? 'active' : 'out-of-stock',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [...prev, newProduct]);
    setShowAddProduct(false);
    toast.success('Product added successfully!');
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProduct(true);
  };

  const handleEditProductSubmit = (productData) => {
    setProducts(prev => prev.map(p => 
      p.id === productData.id ? { ...p, ...productData } : p
    ));
    setShowEditProduct(false);
    setSelectedProduct(null);
    toast.success('Product updated successfully!');
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success('Product deleted');
    }
  };

  const handleUpdateStock = (productId, newStock) => {
    const product = products.find(p => p.id === productId);
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, stock: parseInt(newStock) } : p
    );
    setProducts(updatedProducts);
    toast.success('Stock updated');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleHelpful = (reviewId) => {
    setReviews(prev => prev.map(r => 
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
    toast.success('Thanks for your feedback!');
  };

  const handleSaveStore = () => {
    localStorage.setItem('farmerStoreData', JSON.stringify(storeData));
    toast.success('Store settings saved!');
  };

  // ========== TABS CONFIGURATION ==========

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine, path: '/farmer' },
    { id: 'products', label: 'Products', icon: FaBox, path: '/farmer/products' },
    { id: 'orders', label: 'Orders', icon: FaShoppingCart, path: '/farmer/orders' },
    { id: 'inventory', label: 'Inventory', icon: FaWarehouse, path: '/farmer/inventory' },
    { id: 'reviews', label: 'Reviews', icon: FaStar, path: '/farmer/reviews' },
    { id: 'customers', label: 'Customers', icon: FaUsers, path: '/farmer/customers' },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine, path: '/farmer/analytics' },
    { id: 'store', label: 'Store', icon: FaStoreAlt, path: '/farmer/store' },
    { id: 'settings', label: 'Settings', icon: FaCog, path: '/farmer/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="farmer" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Farmer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}! Manage your farm and products</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleRefresh}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button 
              onClick={handleExportReport}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <FaFileExport />
              <span>Export</span>
            </button>
            {activeTab === 'products' && (
              <button 
                onClick={handleAddProduct}
                className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                <FaPlus />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Cards - Only show on overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link to="/farmer/products" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-xl transition transform hover:scale-105">
              <FaBox className="text-3xl mb-3 opacity-80" />
              <p className="text-sm opacity-90">Total Products</p>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
              <p className="text-xs mt-2 opacity-75">Manage products →</p>
            </Link>
            
            <Link to="/farmer/orders" className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-xl transition transform hover:scale-105">
              <FaShoppingCart className="text-3xl mb-3 opacity-80" />
              <p className="text-sm opacity-90">Total Orders</p>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
              <p className="text-xs mt-2 opacity-75">View orders →</p>
            </Link>
            
            <Link to="/farmer/inventory" className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-6 hover:shadow-xl transition transform hover:scale-105">
              <FaExclamationTriangle className="text-3xl mb-3 opacity-80" />
              <p className="text-sm opacity-90">Low Stock Items</p>
              <p className="text-3xl font-bold">{stats.lowStockItems}</p>
              <p className="text-xs mt-2 opacity-75">Check inventory →</p>
            </Link>
            
            <Link to="/farmer/reviews" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 hover:shadow-xl transition transform hover:scale-105">
              <FaStar className="text-3xl mb-3 opacity-80" />
              <p className="text-sm opacity-90">Average Rating</p>
              <p className="text-3xl font-bold">{stats.averageRating} / 5.0</p>
              <p className="text-xs mt-2 opacity-75">See reviews →</p>
            </Link>
          </div>
        )}

        {/* Charts Row - Only show on overview */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Sales Performance</h3>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div className="h-64">
                <Line data={salesData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
              <div className="h-64">
                <Doughnut data={categoryData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <AnimatePresence mode="wait">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                    <FaEye className="text-3xl mb-3 opacity-80" />
                    <p className="text-sm opacity-90">Total Views</p>
                    <p className="text-3xl font-bold">24.5K</p>
                    <p className="text-xs mt-2 opacity-75">+15.3% vs last month</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                    <FaShoppingCart className="text-3xl mb-3 opacity-80" />
                    <p className="text-sm opacity-90">Conversion Rate</p>
                    <p className="text-3xl font-bold">3.8%</p>
                    <p className="text-xs mt-2 opacity-75">+0.5% vs last month</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                    <FaHistory className="text-3xl mb-3 opacity-80" />
                    <p className="text-sm opacity-90">Avg. Order Value</p>
                    <p className="text-3xl font-bold">$42.50</p>
                    <p className="text-xs mt-2 opacity-75">+$3.20 vs last month</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold mb-4">Recent Orders</h3>
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.customer}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/farmer/products" className="p-4 bg-white rounded-lg text-center hover:bg-primary-50 transition">
                        <FaBox className="text-2xl text-primary-600 mx-auto mb-2" />
                        <span className="text-sm">Add Product</span>
                      </Link>
                      <Link to="/farmer/orders" className="p-4 bg-white rounded-lg text-center hover:bg-primary-50 transition">
                        <FaShoppingCart className="text-2xl text-primary-600 mx-auto mb-2" />
                        <span className="text-sm">View Orders</span>
                      </Link>
                      <Link to="/farmer/inventory" className="p-4 bg-white rounded-lg text-center hover:bg-primary-50 transition">
                        <FaWarehouse className="text-2xl text-primary-600 mx-auto mb-2" />
                        <span className="text-sm">Inventory</span>
                      </Link>
                      <Link to="/farmer/store" className="p-4 bg-white rounded-lg text-center hover:bg-primary-50 transition">
                        <FaStoreAlt className="text-2xl text-primary-600 mx-auto mb-2" />
                        <span className="text-sm">Store Settings</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">My Products</h2>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Products</option>
                    <option value="active">Active</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStockStatus(product.stock).color}`}>
                            {getStockStatus(product.stock).label}: {product.stock}
                          </span>
                          <div className="flex space-x-2">
                            <button onClick={() => handleEditProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Orders</h2>

                {/* Order Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-white border rounded-lg p-4 text-center">
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-600 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-yellow-700">{orders.filter(o => o.status === 'pending').length}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-blue-600 text-sm">Processing</p>
                    <p className="text-2xl font-bold text-blue-700">{orders.filter(o => o.status === 'processing').length}</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                    <p className="text-purple-600 text-sm">Shipped</p>
                    <p className="text-2xl font-bold text-purple-700">{orders.filter(o => o.status === 'shipped').length}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-green-600 text-sm">Delivered</p>
                    <p className="text-2xl font-bold text-green-700">{orders.filter(o => o.status === 'delivered').length}</p>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders by ID or customer..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">Order ID</th>
                        <th className="px-4 py-3 text-left">Customer</th>
                        <th className="px-4 py-3 text-left">Items</th>
                        <th className="px-4 py-3 text-left">Total</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredOrders.map((order) => {
                        const StatusIcon = getStatusIcon(order.status);
                        return (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{order.id}</td>
                            <td className="px-4 py-3">{order.customer}</td>
                            <td className="px-4 py-3">{order.products} items</td>
                            <td className="px-4 py-3 font-semibold">${order.total}</td>
                            <td className="px-4 py-3">
                              <span className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                <StatusIcon className="text-sm" />
                                <span className="capitalize">{order.status}</span>
                              </span>
                            </td>
                            <td className="px-4 py-3">{order.date}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleViewOrder(order)}
                                className="text-primary-600 hover:text-primary-800"
                              >
                                <FaEye />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* INVENTORY TAB */}
            {activeTab === 'inventory' && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>

                {/* Inventory Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold">{products.length}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-600">In Stock</p>
                    <p className="text-2xl font-bold text-green-700">{products.filter(p => p.stock >= 50).length}</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-600">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-700">{products.filter(p => p.stock < 50 && p.stock > 0).length}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-700">{products.filter(p => p.stock === 0).length}</p>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Inventory Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">Product</th>
                        <th className="px-4 py-3 text-left">Category</th>
                        <th className="px-4 py-3 text-left">Price</th>
                        <th className="px-4 py-3 text-left">Stock</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts.map((product) => {
                        const stockStatus = getStockStatus(product.stock);
                        return (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                                <span className="font-medium">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">{product.category}</td>
                            <td className="px-4 py-3">${product.price}</td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                min="0"
                                value={product.stock}
                                onChange={(e) => handleUpdateStock(product.id, e.target.value)}
                                className="w-16 px-2 py-1 border rounded text-center"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.color}`}>
                                {stockStatus.label}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:text-blue-800 mr-2">
                                <FaEdit />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

                {/* Rating Overview */}
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white border rounded-lg p-6 col-span-1">
                    <p className="text-gray-500 text-sm">Average Rating</p>
                    <p className="text-4xl font-bold text-primary-600">{stats.averageRating}</p>
                    <div className="flex text-yellow-400 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(stats.averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border rounded-lg p-6 col-span-3">
                    <p className="text-gray-500 text-sm mb-2">Rating Distribution</p>
                    {[5,4,3,2,1].map(rating => {
                      const count = reviews.filter(r => r.rating === rating).length;
                      const percentage = (count / reviews.length) * 100 || 0;
                      return (
                        <div key={rating} className="flex items-center space-x-2 mb-1">
                          <span className="text-sm w-12">{rating} star</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-sm w-12">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search reviews..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="bg-white border rounded-lg p-6">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{review.productName}</h3>
                          <p className="text-sm text-gray-600">{review.user} • {review.date}</p>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <div className="flex items-center space-x-4">
                        <button onClick={() => handleHelpful(review.id)} className="text-sm text-gray-500 hover:text-primary-600">
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-sm text-gray-500 hover:text-primary-600">Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CUSTOMERS TAB */}
            {activeTab === 'customers' && (
              <motion.div
                key="customers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">My Customers</h2>

                {/* Customer Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold">{customers.length}</p>
                  </div>
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">${stats.totalRevenue}</p>
                  </div>
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-gray-600">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-blue-600">${stats.avgOrderValue}</p>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Customers Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="bg-white border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                         onClick={() => handleViewCustomer(customer)}>
                      <div className="flex items-center space-x-3 mb-3">
                        <img src={customer.avatar} alt={customer.name} className="w-12 h-12 rounded-full" />
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Orders</p>
                          <p className="font-semibold">{customer.totalOrders}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Spent</p>
                          <p className="font-semibold">${customer.totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-500">Last Order</p>
                          <p className="font-semibold">{customer.lastOrder}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Analytics</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                    <FaEye className="text-3xl mb-3 opacity-80" />
                    <p className="text-sm opacity-90">Total Views</p>
                    <p className="text-3xl font-bold">24.5K</p>
                    <p className="text-xs mt-2 opacity-75">+15.3% vs last month</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                    <FaShoppingCart className="text-3xl mb-3 opacity-80" />
                    <p className="text-sm opacity-90">Conversion Rate</p>
                    <p className="text-3xl font-bold">3.8%</p>
                    <p className="text-xs mt-2 opacity-75">+0.5% vs last month</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                    <FaHistory className="text-3xl mb-3 opacity-80" />
                    <p className="text-sm opacity-90">Avg. Order Value</p>
                    <p className="text-3xl font-bold">$42.50</p>
                    <p className="text-xs mt-2 opacity-75">+$3.20 vs last month</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
                    <div className="h-64">
                      <Line data={salesData} options={chartOptions} />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                    <div className="h-64">
                      <Doughnut data={categoryData} options={doughnutOptions} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STORE TAB */}
            {activeTab === 'store' && (
              <motion.div
                key="store"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Store Settings</h2>

                <div className="bg-white border rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                      <input
                        type="text"
                        value={storeData.storeName}
                        onChange={(e) => setStoreData({...storeData, storeName: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                      <input
                        type="text"
                        value={storeData.tagline}
                        onChange={(e) => setStoreData({...storeData, tagline: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        rows="3"
                        value={storeData.description}
                        onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="text"
                        value={storeData.phone}
                        onChange={(e) => setStoreData({...storeData, phone: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={storeData.email}
                        onChange={(e) => setStoreData({...storeData, email: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={storeData.address}
                        onChange={(e) => setStoreData({...storeData, address: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSaveStore}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                    >
                      <FaCheck className="inline mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                <p className="text-gray-500">Settings page coming soon...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowOrderDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500">Order ID</p>
                    <p className="font-semibold">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Customer</p>
                    <p className="font-semibold">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-semibold text-primary-600">${selectedOrder.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p>{selectedOrder.date}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Items</h3>
                  <ul className="list-disc pl-5">
                    {selectedOrder.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  {['pending', 'processing', 'shipped', 'delivered'].map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        handleUpdateOrderStatus(selectedOrder.id, status);
                        setShowOrderDetails(false);
                      }}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-primary-600 hover:text-white transition"
                    >
                      Mark {status}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="w-full mt-4 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Details Modal */}
      <AnimatePresence>
        {showCustomerModal && selectedCustomer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCustomerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                  <p className="text-gray-600">{selectedCustomer.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p>{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p>{selectedCustomer.location}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <p className="font-semibold">{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Spent</p>
                  <p className="font-semibold text-primary-600">${selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Last Order</p>
                  <p>{selectedCustomer.lastOrder}</p>
                </div>
              </div>

              <button
                onClick={() => setShowCustomerModal(false)}
                className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Product Modal - Now using ProductModal component */}
      <ProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onSave={handleAddProductSubmit}
      />

      {/* Edit Product Modal - Now using ProductModal component */}
      <ProductModal
        isOpen={showEditProduct}
        onClose={() => {
          setShowEditProduct(false);
          setSelectedProduct(null);
        }}
        onSave={handleEditProductSubmit}
        product={selectedProduct}
      />
    </div>
  );
};

export default FarmerDashboard;