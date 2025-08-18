
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BusinessCard from './BusinessCard';
import EnhancedBusinessCard from './EnhancedBusinessCard';
import { Filter } from 'lucide-react';
import { businessAPI, API_URL} from '@/services/api';
import { BASE_URL } from '@/services/api'; // Import BASE_URL
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom'; // Import Link

const BusinessSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);
      // Fetch all businesses initially
      const response = await businessAPI.getAllBusinesses({});
      // Sort by averageRating in descending order and take the top 6
      const sortedBusinesses = response.data.sort((a: any, b: any) => (b.averageRating || 0) - (a.averageRating || 0));
      setBusinesses(sortedBusinesses.slice(0, 6)); // Display only top 6
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch businesses',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // The filtering logic is no longer needed here as we only display top 6 on landing page
  // and filters are handled on the Businesses page.
  // const filteredBusinesses = businesses.filter(business => {
  //   const categoryMatch = !selectedCategory || selectedCategory === "All Categories" || business.category === selectedCategory;
  //   const locationMatch = !selectedLocation || selectedLocation === "All Locations" || business.location === selectedLocation;
  //   return categoryMatch && locationMatch;
  // });

  return (
    <section id="businesses" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Local <span className="text-orange-600">Businesses</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find the best businesses in Madurai
          </p>

          {/* Filter Controls - Removed from landing page as per new requirement */}
          {/* <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
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
          </div> */}
        </div>

        {/* Results Count - Adjusted for top 6 display */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing top {businesses.length} highly-rated businesses
          </p>
        </div>

        {/* Enhanced Business Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business: any) => (
            <EnhancedBusinessCard key={business._id} business={{ ...business, image: `${API_URL.replace('/api', '')}${business.image}` }} />
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center mt-8">
          <Link to="/businesses">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              See All Businesses
            </Button>
          </Link>
        </div>

        {businesses.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No businesses found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessSection;
