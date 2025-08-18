import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { BASE_URL } from '../services/api';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';

interface ServiceRequestCardProps {
  request: {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    budget: number;
    image: string;
    status: 'open' | 'in-progress' | 'completed';
    createdAt: string;
    requester: {
      firstName: string;
      lastName: string;
    };
  };
}

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({ request }) => {
  const imageSrc = request.image?.startsWith('http') ? request.image : `${BASE_URL}${request.image}`;

  const timeSince = (isoDate: string) => {
    try {
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

  return (
    <Card className="overflow-hidden bg-white shadow-sm rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-48 w-full h-full md:h-auto flex-shrink-0 overflow-hidden">
          <img src={imageSrc} alt={request.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 truncate">{request.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{request.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={`px-2 py-1 ${getStatusColor(request.status)}`}>{request.status}</Badge>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Budget</div>
                  <div className="text-lg font-semibold text-gray-900">₹{request.budget}</div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center text-sm text-gray-500 gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700 truncate">{request.location}</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="text-gray-600 truncate">Posted by {request.requester.firstName} {request.requester.lastName}</div>
              <div className="flex-1 text-right text-gray-400">{timeSince(request.createdAt)}</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link to={`/service-requests/${request._id}`}>
              <Button variant="ghost" className="text-sm">View details</Button>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-gray-400 ">#{request.category}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default ServiceRequestCard;