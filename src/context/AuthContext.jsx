import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create and export the context
export const AuthContext = createContext();

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        name: email.split('@')[0],
        email,
        role,
        verified: true,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=4caf50&color=fff`
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success(`Welcome back, ${userData.name}!`);
      
      return { success: true, user: userData };
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // DON'T set user or localStorage here - just return success
      toast.success('Registration successful! Please login to continue.');
      
      return { success: true };
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    return { success: true };
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update profile');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isFarmer: user?.role === 'farmer',
    isBuyer: user?.role === 'buyer',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;