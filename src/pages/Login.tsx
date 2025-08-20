import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, User, Building, Home } from 'lucide-react';
import { authAPI } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '@/components/Navigation';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useAuth();
  const [userType, setUserType] = useState<'customer' | 'business' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Get redirect information if available
  const redirectPath = location.state?.from || '/';
  const redirectMessage = location.state?.message;

  // Display message if redirected
  React.useEffect(() => {
    if (redirectMessage) {
      toast({
        title: 'Login Required',
        description: redirectMessage,
      });
    }
  }, [redirectMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) return;
    
    try {
      setIsLoading(true);
      const response = await authAPI.login(formData.email, formData.password, userType);
      if (redirectPath === '/business' && response.data.user.userType === 'customer') {
        navigate('/signup?type=business');
      } else {
        navigate(redirectPath);
      }
      
      // Use the login function from AuthContext
      login(response.data.token, response.data.user);
      
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${response.data.user.firstName}!`,
      });
      
      // Redirect to the original destination or home
      navigate(redirectPath);
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'Invalid credentials',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!userType) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
          {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          )}
          <div className="absolute top-4 left-4 z-10">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-orange-600 hover:text-orange-600 hover:bg-transparent focus:bg-transparent active:bg-transparent">
              <Home className="w-5 h-5 mr-2" /> Back to Home
            </Button>
          </div>
          <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Urban <span className="text-orange-600">Pandi</span></h1>
              </div>
              <p className="text-xl text-gray-600">Choose your account type to continue</p>
            </div>

            {/* User Type Selection */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-300"
                onClick={() => setUserType('customer')}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">User</h3>
                  <p className="text-gray-600 mb-6">
                    Browse and discover businesses in Madurai. Find the best services, restaurants, and shops near you.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>• Browse business listings</li>
                    <li>• Filter by category and location</li>
                    <li>• Write a review directly</li>
                    
                  </ul>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-orange-300"
                onClick={() => setUserType('business')}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Owner</h3>
                  <p className="text-gray-600 mb-6">
                    List your business and reach more customers in Madurai. Manage your business profile and grow your reach.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>• Create business listings</li>
                    <li>• Manage business information</li>
                    <li>• Upload photos and details</li>
                    
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't have an account? 
                <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-medium ml-1">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}
        <div className="w-full max-w-md">
          <div className="absolute top-4 left-4 z-10">
                    <Button variant="ghost" onClick={() => navigate('/')} className="text-orange-600 hover:text-orange-600 hover:bg-transparent focus:bg-transparent active:bg-transparent">
                      <Home className="w-5 h-5 mr-2" /> Back to Home
                    </Button>
                  </div>
                <div className="w-full max-w-2xl"></div>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Urban <span className="text-orange-600">Pandi</span></h1>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              {userType === 'customer' ? (
                <User className="w-5 h-5 text-blue-600" />
              ) : (
                <Building className="w-5 h-5 text-green-600" />
              )}
              <span className="text-lg font-medium text-gray-700 capitalize">
                {userType} Login
              </span>
            </div>
            <button
              onClick={() => setUserType(null)}
              className="text-sm text-orange-600 hover:text-orange-700"
            >
              Change account type
            </button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account? 
                  <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-medium ml-1">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
