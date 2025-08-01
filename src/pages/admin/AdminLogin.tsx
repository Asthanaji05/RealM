import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
    } catch (error) {
      // Error is handled by AdminAuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-3xl soft-glow p-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 glass-card rounded-2xl soft-glow">
              <Shield className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-heading gradient-text-red mb-3"
          >
            Admin Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-body text-white/60"
          >
            Secure administrative access
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit} 
          className="space-y-8"
        >
          <div>
            <label className="block text-white/90 text-caption font-medium mb-3">
              Admin Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-14 pr-4 py-4 glass-card rounded-xl text-white placeholder-white/40 focus:outline-none focus:soft-glow smooth-transition text-body"
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/90 text-caption font-medium mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4 glass-card rounded-xl text-white placeholder-white/40 focus:outline-none focus:soft-glow smooth-transition text-body"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 smooth-transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold focus:outline-none smooth-transition disabled:opacity-50 soft-glow-pink text-body"
          >
            {loading ? 'Authenticating...' : 'Access Admin Panel'}
          </motion.button>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/60 text-caption">
            Not an admin?{' '}
            <Link 
              to="/" 
              className="gradient-text-cosmic font-semibold hover:underline"
            >
              Return to main site
            </Link>
          </p>
          <div className="mt-4 p-3 glass-card rounded-xl">
            <p className="text-xs text-white/40">
              Demo credentials: admin / admin123
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;