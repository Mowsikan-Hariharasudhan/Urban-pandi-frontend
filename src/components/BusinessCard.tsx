import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import ContactModal from './ContactModal';
// Add Link import
import { Link } from 'react-router-dom';

interface BusinessCardProps {
  business: {
    _id: string; // Changed from id: string;
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

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <Link to={`/businesses`} className="block hover:no-underline">
      <Card onClick={handleContactClick}
      className="overflow-hidden bg-white shadow-sm rounded-xl border border-orange-500">
        <div className="relative overflow-hidden h-52 rounded-t-xl">
          <img 
            src={business.image} 
            alt={business.name}
            className="w-full h-full object-cover"
          />
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Enhanced Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 px-3 py-1.5 text-sm font-semibold shadow-lg backdrop-blur-sm">
              {business.category}
            </Badge>
          </div>
          
          {/* Enhanced Rating Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1.5" />
              <span className="text-sm font-bold text-gray-800">{business.rating}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-4">
          {/* Enhanced Business Name */}
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
            {business.name}
          </h3>
          
          {/* Enhanced Location with Icon Background */}
          <div className="flex items-center text-gray-600">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mr-3 group-hover:bg-orange-200 transition-colors duration-300">
              <MapPin className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium">{business.location}</span>
          </div>
          
          {/* Enhanced Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
            {business.description}
          </p>
          
          {/* Enhanced Contact Button */}
          <Button 
            onClick={handleContactClick}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Contact Now
          </Button>
        </CardContent>
      </Card>

      <ContactModal 
        business={{...business, id: business._id}}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      </Link>
    </>
  );
};

export default BusinessCard;
