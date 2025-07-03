import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Mail, UserCheck, Eye, EyeOff } from 'lucide-react';
import { UserType } from '../App';

interface AuthFormProps {
  userType: UserType;
  onAuthSuccess: (user: any) => void;
  onBack: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ userType, onAuthSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    hospitalName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation for registration
    if (!isLogin) {
      if (!formData.name.trim()) {
        setError('Full name is required');
        setIsLoading(false);
        return;
      }
      if (!formData.hospitalName.trim()) {
        setError('Hospital/Clinic name is required');
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        setIsLoading(false);
        return;
      }
    }

    const apiUrl = isLogin
      ? 'http://127.0.0.1:8001/users/login'
      : 'http://127.0.0.1:8001/users/register';

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          email: formData.email,
          password: formData.password,
          role: userType === 'doctor' ? 'doctor' : 'asha',
        };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (response.status === 400 && isLogin
              ? 'Invalid email or password'
              : 'User already exists')
        );
      }

      if (isLogin) {
        const { access_token, token_type } = data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('token_type', token_type);
        onAuthSuccess({
          email: formData.email,
          type: userType,
          token: access_token,
        });
      } else {
        onAuthSuccess({
          email: formData.email,
          type: userType,
          name: formData.name || 'User',
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to process request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getUserTypeDisplay = () => {
    switch (userType) {
      case 'doctor':
        return 'Doctor';
      case 'asha':
        return 'ASHA Worker';
      default:
        return 'Healthcare Worker';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Back to user selection"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to User Selection
        </button>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="bg-blue-600 rounded-full p-3 w-fit mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join GenMed'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isLogin
                ? 'Sign in to access your medical dashboard'
                : `Register as a ${getUserTypeDisplay()} to empower rural healthcare`}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-center text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your full name"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter your email"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter your password"
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Confirm your password"
                      required
                      aria-required="true"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hospitalName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hospital/Clinic Name
                  </label>
                  <input
                    id="hospitalName"
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your workplace"
                    required
                    aria-required="true"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};