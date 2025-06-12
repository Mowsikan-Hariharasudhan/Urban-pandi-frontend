
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const HeroSection = () => {
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
    "Anna Nagar",
    "K.K. Nagar",
    "Samayanallur",
    "Vilangudi",
    "Sellur",
    "Palanganatham",
    "Thirunagar",
    "Goripalayam"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % maduraiFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    console.log('Searching with:', { category: selectedCategory, location: selectedLocation });
    // TODO: Implement search functionality
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Animated Title */}
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Discover
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 ml-3">
              Madurai
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Your complete guide to local businesses and services
          </p>
        </div>

        {/* Animated Facts */}
        <div className="mb-12 h-16 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg animate-fade-in">
            <p className="text-gray-700 font-medium max-w-2xl mx-auto">
              💡 {maduraiFacts[factIndex]}
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto animate-scale-in">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Find Local Businesses</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleSearch}
              className="h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>

          <p className="text-gray-500 text-sm">
            Discover amazing local businesses across Madurai
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
