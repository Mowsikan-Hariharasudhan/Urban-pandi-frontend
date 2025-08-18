import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';
import { BASE_URL } from '@/services/api';
import { useServiceRole } from '@/contexts/ServiceRoleContext';

interface ServiceRequestModalProps {
  request: {
    _id: string;
    title: string;
    image: string;
    category: string;
    description: string;
    location: string;
    contactPhone: string;
    contactEmail: string;
    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ request, isOpen, onClose }) => {
  const { role, setRole } = useServiceRole();

  const handleCall = () => {
    window.open(`tel:${request.contactPhone}`, '_self');
  };

  const handleEmail = () => {
    window.open(`mailto:${request.contactEmail}`, '_self');
  };

  const handleViewDetails = () => {
    window.location.href = `/service-requests/${request._id}`;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {request.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Image */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img 
              src={request.image && request.image.startsWith('http') ? request.image : `${BASE_URL}${request.image}`}
              alt={request.title}
              className="w-full h-64 object-cover"
              onError={e => (e.currentTarget.src = '/placeholder.svg')}
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                {request.category}
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-md px-3 py-1 shadow-sm">
                <span className="text-xs font-medium text-blue-600 capitalize">{request.status}</span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2"></div>
                Description
              </h4>
              <p className="text-gray-600 mb-4">{request.description}</p>
              <Button
                onClick={handleViewDetails}
                variant="outline"
                className="w-full bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700 group flex items-center justify-center space-x-2 h-10"
              >
                <span>View Full Request Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2"></div>
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                Location
              </h4>
              <p className="text-gray-600 mb-3">{request.location}</p>
              {/* Embedded Google Map */}
              <div className="rounded-lg overflow-hidden border border-blue-100">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(request.location)}&output=embed`}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Request Location"
                />
              </div>
            </div>
          </div>

          {/* Contact Options */}
          {role === 'seeker' ? (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2"></div>
              Contact Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button onClick={handleCall} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 h-12">
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </Button>
              <Button onClick={() => window.open(`https://wa.me/${request.contactPhone.replace(/\D/g, '')}`, '_blank')} className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 14.487c-.263-.131-1.558-.77-1.799-.858-.241-.088-.417-.131-.593.132-.175.263-.678.858-.831 1.033-.153.175-.306.197-.569.066-.263-.132-1.111-.409-2.117-1.304-.782-.696-1.31-1.556-1.464-1.819-.153-.263-.016-.405.115-.536.118-.117.263-.306.395-.459.132-.153.175-.263.263-.438.088-.175.044-.329-.022-.46-.066-.132-.593-1.433-.813-1.963-.214-.514-.432-.444-.593-.452l-.504-.009c-.175 0-.46.066-.701.329-.241.263-.92.899-.92 2.192 0 1.293.942 2.544 1.073 2.718.131.175 1.855 2.832 4.5 3.857.63.217 1.122.346 1.505.442.632.161 1.208.138 1.663.084.508-.06 1.558-.637 1.779-1.253.22-.616.22-1.143.153-1.253-.066-.11-.241-.175-.504-.306z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 1.591.416 3.085 1.14 4.374L3 21l4.755-1.247A8.963 8.963 0 0012 21c4.97 0 9-4.03 9-9z" /></svg>
                <span>WhatsApp</span>
              </Button>
              <Button onClick={handleEmail} className="bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2 h-12">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Button>
            </div>
          </div>) : (
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white border border-dashed border-blue-300 rounded-lg text-center">
              <p className="text-gray-700 mb-3 text-sm">Contact details are hidden in provider mode.</p>
              <Button size="sm" variant="outline" onClick={() => setRole('seeker')}>Switch to Seeker Mode</Button>
            </div>
          )}

          {/* Contact Details */}
          {role === 'seeker' && (
          <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2"></div>
              Contact Details
            </h4>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-white rounded-md border border-blue-100 hover:border-blue-200 transition-colors duration-200">
                <Phone className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-xs text-blue-600 font-medium">Phone</p>
                  <p className="text-gray-900">{request.contactPhone}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white rounded-md border border-blue-100 hover:border-blue-200 transition-colors duration-200">
                <MessageCircle className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="text-xs text-green-600 font-medium">WhatsApp</p>
                  <p className="text-gray-900">{request.contactPhone}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white rounded-md border border-blue-100 hover:border-blue-200 transition-colors duration-200">
                <Mail className="w-5 h-5 text-orange-500 mr-3" />
                <div>
                  <p className="text-xs text-orange-600 font-medium">Email</p>
                  <p className="text-gray-900 break-all">{request.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestModal;
