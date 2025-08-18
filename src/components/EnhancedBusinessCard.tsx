import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, MessageCircle, Mail, Clock, Heart } from 'lucide-react';
import ContactModal from './ContactModal';
import { Link } from 'react-router-dom';

interface BusinessCardProps {
  business: {
    _id: string;
    name: string;
    image: string;
    category: string;
    description: string;
    rating: number;
    location: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
}

const EnhancedBusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <Link to={`/businesses/${business._id}`} className="block hover:no-underline">
        <Card onClick={handleContactClick}
          className="overflow-hidden bg-white shadow-sm rounded-xl border border-orange-500"
        >
          {/* Enhanced Image Section with Overlay */}
          <div className="relative overflow-hidden h-56 rounded-t-xl">
            <img 
              src={business.image} 
              alt={business.name}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Enhanced Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg">
                {business.category}
              </Badge>
            </div>
            
            
            {/* Enhanced Rating Badge */}
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-semibold text-gray-800">{business.rating}</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Content Section */}
          <CardContent className="p-6 space-y-4">
            {/* Business Name with Animation */}
            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
              {business.name}
            </h3>
            
            {/* Enhanced Location with Icon */}
            <div className="flex items-center text-gray-600">
              <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mr-3">
                <MapPin className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm font-medium">{business.location}</span>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
              {business.description}
            </p>

            {/* Quick Contact Icons */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <button className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-200">
                  <Phone className="w-4 h-4 text-blue-600" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 bg-green-100 hover:bg-green-200 rounded-full transition-colors duration-200">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                  <Mail className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              {/* Enhanced Contact Button */}
              <Button 
                onClick={handleContactClick}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
              >
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>

      <ContactModal 
        business={{...business, id: business._id}}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default EnhancedBusinessCard;