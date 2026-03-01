'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { user, login: setAuthUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update auth state
        if (data.user) {
          setAuthUser(data.user);
        }
        // Redirect based on role
        if (data.user?.role === 'admin' || data.user?.role === 'moderator') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-blue-600">
              StellarMartBD
            </Link>
            <h1 className="text-xl text-gray-600 mt-2">Welcome Back!</h1>
            <p className="text-gray-500">Login to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              {loading ? (
                'Logging in...'
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Register Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
