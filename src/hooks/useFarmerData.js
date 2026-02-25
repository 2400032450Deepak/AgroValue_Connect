import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useFarmerData = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageRating: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    newCustomers: 45,
    returningCustomers: 89,
    lowStockItems: 0,
    outOfStockItems: 0
  });

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    try {
      // Load products
      const savedProducts = localStorage.getItem('farmerProducts');
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
      } else {
        // Initialize with sample products
        const sampleProducts = [
          { 
            id: 1, 
            name: 'Organic Wild Honey', 
            price: 12.99, 
            stock: 150, 
            sold: 128,
            revenue: 1662.72,
            status: 'active',
            image: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
            category: 'Honey',
            rating: 4.8,
            views: 1245,
            createdAt: '2024-01-01',
            description: 'Pure organic honey from the Himalayas'
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
            createdAt: '2024-01-05',
            description: 'Traditional homemade mango pickle'
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
            createdAt: '2024-01-10',
            description: 'Pure cold-pressed almond oil'
          }
        ];
        setProducts(sampleProducts);
        localStorage.setItem('farmerProducts', JSON.stringify(sampleProducts));
      }

      // Load orders
      const savedOrders = localStorage.getItem('farmerOrders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      } else {
        const sampleOrders = [
          { id: '#ORD-001', customer: 'John Smith', products: 3, total: 45.99, status: 'pending', date: '2024-01-15', items: ['Organic Wild Honey', 'Handmade Mango Pickle'] },
          { id: '#ORD-002', customer: 'Maria Garcia', products: 2, total: 23.50, status: 'processing', date: '2024-01-14', items: ['Cold-Pressed Almond Oil'] },
          { id: '#ORD-003', customer: 'Ahmed Hassan', products: 5, total: 89.75, status: 'shipped', date: '2024-01-13', items: ['Organic Wild Honey', 'Handmade Mango Pickle', 'Cold-Pressed Almond Oil'] },
          { id: '#ORD-004', customer: 'Sarah Johnson', products: 1, total: 12.99, status: 'delivered', date: '2024-01-12', items: ['Organic Wild Honey'] },
          { id: '#ORD-005', customer: 'Chen Wei', products: 4, total: 67.25, status: 'delivered', date: '2024-01-11', items: ['Handmade Mango Pickle', 'Cold-Pressed Almond Oil'] }
        ];
        setOrders(sampleOrders);
        localStorage.setItem('farmerOrders', JSON.stringify(sampleOrders));
      }

      // Calculate stats
      calculateStats();
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const currentProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    const currentOrders = JSON.parse(localStorage.getItem('farmerOrders') || '[]');

    const totalRevenue = currentProducts.reduce((sum, p) => sum + (p.revenue || 0), 0);
    const avgRating = currentProducts.length > 0 
      ? (currentProducts.reduce((sum, p) => sum + (p.rating || 0), 0) / currentProducts.length).toFixed(1)
      : 0;

    setStats({
      totalProducts: currentProducts.length,
      totalOrders: currentOrders.length,
      totalRevenue: totalRevenue,
      averageRating: parseFloat(avgRating),
      pendingOrders: currentOrders.filter(o => o.status === 'pending').length,
      processingOrders: currentOrders.filter(o => o.status === 'processing').length,
      shippedOrders: currentOrders.filter(o => o.status === 'shipped').length,
      deliveredOrders: currentOrders.filter(o => o.status === 'delivered').length,
      newCustomers: 45,
      returningCustomers: 89,
      lowStockItems: currentProducts.filter(p => p.stock < 50 && p.stock > 0).length,
      outOfStockItems: currentProducts.filter(p => p.stock === 0).length
    });

    setProducts(currentProducts);
    setOrders(currentOrders);
  };

  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      name: productData.name || '',
      price: parseFloat(productData.price) || 0,
      stock: parseInt(productData.stock) || 0,
      sold: 0,
      revenue: 0,
      rating: 0,
      views: 0,
      status: parseInt(productData.stock) > 50 ? 'active' : parseInt(productData.stock) > 0 ? 'low-stock' : 'out-of-stock',
      category: productData.category || 'Other',
      image: productData.image || 'https://via.placeholder.com/150',
      description: productData.description || '',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
    calculateStats();
    toast.success('Product added successfully!');
    return newProduct;
  };

  const updateProduct = (productId, updates) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        const updated = { ...p, ...updates };
        // Update status based on stock
        if (updated.stock > 50) updated.status = 'active';
        else if (updated.stock > 0) updated.status = 'low-stock';
        else updated.status = 'out-of-stock';
        return updated;
      }
      return p;
    });
    
    setProducts(updatedProducts);
    localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
    calculateStats();
    toast.success('Product updated successfully!');
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
      calculateStats();
      toast.success('Product deleted successfully!');
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem('farmerOrders', JSON.stringify(updatedOrders));
    calculateStats();
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const getSalesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Generate realistic sales data based on actual orders
    const monthlySales = months.slice(0, currentMonth + 1).map((_, index) => {
      const monthOrders = orders.filter(o => {
        const orderMonth = new Date(o.date).getMonth();
        return orderMonth === index;
      });
      return monthOrders.reduce((sum, o) => sum + o.total, 0);
    });

    return {
      labels: months.slice(0, currentMonth + 1),
      datasets: [
        {
          label: 'Monthly Sales ($)',
          data: monthlySales.length > 0 ? monthlySales : [1200, 1900, 3000, 2500, 4200, 3800],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const getCategoryData = () => {
    const categories = {};
    products.forEach(p => {
      const cat = p.category || 'Other';
      categories[cat] = (categories[cat] || 0) + p.sold;
    });

    // If no data, provide default
    if (Object.keys(categories).length === 0) {
      return {
        labels: ['Honey', 'Pickles', 'Oils', 'Spices', 'Others'],
        datasets: [
          {
            data: [35, 25, 20, 15, 5],
            backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0']
          }
        ]
      };
    }

    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0', '#9c27b0', '#ff9800']
        }
      ]
    };
  };

  const refreshData = () => {
    calculateStats();
    toast.success('Data refreshed!');
  };

  return {
    products,
    orders,
    customers,
    stats,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    getSalesData,
    getCategoryData,
    refreshData
  };
};