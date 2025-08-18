import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';
import { BASE_URL } from '@/services/api';
import { useServiceRole } from '@/contexts/ServiceRoleContext';

interface ProviderOfferingModalProps {
  offering: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProviderOfferingModal: React.FC<ProviderOfferingModalProps> = ({ offering, isOpen, onClose }) => {
  const { role } = useServiceRole();

  const handleCall = () => {
    window.open(`tel:${offering.contactPhone}`, '_self');
  };

  const handleEmail = () => {
    window.open(`mailto:${offering.contactEmail}`, '_self');
  };

  const handleViewDetails = () => {
    window.location.href = `/provider-offerings/${offering._id}`;
    onClose();
  };

  const showContact = role === 'seeker';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {offering.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={offering.image?.startsWith('http') ? offering.image : `${BASE_URL}${offering.image}`}
              alt={offering.title}
              className="w-full h-64 object-cover"
              onError={e => (e.currentTarget.src = '/placeholder.svg')}
            />
            <div className="absolute top-4 right-4 space-y-2 flex flex-col items-end">
              <Badge className="bg-blue-600 text-white">{offering.category}</Badge>
              <Badge className={offering.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'}>
                {offering.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2" />
                Description
              </h4>
              <p className="text-gray-600 mb-4">{offering.description}</p>
              <Button onClick={handleViewDetails} variant="outline" className="w-full bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700 group flex items-center justify-center space-x-2 h-10">
                <span>View Full Offering Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2" />
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                Service Area
              </h4>
              <p className="text-gray-600 mb-3">{offering.serviceArea}</p>
              <div className="rounded-lg overflow-hidden border border-blue-100">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(offering.serviceArea)}&output=embed`}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Area Map"
                />
              </div>
            </div>
          </div>

          {showContact ? (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2" />
                Contact Options
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button onClick={handleCall} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 flex items-center justify-center space-x-2 h-12">
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </Button>
                <Button onClick={() => window.open(`https://wa.me/${offering.contactPhone.replace(/\D/g, '')}`, '_blank')} className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 flex items-center justify-center space-x-2 h-12">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </Button>
                <Button onClick={handleEmail} className="bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-600 hover:to-orange-700 flex items-center justify-center space-x-2 h-12">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Button>
              </div>
              <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 mt-5">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2" />
                  Contact Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-white rounded-md border border-blue-100">
                    <Phone className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-xs text-blue-600 font-medium">Phone</p>
                      <p className="text-gray-900">{offering.contactPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-md border border-blue-100">
                    <MessageCircle className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-xs text-green-600 font-medium">WhatsApp</p>
                      <p className="text-gray-900">{offering.contactPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-md border border-blue-100">
                    <Mail className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <p className="text-xs text-orange-600 font-medium">Email</p>
                      <p className="text-gray-900 break-all">{offering.contactEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white border border-dashed border-blue-300 rounded-lg text-center">
              <p className="text-gray-700 mb-4">Switch to seeker mode to view and contact this provider.</p>
              <p className="text-xs text-gray-500">Contact details hidden in provider mode.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProviderOfferingModal;
