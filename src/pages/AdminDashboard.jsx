import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUsers, FaBox, FaShoppingCart, FaExclamationTriangle,
  FaCheckCircle, FaTimesCircle, FaBan, FaTrash, FaEdit,
  FaEye, FaChartLine, FaGlobe, FaMoneyBillWave, FaUserTie,
  FaUserCheck, FaUserClock, FaShieldAlt, FaCog, FaDownload,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
  FaSearch, FaFilter, FaSync, FaFileExport, FaPlus,
  FaStar, FaRegStar, FaUser, FaStore, FaTractor,
  FaTimes
} from 'react-icons/fa';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
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
  Filler,
  BarElement
} from 'chart.js';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler 
);

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [loading, setLoading] = useState(false);

  // Platform Settings state
const [showSettingsModal, setShowSettingsModal] = useState(false);
const [platformSettings, setPlatformSettings] = useState(() => {
  const saved = localStorage.getItem('platformSettings');
  return saved ? JSON.parse(saved) : {
    platformName: 'AgroValue Connect',
    supportEmail: 'support@agrovalueconnect.com',
    supportPhone: '+1 (555) 123-4567',
    commissionRate: 5,
    freeTrialMonths: 3,
    minPayout: 50,
    maxProductsPerFarmer: 100,
    enableReviews: true,
    enableWorkshops: true,
    requireVerification: true,
    maintenanceMode: false,
    currency: 'USD',
    timezone: 'EST',
    dateFormat: 'MM/DD/YYYY',
    socialLinks: {
      facebook: 'https://facebook.com/agrovalue',
      twitter: 'https://twitter.com/agrovalue',
      instagram: 'https://instagram.com/agrovalue',
      linkedin: 'https://linkedin.com/company/agrovalue'
    },
    emailSettings: {
      senderName: 'AgroValue Connect',
      senderEmail: 'noreply@agrovalueconnect.com',
      welcomeEmail: true,
      orderConfirmation: true,
      newsletterEnabled: true
    }
  };
});

  // Set active tab based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/users')) setActiveTab('users');
    else if (path.includes('/admin/products')) setActiveTab('products');
    else if (path.includes('/admin/transactions')) setActiveTab('transactions');
    else if (path.includes('/admin/reports')) setActiveTab('reports');
    else if (path.includes('/admin/verifications')) setActiveTab('approvals');
    else setActiveTab('overview');
  }, [location]);

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Stats data with localStorage persistence
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('adminStats');
    return saved ? JSON.parse(saved) : {
      totalUsers: 1250,
      totalFarmers: 456,
      totalBuyers: 678,
      totalAdmins: 16,
      totalProducts: 890,
      totalOrders: 2345,
      totalRevenue: 45678,
      pendingApprovals: 23,
      reportedIssues: 12,
      activeSessions: 345,
      newUsersToday: 28,
      conversionRate: 3.4,
      platformGrowth: 15.8,
      avgOrderValue: 45.67
    };
  });

  // Users data with localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('adminUsers');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'Rajesh Kumar', 
        role: 'farmer', 
        status: 'active',
        email: 'rajesh@example.com',
        location: 'Uttarakhand, India',
        joined: '2024-01-15',
        products: 12,
        revenue: 3456,
        verified: true,
        lastActive: '2024-02-20',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      { 
        id: 2, 
        name: 'Priya Sharma', 
        role: 'farmer', 
        status: 'active',
        email: 'priya@example.com',
        location: 'Andhra Pradesh, India',
        joined: '2024-01-14',
        products: 8,
        revenue: 2345,
        verified: true,
        lastActive: '2024-02-19',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      { 
        id: 3, 
        name: 'John Smith', 
        role: 'buyer', 
        status: 'active',
        email: 'john@example.com',
        location: 'New York, USA',
        joined: '2024-01-13',
        orders: 15,
        spent: 1250,
        verified: true,
        lastActive: '2024-02-20',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      { 
        id: 4, 
        name: 'Maria Garcia', 
        role: 'buyer', 
        status: 'pending',
        email: 'maria@example.com',
        location: 'Barcelona, Spain',
        joined: '2024-01-12',
        orders: 0,
        spent: 0,
        verified: false,
        lastActive: '2024-02-18',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
      },
      { 
        id: 5, 
        name: 'Ahmed Hassan', 
        role: 'farmer', 
        status: 'suspended',
        email: 'ahmed@example.com',
        location: 'Dubai, UAE',
        joined: '2024-01-11',
        products: 5,
        revenue: 890,
        verified: true,
        lastActive: '2024-02-15',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
      }
    ];
  });

  // Products data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('adminProducts');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Organic Wild Honey', farmer: 'Rajesh Kumar', price: 12.99, stock: 150, status: 'active', category: 'Honey' },
      { id: 2, name: 'Handmade Mango Pickle', farmer: 'Priya Sharma', price: 8.99, stock: 75, status: 'active', category: 'Pickles' },
      { id: 3, name: 'Cold-Pressed Almond Oil', farmer: 'Amit Patel', price: 15.99, stock: 30, status: 'low-stock', category: 'Oils' },
      { id: 4, name: 'Traditional Jaggery', farmer: 'Sunita Devi', price: 6.99, stock: 200, status: 'active', category: 'Jaggery' }
    ];
  });

  // Pending approvals data
  const [pendingApprovals, setPendingApprovals] = useState(() => {
    const saved = localStorage.getItem('adminApprovals');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        type: 'farmer', 
        name: 'Sunita Devi',
        email: 'sunita@example.com',
        documents: ['id-proof.pdf', 'certification.pdf'],
        submitted: '2024-01-15',
        products: 3,
        status: 'pending'
      },
      { 
        id: 2, 
        type: 'product', 
        name: 'Organic Honey',
        farmer: 'Rajesh Kumar',
        price: 12.99,
        submitted: '2024-01-14',
        images: 4,
        status: 'pending'
      },
      { 
        id: 3, 
        type: 'buyer', 
        name: 'Chen Wei',
        email: 'chen@example.com',
        company: 'Wei Imports',
        submitted: '2024-01-14',
        verification: 'pending',
        status: 'pending'
      }
    ];
  });

  // Transactions data
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('adminTransactions');
    return saved ? JSON.parse(saved) : [
      { id: '#TR-001', buyer: 'John Smith', farmer: 'Rajesh Kumar', amount: 45.99, status: 'completed', date: '2024-01-15', paymentMethod: 'Credit Card' },
      { id: '#TR-002', buyer: 'Maria Garcia', farmer: 'Priya Sharma', amount: 23.50, status: 'processing', date: '2024-01-14', paymentMethod: 'PayPal' },
      { id: '#TR-003', buyer: 'Ahmed Hassan', farmer: 'Amit Patel', amount: 89.75, status: 'completed', date: '2024-01-13', paymentMethod: 'Credit Card' },
      { id: '#TR-004', buyer: 'Sarah Johnson', farmer: 'Sunita Devi', amount: 12.99, status: 'pending', date: '2024-01-12', paymentMethod: 'Apple Pay' },
      { id: '#TR-005', buyer: 'Chen Wei', farmer: 'Krishna Reddy', amount: 156.25, status: 'disputed', date: '2024-01-11', paymentMethod: 'Credit Card' }
    ];
  });

  // Reports data
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('adminReports');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'fraud', count: 3, severity: 'high', date: '2024-02-20', description: 'Suspicious transaction patterns detected' },
      { id: 2, type: 'quality', count: 8, severity: 'medium', date: '2024-02-19', description: 'Product quality complaints received' },
      { id: 3, type: 'shipping', count: 5, severity: 'low', date: '2024-02-18', description: 'Shipping delays reported' },
      { id: 4, type: 'payment', count: 2, severity: 'high', date: '2024-02-17', description: 'Payment gateway issues' }
    ];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('adminStats', JSON.stringify(stats));
    localStorage.setItem('adminUsers', JSON.stringify(users));
    localStorage.setItem('adminProducts', JSON.stringify(products));
    localStorage.setItem('adminApprovals', JSON.stringify(pendingApprovals));
    localStorage.setItem('adminTransactions', JSON.stringify(transactions));
    localStorage.setItem('adminReports', JSON.stringify(reports));
  }, [stats, users, products, pendingApprovals, transactions, reports]);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Chart data with real values
  const userGrowthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Farmers',
        data: [65, 78, 92, 108, 125, 145],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Buyers',
        data: [120, 145, 168, 192, 215, 245],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12500, 18900, 23400, 27800, 31200, 35800],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const categoryDistributionData = {
    labels: ['Honey', 'Pickles', 'Oils', 'Spices', 'Grains', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 10, 5],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0', '#795548']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { usePointStyle: true }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: { grid: { display: false } }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    },
    cutout: '60%'
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'buyer': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSavePlatformSettings = () => {
  localStorage.setItem('platformSettings', JSON.stringify(platformSettings));
  setShowSettingsModal(false);
  toast.success('Platform settings saved successfully!');
};

  const handleApprove = (item) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== item.id));
    toast.success(`${item.type} approved successfully!`);
  };

  const handleReject = (item) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== item.id));
    toast.error(`${item.type} rejected`);
  };

  const handleResolveReport = (report) => {
    setReports(prev => prev.filter(r => r.id !== report.id));
    toast.success(`Report resolved`);
  };

  const handleExportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      admin: user?.name,
      stats,
      users: users.length,
      pendingApprovals: pendingApprovals.length,
      transactions: transactions.length,
      revenue: stats.totalRevenue
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Report exported successfully!');
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Data refreshed!');
    }, 1000);
  };

  const handleUserAction = (action, user) => {
    switch(action) {
      case 'suspend':
        setUsers(prev => prev.map(u => 
          u.id === user.id ? { ...u, status: 'suspended' } : u
        ));
        toast.success(`${user.name} suspended`);
        break;
      case 'activate':
        setUsers(prev => prev.map(u => 
          u.id === user.id ? { ...u, status: 'active' } : u
        ));
        toast.success(`${user.name} activated`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          setUsers(prev => prev.filter(u => u.id !== user.id));
          toast.success(`${user.name} deleted`);
        }
        break;
      default:
        break;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine, path: '/admin' },
    { id: 'users', label: 'Users', icon: FaUsers, path: '/admin/users' },
    { id: 'products', label: 'Products', icon: FaBox, path: '/admin/products' },
    { id: 'approvals', label: 'Approvals', icon: FaUserCheck, path: '/admin/verifications' },
    { id: 'transactions', label: 'Transactions', icon: FaShoppingCart, path: '/admin/transactions' },
    { id: 'reports', label: 'Reports', icon: FaExclamationTriangle, path: '/admin/reports' },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine, path: '/admin/analytics' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}! Manage platform, users, and transactions</p>
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
              <span>Export Report</span>
            </button>
            <button 
  onClick={() => setShowSettingsModal(true)}
  className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition duration-300"
>
  <FaCog />
  <span>Platform Settings</span>
</button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90">Total Users</p>
                <h3 className="text-3xl font-bold mt-2">{stats.totalUsers}</h3>
                <div className="flex items-center mt-2 text-sm opacity-75">
                  <FaUsers className="mr-1" />
                  <span>+{stats.newUsersToday} today</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <FaUsers className="text-2xl" />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs">
              <span>Farmers: {stats.totalFarmers}</span>
              <span>Buyers: {stats.totalBuyers}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90">Total Revenue</p>
                <h3 className="text-3xl font-bold mt-2">${stats.totalRevenue.toLocaleString()}</h3>
                <div className="flex items-center mt-2 text-sm opacity-75">
                  <FaMoneyBillWave className="mr-1" />
                  <span>+15.3% vs last month</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <FaMoneyBillWave className="text-2xl" />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs">
              <span>Avg Order: ${stats.avgOrderValue}</span>
              <span>Conv: {stats.conversionRate}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90">Total Products</p>
                <h3 className="text-3xl font-bold mt-2">{stats.totalProducts}</h3>
                <div className="flex items-center mt-2 text-sm opacity-75">
                  <FaBox className="mr-1" />
                  <span>{stats.pendingApprovals} pending</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <FaBox className="text-2xl" />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs">
              <span>Active: {stats.totalProducts - stats.pendingApprovals}</span>
              <span>Pending: {stats.pendingApprovals}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90">Active Sessions</p>
                <h3 className="text-3xl font-bold mt-2">{stats.activeSessions}</h3>
                <div className="flex items-center mt-2 text-sm opacity-75">
                  <FaUserClock className="mr-1" />
                  <span>{stats.reportedIssues} issues</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <FaUserClock className="text-2xl" />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs">
              <span>Issues: {stats.reportedIssues}</span>
              <span>Growth: {stats.platformGrowth}%</span>
            </div>
          </motion.div>
        </div>

        {/* Charts Row - Only show on overview */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">User Growth</h3>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="week">Last 6 Weeks</option>
                  <option value="month">Last 6 Months</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
              <div className="h-64">
                <Line data={userGrowthData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
              <div className="h-64">
                <Line data={revenueData} options={chartOptions} />
              </div>
            </motion.div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <AnimatePresence mode="wait">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">User Management</h2>
                
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All Roles</option>
                      <option value="farmer">Farmers</option>
                      <option value="buyer">Buyers</option>
                      <option value="admin">Admins</option>
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr 
                          key={user.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium flex items-center space-x-1">
                                  <span>{user.name}</span>
                                  {user.verified && (
                                    <FaCheckCircle className="text-green-500 text-sm" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{user.location}</td>
                          <td className="px-6 py-4">{user.joined}</td>
                          <td className="px-6 py-4">
                            {user.role === 'farmer' ? (
                              <span>{user.products} products • ${user.revenue}</span>
                            ) : (
                              <span>{user.orders} orders • ${user.spent}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                              <button 
                                className="p-1 text-blue-600 hover:text-blue-800"
                                onClick={() => setSelectedUser(user) || setShowUserModal(true)}
                              >
                                <FaEye />
                              </button>
                              <button 
                                className="p-1 text-green-600 hover:text-green-800"
                                onClick={() => toast.info('Edit feature coming soon')}
                              >
                                <FaEdit />
                              </button>
                              {user.status === 'active' ? (
                                <button 
                                  className="p-1 text-yellow-600 hover:text-yellow-800"
                                  onClick={() => handleUserAction('suspend', user)}
                                >
                                  <FaBan />
                                </button>
                              ) : (
                                <button 
                                  className="p-1 text-green-600 hover:text-green-800"
                                  onClick={() => handleUserAction('activate', user)}
                                >
                                  <FaCheckCircle />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <FaUsers className="text-5xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No users found</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Product Management</h2>
                
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
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{product.name}</td>
                          <td className="px-6 py-4">{product.farmer}</td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4">${product.price}</td>
                          <td className="px-6 py-4">{product.stock}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              product.status === 'active' ? 'bg-green-100 text-green-800' :
                              product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-primary-600 hover:text-primary-800">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Approvals Tab */}
            {activeTab === 'approvals' && (
              <motion.div
                key="approvals"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {pendingApprovals.map((approval) => (
                    <motion.div
                      key={approval.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-xl ${
                            approval.type === 'farmer' ? 'bg-green-100' :
                            approval.type === 'product' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            {approval.type === 'farmer' && <FaUserTie className="text-2xl text-green-600" />}
                            {approval.type === 'product' && <FaBox className="text-2xl text-blue-600" />}
                            {approval.type === 'buyer' && <FaUserCheck className="text-2xl text-purple-600" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{approval.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{approval.type} • {approval.submitted}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Pending
                        </span>
                      </div>

                      {approval.type === 'farmer' && (
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p>Email: {approval.email}</p>
                          <p>Products: {approval.products}</p>
                          <p>Documents: {approval.documents?.join(', ')}</p>
                        </div>
                      )}

                      {approval.type === 'product' && (
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p>Farmer: {approval.farmer}</p>
                          <p>Price: ${approval.price}</p>
                          <p>Images: {approval.images}</p>
                        </div>
                      )}

                      {approval.type === 'buyer' && (
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p>Email: {approval.email}</p>
                          <p>Company: {approval.company}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(approval)}
                          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
                        >
                          <FaCheckCircle />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(approval)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center space-x-2"
                        >
                          <FaTimesCircle />
                          <span>Reject</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {pendingApprovals.length === 0 && (
                  <div className="text-center py-12">
                    <FaCheckCircle className="text-5xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No pending approvals</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <motion.div
                key="transactions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{transaction.id}</td>
                          <td className="px-6 py-4">{transaction.buyer}</td>
                          <td className="px-6 py-4">{transaction.farmer}</td>
                          <td className="px-6 py-4 font-semibold">${transaction.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{transaction.paymentMethod}</td>
                          <td className="px-6 py-4">{transaction.date}</td>
                          <td className="px-6 py-4">
                            <button className="text-primary-600 hover:text-primary-800">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Reports & Issues</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {reports.map((report) => (
                    <div key={report.id} className={`bg-white rounded-xl p-6 border ${getSeverityColor(report.severity)}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold capitalize">{report.type} Report</h4>
                          <p className="text-sm text-gray-500 mt-1">{report.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          report.severity === 'high' ? 'bg-red-100 text-red-800' :
                          report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {report.severity}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{report.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{report.count} reports</span>
                        <button
                          onClick={() => handleResolveReport(report)}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Resolve →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Platform Analytics</h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                    <div className="h-64">
                      <Doughnut data={categoryDistributionData} options={doughnutOptions} />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Platform Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">User Growth Rate</span>
                          <span className="text-sm font-semibold">{stats.platformGrowth}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: `${stats.platformGrowth}%` }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Conversion Rate</span>
                          <span className="text-sm font-semibold">{stats.conversionRate}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${stats.conversionRate * 10}%` }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Avg Order Value</span>
                          <span className="text-sm font-semibold">${stats.avgOrderValue}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary-600">{stats.activeSessions}</p>
                        <p className="text-sm text-gray-600">Active Sessions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{stats.reportedIssues}</p>
                        <p className="text-sm text-gray-600">Open Issues</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white rounded-t-2xl">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedUser.avatar} 
                      alt={selectedUser.name} 
                      className="w-16 h-16 rounded-full border-2 border-white"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                      <p className="text-primary-100">{selectedUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-semibold capitalize">{selectedUser.role}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{selectedUser.location}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-semibold">{selectedUser.joined}</p>
                  </div>
                </div>

                {selectedUser.role === 'farmer' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Farmer Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Products</p>
                        <p className="text-2xl font-bold">{selectedUser.products}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="text-2xl font-bold">${selectedUser.revenue}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedUser.role === 'buyer' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Buyer Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Orders</p>
                        <p className="text-2xl font-bold">{selectedUser.orders}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="text-2xl font-bold">${selectedUser.spent}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Account Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => {
                        toast.success(`Message sent to ${selectedUser.name}`);
                        setShowUserModal(false);
                      }}
                    >
                      <FaEnvelope />
                      <span>Send Message</span>
                    </button>
                    <button 
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      onClick={() => {
                        toast.info('Edit profile feature coming soon');
                        setShowUserModal(false);
                      }}
                    >
                      <FaEdit />
                      <span>Edit Profile</span>
                    </button>
                    {selectedUser.status === 'active' ? (
                      <button 
                        className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                        onClick={() => {
                          handleUserAction('suspend', selectedUser);
                          setShowUserModal(false);
                        }}
                      >
                        <FaBan />
                        <span>Suspend</span>
                      </button>
                    ) : (
                      <button 
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        onClick={() => {
                          handleUserAction('activate', selectedUser);
                          setShowUserModal(false);
                        }}
                      >
                        <FaCheckCircle />
                        <span>Activate</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform Settings Modal */}
<AnimatePresence>
  {showSettingsModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowSettingsModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Platform Settings</h2>
          <button
            onClick={() => setShowSettingsModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaCog className="mr-2 text-primary-600" />
              General Settings
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={platformSettings.platformName}
                  onChange={(e) => setPlatformSettings({...platformSettings, platformName: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={platformSettings.supportEmail}
                  onChange={(e) => setPlatformSettings({...platformSettings, supportEmail: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Phone
                </label>
                <input
                  type="text"
                  value={platformSettings.supportPhone}
                  onChange={(e) => setPlatformSettings({...platformSettings, supportPhone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={platformSettings.currency}
                  onChange={(e) => setPlatformSettings({...platformSettings, currency: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={platformSettings.timezone}
                  onChange={(e) => setPlatformSettings({...platformSettings, timezone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="EST">Eastern Time</option>
                  <option value="CST">Central Time</option>
                  <option value="MST">Mountain Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">GMT</option>
                  <option value="IST">Indian Standard Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  value={platformSettings.dateFormat}
                  onChange={(e) => setPlatformSettings({...platformSettings, dateFormat: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Business Settings */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaMoneyBillWave className="mr-2 text-primary-600" />
              Business Settings
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={platformSettings.commissionRate}
                  onChange={(e) => setPlatformSettings({...platformSettings, commissionRate: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Trial (Months)
                </label>
                <input
                  type="number"
                  min="0"
                  value={platformSettings.freeTrialMonths}
                  onChange={(e) => setPlatformSettings({...platformSettings, freeTrialMonths: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Payout ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={platformSettings.minPayout}
                  onChange={(e) => setPlatformSettings({...platformSettings, minPayout: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Products/Farmer
                </label>
                <input
                  type="number"
                  min="1"
                  value={platformSettings.maxProductsPerFarmer}
                  onChange={(e) => setPlatformSettings({...platformSettings, maxProductsPerFarmer: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaCheckCircle className="mr-2 text-primary-600" />
              Feature Toggles
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <input
                  type="checkbox"
                  checked={platformSettings.enableReviews}
                  onChange={(e) => setPlatformSettings({...platformSettings, enableReviews: e.target.checked})}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Enable Product Reviews</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <input
                  type="checkbox"
                  checked={platformSettings.enableWorkshops}
                  onChange={(e) => setPlatformSettings({...platformSettings, enableWorkshops: e.target.checked})}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Enable Workshops</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <input
                  type="checkbox"
                  checked={platformSettings.requireVerification}
                  onChange={(e) => setPlatformSettings({...platformSettings, requireVerification: e.target.checked})}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Require Farmer Verification</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <input
                  type="checkbox"
                  checked={platformSettings.maintenanceMode}
                  onChange={(e) => setPlatformSettings({...platformSettings, maintenanceMode: e.target.checked})}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="flex items-center">
                  Maintenance Mode
                  {platformSettings.maintenanceMode && (
                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                      Active
                    </span>
                  )}
                </span>
              </label>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaEnvelope className="mr-2 text-primary-600" />
              Email Settings
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender Name
                </label>
                <input
                  type="text"
                  value={platformSettings.emailSettings.senderName}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    emailSettings: {...platformSettings.emailSettings, senderName: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender Email
                </label>
                <input
                  type="email"
                  value={platformSettings.emailSettings.senderEmail}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    emailSettings: {...platformSettings.emailSettings, senderEmail: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <input
                  type="checkbox"
                  checked={platformSettings.emailSettings.welcomeEmail}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    emailSettings: {...platformSettings.emailSettings, welcomeEmail: e.target.checked}
                  })}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Send Welcome Email to New Users</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <input
                  type="checkbox"
                  checked={platformSettings.emailSettings.orderConfirmation}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    emailSettings: {...platformSettings.emailSettings, orderConfirmation: e.target.checked}
                  })}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Send Order Confirmation Emails</span>
              </label>
              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <input
                  type="checkbox"
                  checked={platformSettings.emailSettings.newsletterEnabled}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    emailSettings: {...platformSettings.emailSettings, newsletterEnabled: e.target.checked}
                  })}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Enable Newsletter</span>
              </label>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaGlobe className="mr-2 text-primary-600" />
              Social Media Links
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={platformSettings.socialLinks.facebook}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    socialLinks: {...platformSettings.socialLinks, facebook: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={platformSettings.socialLinks.twitter}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    socialLinks: {...platformSettings.socialLinks, twitter: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={platformSettings.socialLinks.instagram}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    socialLinks: {...platformSettings.socialLinks, instagram: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={platformSettings.socialLinks.linkedin}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    socialLinks: {...platformSettings.socialLinks, linkedin: e.target.value}
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePlatformSettings}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Save Platform Settings
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default AdminDashboard;