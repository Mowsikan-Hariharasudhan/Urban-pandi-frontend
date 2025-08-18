import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import EnhancedBusinessCard from './EnhancedBusinessCard';
import { Sparkles, TrendingUp, ArrowRight, MapPin } from 'lucide-react';
import { businessAPI, API_URL} from '@/services/api';
import { BASE_URL } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const ModernBusinessSection = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);
      const response = await businessAPI.getAllBusinesses();
      
      // Sort by rating and take top 6
      const sortedBusinesses = response.data.sort((a: any, b: any) => b.rating - a.rating);
      setBusinesses(sortedBusinesses.slice(0, 6));
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast({
        title: 'Error',
        description: 'Failed to load businesses. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Featured Businesses
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Discover
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 ml-3">
              Top-Rated
            </span>
            <br />
            Businesses in Madurai
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated selection of the highest-rated businesses, 
            from local favorites to must-visit destinations that define Madurai's vibrant commercial landscape.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">500+</div>
            <div className="text-sm text-gray-600">Businesses</div>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">15+</div>
            <div className="text-sm text-gray-600">Locations</div>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">4.8</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">1000+</div>
            <div className="text-sm text-gray-600">Reviews</div>
          </div>
        </div>

        {/* Results Count with Enhanced Design */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              <p className="text-gray-700 font-medium">
                Showing <span className="text-orange-600 font-bold">{businesses.length}</span> top-rated businesses
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Business Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {businesses.map((business: any, index) => (
            <div 
              key={business._id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <EnhancedBusinessCard 
                business={{ 
                  ...business, 
                  image: `${API_URL.replace('/api', '')}${business.image}` 
                }} 
              />
            </div>
          ))}
        </div>

        {/* Enhanced Call-to-Action */}
        <div className="text-center">
          <Link to="/businesses">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
            >
              Explore All Businesses
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          
          <p className="text-gray-600 mt-4 text-sm">
            Discover hundreds more businesses across Madurai
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ModernBusinessSection;