import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ReviewSection from '@/components/ReviewSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { businessAPI, API_URL } from '@/services/api'; // Corrected import for API_URL
import { MapPin, Phone, Mail, Globe, MessageSquare, ArrowLeft } from 'lucide-react';
import StarRating from '@/components/StarRating';
import { useNavigate } from 'react-router-dom';

type Business = {
  _id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  image: string;
  rating: number;
};

const BusinessDetails = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    navigate('/businesses');
  };

  useEffect(() => {
    if (businessId) {
      fetchBusinessDetails();
    }
  }, [businessId]);

  const fetchBusinessDetails = async () => {
    try {
      setIsLoading(true);
      const response = await businessAPI.getBusinessById(businessId!);
      setBusiness(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch business details',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Not Found</h2>
          <p className="text-gray-600">The business you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-orange-600 hover:bg-orange-50 -ml-2 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>

        {/* Business Header */}
        <div className="relative rounded-xl overflow-hidden mb-8 bg-white shadow-md">
          <div className="h-64 bg-gray-200">
            <img 
              src={`${API_URL.replace('/api', '')}${business.image}`} // Correctly prepend base URL to the image path
              alt={business.name} 
              className="w-full h-full object-cover"
              onError={(e) => (e.target as HTMLImageElement).src = '/placeholder.svg'}
            />
          </div>
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="flex items-center space-x-2">
              <StarRating rating={Number(business.rating)} size="md" />
              <span className="font-semibold">{business.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{business.name}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                    {business.category}
                  </span>
                  <div className="mx-3 w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {business.location}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => window.open(`https://wa.me/${business.whatsapp || business.phone.replace(/\D/g, '')}`, '_blank')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => window.open(`tel:${business.phone}`, '_blank')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Business Details */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About This Business</h2>
                <p className="text-gray-700 whitespace-pre-line">{business.description}</p>
              </CardContent>
            </Card>
            
            {/* Reviews Section */}
            <ReviewSection businessId={business._id} />
          </div>
          
          {/* Contact Information */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                    <p className="mt-1 flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{business.address}</span>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                        {business.phone}
                      </a>
                    </p>
                  </div>
                  
                  {business.whatsapp && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">WhatsApp</h3>
                      <p className="mt-1 flex items-center">
                        <MessageSquare className="w-5 h-5 text-gray-400 mr-2" />
                        <a 
                          href={`https://wa.me/${business.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline"
                        >
                          {business.whatsapp}
                        </a>
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-2" />
                      <a 
                        href={`mailto:${business.email}`} 
                        className="text-blue-600 hover:underline break-all"
                      >
                        {business.email}
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessDetails;