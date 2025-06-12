
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BusinessCard from '@/components/BusinessCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';

const Businesses = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
    "All Locations",
    "Anna Nagar",
    "K.K. Nagar", 
    "Samayanallur",
    "Vilangudi",
    "Sellur",
    "Teppakulam",
    "Goripalayam",
    "Pasumalai"
  ];

  const businesses = [
    {
      id: "1",
      name: "Madurai Meenakshi Restaurant",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      category: "Restaurants & Food",
      description: "Authentic South Indian cuisine with traditional flavors. Famous for our Madurai special biryani and filter coffee.",
      rating: 4,
      location: "Anna Nagar",
      phone: "+91 98765 43210",
      whatsapp: "919876543210",
      email: "contact@meenakshirestaurant.com",
      address: "123 Temple Street, Anna Nagar, Madurai - 625002"
    },
    {
      id: "2",
      name: "Kumar Auto Service Center",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=400&h=300&fit=crop",
      category: "Auto & Transport",
      description: "Professional auto repair and maintenance services. Specialized in all vehicle types with experienced mechanics.",
      rating: 5,
      location: "K.K. Nagar",
      phone: "+91 98765 43211",
      whatsapp: "919876543211",
      email: "kumar@autoservice.com",
      address: "456 Service Road, K.K. Nagar, Madurai - 625003"
    },
    {
      id: "3",
      name: "Bright Future Academy",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop",
      category: "Education & Training",
      description: "Leading educational institute for competitive exam preparation. Expert faculty and proven track record.",
      rating: 4,
      location: "Samayanallur",
      phone: "+91 98765 43212",
      whatsapp: "919876543212",
      email: "info@brightfuture.edu",
      address: "789 Education Street, Samayanallur, Madurai - 625004"
    },
    {
      id: "4",
      name: "City Health Clinic",
      image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=400&h=300&fit=crop",
      category: "Healthcare & Medical",
      description: "Modern healthcare facility with experienced doctors. General medicine and specialist consultations available.",
      rating: 5,
      location: "Vilangudi",
      phone: "+91 98765 43213",
      whatsapp: "919876543213",
      email: "care@cityhealthclinic.com",
      address: "321 Health Avenue, Vilangudi, Madurai - 625005"
    },
    {
      id: "5",
      name: "Madurai Silk Emporium",
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=300&fit=crop",
      category: "Shopping & Retail",
      description: "Premium silk sarees and traditional clothing. Authentic Madurai handloom products and designer collections.",
      rating: 4,
      location: "Sellur",
      phone: "+91 98765 43214",
      whatsapp: "919876543214",
      email: "sales@maduraisilk.com",
      address: "654 Silk Street, Sellur, Madurai - 625006"
    },
    {
      id: "6",
      name: "Temple View Restaurant",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      category: "Restaurants & Food",
      description: "Fine dining with a view of Meenakshi Temple. Multi-cuisine restaurant serving traditional and modern dishes.",
      rating: 5,
      location: "Anna Nagar",
      phone: "+91 98765 43215",
      whatsapp: "919876543215",
      email: "booking@templeview.com",
      address: "987 Temple View Road, Anna Nagar, Madurai - 625007"
    },
    {
      id: "7",
      name: "Digital Solutions Hub",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "Electronics & Technology",
      description: "Complete IT solutions, laptop repairs, and mobile accessories. Expert technical support and consultancy.",
      rating: 4,
      location: "Teppakulam",
      phone: "+91 98765 43216",
      whatsapp: "919876543216",
      email: "support@digitalsolutions.com",
      address: "101 Tech Street, Teppakulam, Madurai - 625008"
    },
    {
      id: "8",
      name: "Glam Beauty Salon",
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop",
      category: "Beauty & Wellness",
      description: "Professional beauty treatments, hair styling, and wellness services. Modern salon with experienced stylists.",
      rating: 5,
      location: "Goripalayam",
      phone: "+91 98765 43217",
      whatsapp: "919876543217",
      email: "book@glambeauty.com",
      address: "202 Beauty Lane, Goripalayam, Madurai - 625009"
    }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const categoryMatch = !selectedCategory || selectedCategory === "All Categories" || business.category === selectedCategory;
    const locationMatch = !selectedLocation || selectedLocation === "All Locations" || business.location === selectedLocation;
    const searchMatch = !searchQuery || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && locationMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Madurai <span className="text-orange-600">Business Directory</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the best businesses and services in Madurai
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for businesses, services, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
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
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="All Locations" />
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
              onClick={() => {
                setSelectedCategory('');
                setSelectedLocation('');
                setSearchQuery('');
              }}
              variant="outline"
            >
              Clear All
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600 text-lg">
              Showing {filteredBusinesses.length} of {businesses.length} businesses
            </p>
          </div>

          {/* Business Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-500 mb-4">No businesses found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedLocation('');
                  setSearchQuery('');
                }}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Businesses;
