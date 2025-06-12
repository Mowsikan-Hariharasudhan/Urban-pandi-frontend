
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BusinessCard from './BusinessCard';
import { Filter } from 'lucide-react';

const BusinessSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const categories = [
    "All Categories",
    "Restaurants & Food",
    "Auto & Transport",
    "Education & Training",
    "Healthcare & Medical",
    "Shopping & Retail"
  ];

  const locations = [
    "All Locations",
    "Anna Nagar",
    "K.K. Nagar",
    "Samayanallur",
    "Vilangudi",
    "Sellur"
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
    }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const categoryMatch = !selectedCategory || selectedCategory === "All Categories" || business.category === selectedCategory;
    const locationMatch = !selectedLocation || selectedLocation === "All Locations" || business.location === selectedLocation;
    return categoryMatch && locationMatch;
  });

  return (
    <section id="businesses" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Local <span className="text-orange-600">Businesses</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find the best businesses and services in Madurai
          </p>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
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
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBusinesses.length} of {businesses.length} businesses
          </p>
        </div>

        {/* Business Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No businesses found matching your filters.</p>
            <Button 
              onClick={() => {
                setSelectedCategory('');
                setSelectedLocation('');
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessSection;
