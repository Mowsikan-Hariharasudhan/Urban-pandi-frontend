
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import ContactModal from './ContactModal';

interface BusinessCardProps {
  business: {
    id: string;
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

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden bg-white">
        <div className="relative overflow-hidden">
          <img 
            src={business.image} 
            alt={business.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
              {business.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
            {business.name}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < business.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({business.rating})</span>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{business.location}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {business.description}
          </p>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium"
          >
            Contact Now
          </Button>
        </CardContent>
      </Card>

      <ContactModal 
        business={business}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default BusinessCard;
