import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FarmerResources = lazy(() => import('./pages/FarmerResources'));
const BuyerResources = lazy(() => import('./pages/BuyerResources'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));

// Dashboard pages
const FarmerDashboard = lazy(() => import('./pages/FarmerDashboard'));
const BuyerDashboard = lazy(() => import('./pages/BuyerDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const BuyerReviews = lazy(() => import('./pages/BuyerReviews'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4caf50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#f44336',
                secondary: '#fff',
              },
            },
            loading: {
              duration: Infinity,
              iconTheme: {
                primary: '#ff9800',
                secondary: '#fff',
              },
            },
          }}
        />

        <Navbar />
        
        <Suspense fallback={<PageLoader />}>
          <div>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/farmer-resources" element={<FarmerResources />} />
              <Route path="/buyer-resources" element={<BuyerResources />} />
              <Route path="/stories" element={<SuccessStories />} />
              <Route path="/help" element={<HelpCenter />} />

              {/* Farmer Routes - All using FarmerDashboard component */}
              <Route path="/farmer" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/products" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/orders" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/analytics" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/customers" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/inventory" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/reviews" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/store" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/settings" element={<ProtectedRoute role="farmer"><ProfilePage /></ProtectedRoute>} />

              {/* Buyer Routes */}
              <Route path="/buyer" element={<ProtectedRoute role="buyer"><BuyerDashboard /></ProtectedRoute>} />
              <Route path="/buyer/orders" element={<ProtectedRoute role="buyer"><OrdersPage /></ProtectedRoute>} />
              <Route path="/buyer/settings" element={<ProtectedRoute role="buyer"><ProfilePage /></ProtectedRoute>} />
              <Route path="/buyer/reviews" element={<ProtectedRoute role="buyer"><BuyerReviews /></ProtectedRoute>} />
              
              {/* Buyer Features */}
              <Route path="/wishlist" element={<ProtectedRoute role="buyer"><WishlistPage /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute role="buyer"><CartPage /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute role="buyer"><CheckoutPage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute role="buyer"><OrdersPage /></ProtectedRoute>} />
              <Route path="/order/:id" element={<ProtectedRoute role="buyer"><OrdersPage /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/transactions" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/verifications" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute role="admin"><ProfilePage /></ProtectedRoute>} />

              {/* Profile Route - Accessible by all authenticated users */}
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Suspense>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;