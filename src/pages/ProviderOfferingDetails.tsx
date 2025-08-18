import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { providerOfferingAPI, API_URL } from '../services/api';
import Navigation from '@/components/Navigation-Service-Page';
import Footer from '@/components/Footer-Service-Section';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';

interface ProviderOffering {
  _id: string;
  title: string;
  description: string;
  category: string;
  serviceArea: string;
  pricingType: 'fixed' | 'starting-from' | 'hourly' | 'quote';
  basePrice?: number;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber?: string;
  image: string;
  status: 'active' | 'paused';
  provider: { firstName: string; lastName: string; email?: string };
  createdAt: string;
}

const ProviderOfferingDetails: React.FC = () => {
  const { offeringId } = useParams<{ offeringId: string }>();
  const navigate = useNavigate();
  const [offering, setOffering] = useState<ProviderOffering | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { role, setRole } = useServiceRole();

  useEffect(() => {
    if (offeringId) fetchOffering();
  }, [offeringId]);

  const fetchOffering = async () => {
    try {
      setIsLoading(true);
      const res = await providerOfferingAPI.getProviderOfferingById(offeringId!);
      setOffering(res.data);
    } catch (err) {
      console.error('Error loading offering details:', err);
      navigate('/provider-offerings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => navigate('/provider-offerings');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!offering) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 py-4">
          <Button variant="outline" onClick={handleBack}>← Back</Button>
        </div>
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Offering Not Found</h2>
          <p className="text-gray-600">The service offering you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const priceLabel =
    offering.pricingType === 'fixed' && offering.basePrice
      ? `₹${offering.basePrice}`
      : offering.pricingType === 'starting-from' && offering.basePrice
      ? `From ₹${offering.basePrice}`
      : offering.pricingType === 'hourly' && offering.basePrice
      ? `₹${offering.basePrice}/hr`
      : 'Get a Quote';

  const showContact = role === 'seeker';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-blue-600 hover:bg-blue-50 -ml-2 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>

        <div className="relative rounded-xl overflow-hidden mb-8 bg-white shadow-md">
          <div className="h-64 bg-gray-200">
            <img
              src={
                offering.image.startsWith('http')
                  ? offering.image
                  : `${API_URL.replace('/api', '')}${offering.image}`
              }
              alt={offering.title}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
            <span className={`font-semibold ${offering.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>              {offering.status.toUpperCase()}
            </span>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{offering.title}</h1>
                <div className="flex items-center text-gray-600 mb-4 gap-3 flex-wrap">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {offering.category}
                  </span>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-blue-500 mr-1" />
                    <span>{offering.serviceArea}</span>
                  </div>
                </div>
              </div>
              {showContact ? (
                <div className="flex space-x-2">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => window.open(`tel:${offering.contactPhone}`, '_blank')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => window.open(`https://wa.me/${offering.contactPhone.replace(/\D/g, '')}`, '_blank')}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={() => window.open(`mailto:${offering.contactEmail}`, '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setRole('seeker')}>Switch to Seeker Mode</Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Description and Price */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{offering.description}</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-semibold">Price: {priceLabel}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Contact Information sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Service Area</h3>
                    <p className="mt-1 flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{offering.serviceArea}</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      {role === 'seeker' ? (
                        <a href={`tel:${offering.contactPhone}`} className="text-blue-600 hover:underline">
                          {offering.contactPhone}
                        </a>
                      ) : (
                        <span className="text-gray-400 select-none">Hidden in provider mode</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-2" />
                      {role === 'seeker' ? (
                        <a href={`mailto:${offering.contactEmail}`} className="text-blue-600 hover:underline break-all">
                          {offering.contactEmail}
                        </a>
                      ) : (
                        <span className="text-gray-400 select-none">Hidden in provider mode</span>
                      )}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Provided by</h3>
                    <p className="mt-1">
                      {offering.provider.firstName} {offering.provider.lastName}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Posted on {new Date(offering.createdAt).toLocaleDateString()}
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

export default ProviderOfferingDetails;
