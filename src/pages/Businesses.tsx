import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';
import BusinessCard from '@/components/BusinessCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';
import { businessAPI, API_URL } from '@/services/api';
import { BASE_URL } from '@/services/api'; // Import BASE_URL

const Businesses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const categories = [
    "All Categories",
    "Restaurants & Food",
    "Auto & Transport", 
    "Education & Training",
    "Healthcare & Medical",
    "Shopping & Retail",
    "Beauty & Wellness",
    "Electronics & Technology",
    "Home & Garden"
  ];

  const locations = [
   
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

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setIsLoading(true);
    try {
      // Prepare filters based on URL parameters
      const filters = {};
      
      if (selectedCategory && selectedCategory !== 'All Categories') {
        (filters as {[key: string]: string}).category = selectedCategory;
      }
      
      if (selectedLocation && selectedLocation !== 'All Locations') {
(filters as {[key: string]: string}).location = selectedLocation;
      }
      
      const response = await businessAPI.getAllBusinesses(filters);
      setBusinesses(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      // If API fails, use the hardcoded data as fallback
    } finally {
      setIsLoading(false);
    }
  };

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory && selectedCategory !== 'All Categories') {
      params.append('category', selectedCategory);
    }
    
    if (selectedLocation && selectedLocation !== 'All Locations') {
      params.append('location', selectedLocation);
    }
    
    setSearchParams(params);
    
    // Fetch businesses with new filters
    fetchBusinesses();
  }, [selectedCategory, selectedLocation]);

  const filteredBusinesses = businesses.filter(business => {
    const searchMatch = !searchQuery || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Enhanced Header Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-orange-500 rounded-full blur-3xl -top-48 -right-48 animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-red-500 rounded-full blur-3xl -bottom-40 -left-40 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Madurai <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Business Directory</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the best businesses and services in the cultural heart of Tamil Nadu
            </p>

         <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for service requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-500 hover:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-8">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter by:</span>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button onClick={() => {
                // If not logged in, prompt to sign up as business
                if (!isAuthenticated) {
                  toast({ title: 'Please sign up or login', description: 'You need a business account to add a listing.' });
                  navigate('/signup?as=business');
                  return;
                }

                if (user?.userType === 'business') {
                  navigate('/business-listing');
                } else {
                  // Logged in but not a business user
                  toast({ title: 'Switch to a business account', description: 'Please sign up as a business to add a listing.' });
                  navigate('/signup?as=business');
                }
              }} className="bg-green-600 text-white hover:bg-green-700">
                Add a new business
              </Button>
            </div>
            <Button onClick={() => {
              setSelectedCategory('');
              setSelectedLocation('');
              setSearchQuery('');
            }} variant="outline">
              Clear All
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-spin mx-auto mb-6 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full"></div>
              </div>
              <p className="text-xl text-gray-600 font-medium">Loading amazing businesses...</p>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="mb-8">
                <div className="px-2 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>

                    <p className="text-gray-500 text-base">
                      Showing <span className="font-semibold text-orange-600">{filteredBusinesses.length}</span> of <span className="font-semibold text-gray-800">{businesses.length}</span> businesses
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business._id} business={{ ...business, image: `${API_URL.replace('/api', '')}${business.image}` }} />
                ))}
              </div>

              {/* Enhanced Empty State */}
              {filteredBusinesses.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Search className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">No businesses found</h3>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    We couldn't find any businesses matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedLocation('');
                      setSearchQuery('');
                    }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Businesses;
