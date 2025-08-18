
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, MessageCircle, Mail, Star, Clock, ArrowRight } from 'lucide-react';
import { contactAPI } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

  const handleViewDetails = () => {
    window.location.href = `/businesses/${business.id}`;
    onClose();
  };

  const handleEmail = () => {
    window.open(`mailto:${business.email}`, '_self');
  };

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: `Inquiry about ${business?.name || ''}`,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      await contactAPI.contactBusiness(business.id, contactForm);
      
      toast({
        title: 'Message Sent',
        description: `Your message has been sent to ${business.name}!`,
      });
      
      // Reset form and close modal
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: `Inquiry about ${business?.name || ''}`,
        message: ''
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {business.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Business Image */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img 
              src={business.image} 
              alt={business.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                {business.category}
              </Badge>
            </div>
            
            {/* Rating Badge */}
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-md px-3 py-1 shadow-sm">
                <Star className="w-4 h-4 text-orange-500 fill-current mr-1" />
                <span className="text-sm font-medium">{business.rating}</span>
              </div>
            </div>
          </div>

          {/* Business Info Section */}
          <div className="space-y-6">
            {/* Business Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-2"></div>
                About
              </h4>
              <p className="text-gray-600 mb-4">{business.description}</p>
              <Button
                onClick={handleViewDetails}
                variant="outline"
                className="w-full bg-white hover:bg-orange-50 border-orange-200 text-orange-600 hover:text-orange-700 group flex items-center justify-center space-x-2 h-10"
              >
                <span>View Full Business Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-2"></div>
                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                Location
              </h4>
              <p className="text-gray-600 mb-3">{business.address}</p>
              
              {/* Embedded Google Map */}
              <div className="rounded-lg overflow-hidden border border-orange-100">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Business Location"
                />
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-2"></div>
              Contact Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                onClick={handleCall}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2 h-12"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </Button>
              
              <Button 
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 h-12"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </Button>
              
              <Button 
                onClick={handleEmail}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 h-12"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-orange-50/50 rounded-lg p-4 border border-orange-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-2"></div>
              Contact Details
            </h4>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-white rounded-md border border-orange-100 hover:border-orange-200 transition-colors duration-200">
                <Phone className="w-5 h-5 text-orange-500 mr-3" />
                <div>
                  <p className="text-xs text-orange-600 font-medium">Phone</p>
                  <p className="text-gray-900">{business.phone}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white rounded-md border border-orange-100 hover:border-orange-200 transition-colors duration-200">
                <MessageCircle className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="text-xs text-green-600 font-medium">WhatsApp</p>
                  <p className="text-gray-900">{business.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white rounded-md border border-orange-100 hover:border-orange-200 transition-colors duration-200">
                <Mail className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-xs text-blue-600 font-medium">Email</p>
                  <p className="text-gray-900 break-all">{business.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
