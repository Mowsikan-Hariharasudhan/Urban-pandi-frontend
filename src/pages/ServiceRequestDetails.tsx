import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios directly
import { serviceRequestAPI, API_URL, offersAPI } from '../services/api';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation-Service-Page';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import Footer from '@/components/Footer-Service-Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Comment {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  text: string;
  createdAt: string;
}

interface ServiceRequest {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  contactPhone: string;
  contactEmail: string;
  image: string;
  status: 'open' | 'in-progress' | 'completed';
  requester: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  comments: Comment[];
  createdAt: string;
}

interface Offer {
  _id: string;
  message?: string;
  proposedPrice?: number;
  status: 'sent' | 'accepted' | 'declined' | 'withdrawn';
  provider?: { firstName: string; lastName: string; email?: string };
}

const ServiceRequestDetails = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [sendingOffer, setSendingOffer] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [myOffer, setMyOffer] = useState<Offer | null>(null);
  const { role, setRole } = useServiceRole();
  const { user } = useAuth();
  const isOwner = !!(user && request && user.id === request.requester._id);

  useEffect(() => {
    if (requestId) {
      fetchRequestDetails();
    }
  }, [requestId]);

  useEffect(() => {
    // Load offers for seekers or when original requester views in provider mode
    if ((role === 'seeker' || isOwner) && requestId) {
      loadOffers();
    }
  }, [role, requestId, isOwner]);

  useEffect(() => {
    if (role === 'provider' && requestId) {
      offersAPI.getMyOffers().then(res => {
        const found = res.data.find((o: any) => o.request?._id === requestId);
        if (found) setMyOffer(found);
      }).catch(() => {});
    }
  }, [role, requestId]);

  const handleBack = () => {
    navigate('/service-requests');
  };

  const loadOffers = async () => {
    try {
      const res = await offersAPI.getOffersForRequest(requestId!);
      setOffers(res.data);
    } catch {}
  };

  const handleSendOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestId) return;
    setSendingOffer(true);
    try {
      const payload: any = {};
      if (offerMessage.trim()) payload.message = offerMessage.trim();
      if (offerPrice) payload.proposedPrice = Number(offerPrice);
      const res = await offersAPI.createOffer(requestId, payload);
      setMyOffer(res.data);
      setOfferMessage('');
      setOfferPrice('');
    } catch (err: any) {
      console.error('Error sending offer', err);
      const message = err.response?.data?.message || 'Failed to send offer';
      toast({ title: 'Offer Failed', variant: 'destructive', description: message });
    } finally {
      setSendingOffer(false);
    }
  };

  const handleOfferStatus = async (offerId: string, status: string) => {
    try {
      await offersAPI.updateOfferStatus(offerId, status);
      loadOffers();
    } catch (err) {
      console.error('Error updating offer status', err);
    }
  };
  const fetchRequestDetails = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Add token to headers if it exists
      // Use the direct API call instead of serviceRequestAPI, using requestId
      const response = await axios.get(`http://localhost:5000/api/service-requests/${requestId}`, { headers }); // Corrected: Use requestId
      setRequest(response.data);
    } catch (error) {
      console.error('Error fetching request details:', error);
      navigate('/service-requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !requestId) return;

    try {
      await serviceRequestAPI.addComment(requestId, { text: comment });
      setComment('');
      fetchRequestDetails();
    } catch (error) {
      console.error('Error adding comment:', error);
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

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        
        <div className="container mx-auto px-4 py-4">
          <Button variant="outline" onClick={() => navigate(-1)}>← Back</Button>
        </div>
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Not Found</h2>
          <p className="text-gray-600">The service request you're looking for doesn't exist or has been removed.</p>
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
          className="mb-6 text-gray-600 hover:text-blue-600 hover:bg-blue-50 -ml-2 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>
        {/* Request Header */}
  <div className="relative rounded-xl overflow-hidden mb-8 bg-white shadow-md">
          <div className="h-64 bg-gray-200">
            {request.image ? (
              <img 
                src={request.image.startsWith('http') ? request.image : `${API_URL.replace('/api', '')}${request.image}`}
                alt={request.title} 
                className="w-full h-full object-cover"
                onError={(e) => (e.target as HTMLImageElement).src = '/placeholder.svg'}
              />
            ) : (
              <img 
                src="/placeholder.svg"
                alt="Placeholder Image"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
            {request?.status && (
              <span className={`font-semibold ${getStatusColor(request.status)}`}>
                {request.status.replace('-', ' ').toUpperCase()}
              </span>
            )}
          </div>

          <div className="p-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{request.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {request.category}
                  </span>
                  <div className="mx-3 w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {request.location}
                  </div>
                </div>
              </div>
              
              {role === 'seeker' ? (
                <div className="flex space-x-2">
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => window.open(`https://wa.me/${request.contactPhone.replace(/\D/g, '')}`, '_blank')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => window.open(`tel:${request.contactPhone}`, '_blank')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              ) : (
                // Provider view: if original requester, show offers received, otherwise send form
                isOwner ? (
                  <div className="w-full max-w-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Offers Received</h2>
                    {offers.length > 0 ? (
                      <div className="space-y-4">
                        {offers.map(o => (
                          <div key={o._id} className="p-4 bg-white rounded-lg shadow border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">From: {o.provider ? `${o.provider.firstName} ${o.provider.lastName}` : 'Provider'}</p>
                                {o.message && <p className="text-gray-700 mt-1 whitespace-pre-line text-sm">{o.message}</p>}
                                {typeof o.proposedPrice === 'number' && <p className="mt-2 text-blue-700 text-sm font-semibold">Proposed Price: ₹{o.proposedPrice.toLocaleString()}</p>}
                                <p className="mt-2 text-xs text-gray-500">Status: <span className="capitalize font-medium">{o.status}</span></p>
                              </div>
                              <div className="flex flex-col gap-2">
                                {o.status === 'sent' && (
                                  <>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleOfferStatus(o._id, 'accepted')}>Accept</Button>
                                    <Button size="sm" variant="outline" onClick={() => handleOfferStatus(o._id, 'declined')}>Decline</Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No offers yet.</p>
                    )}
                    <button type="button" onClick={() => setRole('seeker')} className="mt-3 text-xs text-blue-600 hover:text-blue-700">Switch to seeker mode</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-end gap-2 w-full max-w-md">
                    {myOffer ? (
                      <div className="w-full p-3 bg-blue-50 rounded-lg text-sm text-blue-800 flex justify-between items-center">
                        <span>Your offer status: <strong className="capitalize">{myOffer.status}</strong></span>
                        {myOffer.status === 'sent' && (
                          <Button size="sm" variant="outline" onClick={() => handleOfferStatus(myOffer._id, 'withdrawn')}>Withdraw</Button>
                        )}
                      </div>
                    ) : (
                      <form onSubmit={handleSendOffer} className="w-full bg-white border rounded-lg p-4 shadow-sm">
                        <h3 className="text-sm font-semibold mb-2">Send Offer</h3>
                        <textarea
                          className="w-full border rounded-md p-2 text-sm mb-2"
                          placeholder="Message (optional)"
                          value={offerMessage}
                          onChange={(e) => setOfferMessage(e.target.value)}
                          rows={3}
                        />
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            type="number"
                            min="0"
                            className="flex-1 border rounded-md p-2 text-sm"
                            placeholder="Proposed Price (₹)"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <Button type="submit" size="sm" disabled={sendingOffer} className="bg-blue-600 hover:bg-blue-700">
                            {sendingOffer ? 'Sending...' : 'Send Offer'}
                          </Button>
                          <button type="button" onClick={() => setRole('seeker')} className="text-xs text-blue-600 hover:text-blue-700">Switch to seeker mode</button>
                        </div>
                      </form>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Request Details */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About This Request</h2>
                <p className="text-gray-700 whitespace-pre-line">{request.description}</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-semibold">Budget: ₹{request?.budget?.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Comments Section */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
                {role === 'seeker' && (
                  <form onSubmit={handleCommentSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-3 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Comment
                    </button>
                  </form>
                )}
                {role === 'provider' && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
                    <p className="text-blue-800 text-sm mb-2 font-medium">Commenting is only available in seeker mode.</p>
                    <Button variant="outline" size="sm" onClick={() => setRole('seeker')}>Switch to Seeker Mode</Button>
                  </div>
                )}

                <div className="space-y-4">
                    {request?.comments && request.comments.length > 0 ? (
                        request.comments.map((comment, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                                <p className="text-gray-800">{comment.text}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Comment by {comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : 'Unknown User'} on {new Date(comment.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>

            {role === 'seeker' && offers.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Offers Received</h2>
                <div className="space-y-4">
                  {offers.map(o => (
                    <div key={o._id} className="p-4 bg-white rounded-lg shadow border">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">From: {o.provider ? `${o.provider.firstName} ${o.provider.lastName}` : 'Provider'}</p>
                          {o.message && <p className="text-gray-700 mt-1 whitespace-pre-line text-sm">{o.message}</p>}
                          {typeof o.proposedPrice === 'number' && <p className="mt-2 text-blue-700 text-sm font-semibold">Proposed Price: ₹{o.proposedPrice.toLocaleString()}</p>}
                          <p className="mt-2 text-xs text-gray-500">Status: <span className="capitalize font-medium">{o.status}</span></p>
                        </div>
                        <div className="flex flex-col gap-2">
                          {o.status === 'sent' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleOfferStatus(o._id, 'accepted')}>Accept</Button>
                              <Button size="sm" variant="outline" onClick={() => handleOfferStatus(o._id, 'declined')}>Decline</Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Contact Information */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{request.location}</span>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      {role === 'seeker' ? (
                        <a href={`tel:${request.contactPhone}`} className="text-blue-600 hover:underline">
                          {request.contactPhone}
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
                        <a 
                          href={`mailto:${request.contactEmail}`} 
                          className="text-blue-600 hover:underline break-all"
                        >
                          {request.contactEmail}
                        </a>
                      ) : (
                        <span className="text-gray-400 select-none">Hidden in provider mode</span>
                      )}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Posted by</h3>
                    {request?.requester ? (
                      <p className="mt-1">{request.requester.firstName} {request.requester.lastName}</p>
                    ) : (
                      <p className="mt-1">Unknown User</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Posted on {new Date(request.createdAt).toLocaleDateString()}
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'text-green-600';
    case 'in-progress':
      return 'text-blue-600';
    case 'completed':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};
export default ServiceRequestDetails;
