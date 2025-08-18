import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [factIndex, setFactIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const maduraiFacts = [
    "Madurai is over 2,500 years old - one of India's oldest continuously inhabited cities",
    "The Meenakshi Amman Temple attracts over 15,000 visitors daily",
    "Madurai is known as the 'Athens of the East' for its cultural significance",
    "The city is famous for its jasmine flowers and traditional silk sarees",
    "Madurai was once the capital of the ancient Pandyan Kingdom"
  ];

  const categories = [
    "Restaurants & Food",
    "Auto & Transport",
    "Education & Training",
    "Healthcare & Medical",
    "Shopping & Retail",
    "Services & Repairs",
    "Real Estate",
    "Entertainment"
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
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % maduraiFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    // Navigate to businesses page with selected filters as query parameters
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.append('category', selectedCategory);
    }
    
    if (selectedLocation) {
      params.append('location', selectedLocation);
    }
    
    navigate(`/businesses?${params.toString()}`);
  };

  return (
    <div className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(\Meenakshi-Amman-BG.png)' }}>
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      
      {/* Animated Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse top-20 -left-48"></div>
        <div className="absolute w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse bottom-20 -right-40 animation-delay-2000"></div>
      </div>

  <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 -mt-4 sm:-mt-12">
        {/* Enhanced Animated Title */}
        <div className="animate-fade-in space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 sm:mb-8">
            Discover{' '}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-400 to-orange-600 animate-gradient-x ml-0 mt-2">
              Madurai
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-xl sm:max-w-3xl mx-auto leading-relaxed">
            Your complete guide to local businesses and services in the cultural heart of Tamil Nadu
          </p>
        </div>

        {/* Enhanced Animated Facts */}
        <div className="mb-6 sm:mb-12 flex items-center justify-center">
          <div className="relative bg-white/95 backdrop-blur-md rounded-2xl px-4 sm:px-8 py-1 shadow-2xl animate-fade-in border border-white/20 w-full max-w-xl mt-4 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl"></div>
            <p className="text-gray-700 font-medium mx-auto text-base sm:text-lg relative z-10">
              <span className="text-2xl mr-2">💡</span>
              {maduraiFacts[factIndex]}
            </p>
           
          </div>
        </div>

        {/* Enhanced Search Section */}
  <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 -mt-4 sm:-mt-6 md:-mt-6 max-w-full sm:max-w-5xl mx-auto animate-scale-in border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl opacity-50"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              <span className="text-gray-800">Find Local</span> Businesses & <span className="text-blue-600 ">Services</span>
            </h3>
            
  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 md:gap-6 mb-8">
              <div className="relative group">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full h-14 border-2 border-gray-200 hover:border-orange-300 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm group-hover:shadow-lg">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-gray-100 shadow-xl">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative group">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full h-14 border-2 border-gray-200 hover:border-orange-300 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm group-hover:shadow-lg">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-gray-100 shadow-xl">
                    {locations.map((location) => (
                      <SelectItem key={location} value={location} className="rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200">
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSearch}
                className="h-14 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:via-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
              >
                <Search className="w-6 h-6 mr-3" />
                Search Businesses
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <p className="text-gray-600 text-lg font-medium">
                Discover amazing local businesses across Madurai
              </p>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse animation-delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
