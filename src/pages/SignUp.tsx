import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select components
import { MapPin, User, Building, Home } from 'lucide-react';
import { authAPI } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '@/components/Navigation';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState<'customer' | 'business' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Business specific fields
    businessName: '',
    businessCategory: '',
    businessAddress: '',
    businessDescription: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Define business categories and Madurai areas
  const businessCategories = [
    'Restaurant',
    'Retail',
    'Service',
    'Healthcare',
    'Education',
    'Automotive',
    'Real Estate',
    'Technology',
    'Arts & Entertainment',
    'Other'
  ];

  const maduraiAreas = [
    "Alagar Kovil Road",
    "Angel Nagar",
    "Anna Nagar",
    "Anuppanadi",
    "Arajar Salai",
    "Arappalayam",
    "Avaniyapuram",
    "Bama Nagar",
    "Bethaniapuram",
    "Chandragandhi Nagar",
    "Chinna Chokkikulam",
    "Cs Nagar",
    "Doak Nagar",
    "Durai Samy Nagar",
    "Ellis Nagar",
    "Fenner Colony",
    "Gandhi Nagar",
    "Gayathri Nagar",
    "Gnanavolivupuram",
    "Gomathipuram",
    "Goripalayam",
    "Harvey Nagar",
    "Iravathanallur",
    "Iyer Bungalow",
    "Jaihindpuram",
    "K.K. Nagar",
    "K.Pudur",
    "Kamarajar Salai",
    "Kanpalayam",
    "Karpaga Nagar",
    "Kattaboman Nagar",
    "Kochadai",
    "Kodikulam",
    "Koodal Nagar",
    "Krishnapuram Colony",
    "Kudiraicharikulam",
    "Kurinji Nagar",
    "Lion City",
    "Lourdhu Nagar",
    "Madurai Main",
    "Mahapupalayam",
    "Managiri",
    "Meenakshi Amman Nagar",
    "Meenakshi Nagar",
    "Moondrumavadi",
    "Munichallai",
    "Muthia Nagar",
    "Muthu Patti",
    "Muthuramalingapuram",
    "Nagu Nagar",
    "Navalar Nagar",
    "Near Madurai Bus Stand",
    "Near Madurai Train Station",
    "Near Meenakshi Amman Temple",
    "Nehru Nagar",
    "New Ellis Nagar",
    "North Veli Street",
    "Otthakadai",
    "Palangantham",
    "Paravai",
    "Pasumalai",
    "Periyar",
    "Pethaniapuram 2",
    "Ponmeni",
    "Ponnagaram",
    "Poriyalar Nagar",
    "Race Course Colony",
    "Rajamanickamnadar Nagar",
    "Ramalakshmi Nagar",
    "Ramaond Reserve Line",
    "Ramnad Reserve Line",
    "Reserve Police Line",
    "Sambakulam",
    "Sammatipuram",
    "Sathamangalam",
    "Sellur",
    "Shenoy Nagar",
    "Shri Vel Murugan Nagar",
    "Sikkandar Savadi",
    "Simmakkal",
    "Sivagami Nagar",
    "Southern Railway Colony",
    "Sridevi Nagar",
    "Swami Vivekananda Nagar",
    "T M Nagar",
    "Tallakulam",
    "Tangamanal Nagar",
    "Thai Nagar",
    "Thasildar Nagar",
    "Thideer Nagar",
    "Thirunagar",
    "Thiruparakundram",
    "Thiruppalai",
    "Thiyagi Balu",
    "Thomas Colony",
    "Tirupparankunram Road",
    "TTC Nagar",
    "Uthangudi",
    "Vaithiyanathapuram",
    "Vandiyur",
    "Venkatachalapathy Nagar",
    "Vilangudi",
    "Viraganoor",
    "Viratripattu",
    "Viswanathapuram",
    "West Perumal Maistry Street",
    "West Ponnagaram",
    "Yagappa Nagar"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) return;
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match!',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const userData = {
        ...formData,
        userType
      };
      
      const response = await authAPI.signup(userData);
      
      // Use the login function from AuthContext
      login(response.data.token, response.data.user);
      
      toast({
        title: 'Registration Successful',
        description: `Your account has been created successfully!`,
      });
      
      // Redirect business users to the business listing page
      if (userType === 'business') {
        navigate('/business-listing');
      } else {
        // Redirect regular users to home page
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'An error occurred during registration',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  if (!userType) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        
        
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Urban  <span className="text-orange-600">Pandi</span></h1>
            </div>
            <p className="text-xl text-gray-600">Join our community and start exploring Madurai</p>
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Join as <span className="text-blue-600">User</span></h3>
                <p className="text-gray-600 mb-6">
                  Discover amazing businesses in Madurai. Get access to reviews, contact information, and special offers.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up as Customer
                </Button>
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Join as <span className="text-orange-600">Business</span></h3>
                <p className="text-gray-600 mb-6">
                  Grow your business by reaching more customers in Madurai. Create your business profile today.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Sign Up as Business
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account? 
              <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium ml-1">
                Sign in here
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
      <div className="absolute top-4 left-4 z-10">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-orange-600 hover:text-orange-600 hover:bg-transparent focus:bg-transparent active:bg-transparent">
            <Home className="w-5 h-5 mr-2" /> Back to Home
          </Button>
        </div>
      <div className="w-full max-w-2xl">
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
              {userType} Registration
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
            <CardTitle className="text-center">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Business Information (only for business users) */}
              {userType === 'business' && (
                <>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
                  </div>
                  
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <Input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div>
                    <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Category *
                    </label>
                    <Select
                      onValueChange={(value) => handleSelectChange('businessCategory', value)}
                      value={formData.businessCategory}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <Select
                      onValueChange={(value) => handleSelectChange('businessAddress', value)}
                      value={formData.businessAddress}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an area in Madurai" />
                      </SelectTrigger>
                      <SelectContent>
                        {maduraiAreas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Description
                    </label>
                    <Textarea
                      id="businessDescription"
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      placeholder="Describe your business and services..."
                      rows={3}
                    />
                  </div>
                </>
              )}

              {/* Password Fields */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  required
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" 
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-orange-600 hover:text-orange-700">Terms of Service</a> and <a href="#" className="text-orange-600 hover:text-orange-700">Privacy Policy</a>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account? 
                <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium ml-1">
                  Sign in
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

export default SignUp;
