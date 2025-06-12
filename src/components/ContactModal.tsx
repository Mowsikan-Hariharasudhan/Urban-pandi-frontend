
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, MessageCircle, Mail, Star, Clock } from 'lucide-react';

interface ContactModalProps {
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
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ business, isOpen, onClose }) => {
  const handleCall = () => {
    window.open(`tel:${business.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${business.whatsapp}`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:${business.email}`, '_self');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {business.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Business Image */}
          <div className="relative">
            <img 
              src={business.image} 
              alt={business.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
              {business.category}
            </Badge>
          </div>

          {/* Rating and Basic Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < business.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-2 text-gray-600">({business.rating}/5)</span>
            </div>
            <div className="flex items-center text-green-600">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Open Now</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">About</h4>
            <p className="text-gray-600">{business.description}</p>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Location
            </h4>
            <p className="text-gray-600 mb-3">{business.address}</p>
            
            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p>Interactive Map</p>
                <p className="text-sm">Location: {business.location}</p>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Contact Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                onClick={handleCall}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              
              <Button 
                onClick={handleWhatsApp}
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              
              <Button 
                onClick={handleEmail}
                className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Contact Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
                <span>{business.whatsapp}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>{business.email}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
