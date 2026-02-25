import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import  useAuth  from './useAuth';

export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock orders data
      const mockOrders = [
        {
          id: 'ORD-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 45.99,
          items: 3,
          paymentMethod: 'Credit Card',
          shippingAddress: '123 Main St, New York, NY 10001',
          estimatedDelivery: '2024-01-18',
          actualDelivery: '2024-01-17',
          trackingNumber: 'TRK123456789',
          carrier: 'FedEx',
          products: [
            {
              id: 1,
              name: 'Organic Wild Honey',
              farmer: 'Rajesh Kumar',
              price: 12.99,
              quantity: 2,
              image: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
              reviewed: true
            },
            {
              id: 2,
              name: 'Handcrafted Mango Pickle',
              farmer: 'Priya Sharma',
              price: 8.99,
              quantity: 1,
              image: 'https://avakaayapickleshouse.com/wp-content/uploads/2024/10/Mango-pickle-6_2_11zon.webp',
              reviewed: false
            }
          ]
        },
        {
          id: 'ORD-2024-002',
          date: '2024-01-10',
          status: 'shipped',
          total: 34.97,
          items: 2,
          paymentMethod: 'PayPal',
          shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
          estimatedDelivery: '2024-01-14',
          trackingNumber: 'TRK987654321',
          carrier: 'UPS',
          products: [
            {
              id: 4,
              name: 'Traditional Jaggery',
              farmer: 'Sunita Devi',
              price: 6.99,
              quantity: 3,
              image: 'https://img.freepik.com/free-vector/organic-jaggery-powder-blocks-with-fresh-sugar-cane-color-background-realistic-vector-illustration_1284-78025.jpg',
              reviewed: false
            },
            {
              id: 5,
              name: 'Spice Mix - Garam Masala',
              farmer: 'Meera Singh',
              price: 7.99,
              quantity: 2,
              image: 'https://randomuser.me/api/portraits/women/11.jpg',
              reviewed: false
            }
          ]
        },
        {
          id: 'ORD-2024-003',
          date: '2024-01-05',
          status: 'processing',
          total: 67.25,
          items: 4,
          paymentMethod: 'Credit Card',
          shippingAddress: '789 Pine St, Chicago, IL 60601',
          estimatedDelivery: '2024-01-12',
          products: [
            {
              id: 6,
              name: 'Organic Basmati Rice',
              farmer: 'Harpreet Singh',
              price: 24.99,
              quantity: 1,
              image: 'https://www.greendna.in/cdn/shop/products/basmati6_945x.jpg?v=1742283085',
              reviewed: false
            },
            {
              id: 7,
              name: 'Wood Pressed Groundnut Oil',
              farmer: 'Venkatesh Rao',
              price: 19.99,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
              reviewed: false
            }
          ]
        }
      ];

      setOrders(mockOrders);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const trackOrder = (orderId) => {
    const order = getOrderById(orderId);
    if (order?.trackingNumber) {
      toast.success(`Tracking: ${order.trackingNumber} (${order.carrier})`);
    } else {
      toast.error('Tracking information not available yet');
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' }
          : order
      ));
      
      toast.success('Order cancelled successfully');
      return true;
    } catch (err) {
      toast.error('Failed to cancel order');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reorder = async (orderId) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Items added to cart');
      return true;
    } catch (err) {
      toast.error('Failed to reorder');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (productId, rating, comment) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thank you for your review!');
      return true;
    } catch (err) {
      toast.error('Failed to submit review');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = (orderId) => {
    toast.success(`Invoice for order ${orderId} downloaded`);
  };

  const getOrdersByStatus = (status) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      processing: orders.filter(o => o.status === 'processing').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
    };
  };

  return {
    orders,
    loading,
    error,
    selectedOrder,
    setSelectedOrder,
    getOrderById,
    trackOrder,
    cancelOrder,
    reorder,
    submitReview,
    downloadInvoice,
    getOrdersByStatus,
    getOrderStats,
    refreshOrders: fetchOrders
  };
};

export default useOrders;