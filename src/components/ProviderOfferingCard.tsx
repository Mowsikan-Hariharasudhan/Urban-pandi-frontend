import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/services/api';

interface ProviderOfferingCardProps {
  offering: {
    _id: string;
    title: string;
    description: string;
    category: string;
    serviceArea: string;
    pricingType: string;
    basePrice?: number;
    image: string;
    status: 'active' | 'paused';
    provider: { firstName: string; lastName: string };
  };
}

const ProviderOfferingCard: React.FC<ProviderOfferingCardProps> = ({ offering }) => {
  const imageSrc = offering.image?.startsWith('http') ? offering.image : `${BASE_URL}${offering.image}`;

  const timeSince = (isoDate?: string) => {
    try {
      if (!isoDate) return '';
      const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
      if (seconds < 60) return `${seconds}s ago`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    } catch {
      return '';
    }
  };

  const priceLabel = offering.pricingType === 'fixed' && offering.basePrice ? `₹${offering.basePrice}` :
    offering.pricingType === 'starting-from' && offering.basePrice ? `From ₹${offering.basePrice}` :
    offering.pricingType === 'hourly' && offering.basePrice ? `₹${offering.basePrice}/hr` :
    'Get a Quote';

  const getStatusColor = (status: 'active' | 'paused') => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm rounded-xl border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-48 w-full h-40 md:h-auto flex-shrink-0 overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <img src={imageSrc} alt={offering.title} className="w-full h-full object-cover" />
        </div>

  <div className="p-4 flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 truncate">{offering.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{offering.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 max-w-[45%] shrink-0">
                <Badge className={`px-2 py-1 ${getStatusColor(offering.status)}`}>{offering.status}</Badge>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-lg font-semibold text-gray-900 whitespace-nowrap">{priceLabel}</div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center text-sm text-gray-500 gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700 truncate">{offering.serviceArea}</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="text-gray-600 truncate">By {offering.provider.firstName} {offering.provider.lastName}</div>

            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link to={`/provider-offerings/${offering._id}`}>
              <Button variant="ghost" className="text-sm">View details</Button>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[160px]">#{offering.category}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProviderOfferingCard;
