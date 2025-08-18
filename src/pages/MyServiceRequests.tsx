import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation-Service-Page';
import Footer from '@/components/Footer-Service-Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { serviceRequestAPI, API_URL } from '@/services/api';
import { useAuth } from '../contexts/AuthContext';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import { Building, MapPin, Phone, Mail, Edit, Trash2, Plus } from 'lucide-react';

const MyServiceRequests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role, setRole } = useServiceRole();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      setIsLoading(true);
      const response = await serviceRequestAPI.getMyServiceRequests();
      setRequests(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch your service requests',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteRequest = (requestId: string) => {
    setRequestToDelete(requestId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteRequest = async () => {
    if (!requestToDelete) return;
    
    try {
      setIsDeleting(true);
      await serviceRequestAPI.deleteServiceRequest(requestToDelete);
      
      toast({
        title: 'Request Deleted',
        description: 'Your service request has been deleted successfully',
      });
      
      setRequests(requests.filter(request => request._id !== requestToDelete));
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Deletion Failed',
        description: error.response?.data?.message || 'An error occurred while deleting your request',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    try {
      await serviceRequestAPI.updateRequestStatus(requestId, newStatus);
      fetchMyRequests(); // Refresh the list
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description: error.response?.data?.message || 'Failed to update request status',
        variant: 'destructive'
      });
    }
  };

  if (role === 'provider') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-24 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Switch to <span className="text-blue-600">Seeker Mode</span></h1>
          <p className="text-lg text-gray-600 mb-8">Your posted service requests are only visible when you're in seeker mode. You're currently browsing as a provider.</p>
          <Button onClick={() => setRole('seeker')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Switch to Seeker Mode</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Service<span className="text-blue-600"> Requests</span></h1>
          <Button 
            onClick={() => navigate('/create-service-request')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post New Request
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Building className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Service Requests Yet</h3>
            <p className="text-gray-500 mb-6">You haven't posted any service requests yet.</p>
            <Button 
              onClick={() => navigate('/create-service-request')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Post Your First Request
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <Card key={request._id} className="overflow-hidden hover:shadow-lg transition-shadow border border-blue-500">
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={request.image.startsWith('http') ? request.image : `${API_URL.replace('/api', '')}${request.image}`}
                    alt={request.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                    {request.category}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{request.title}</CardTitle>
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusUpdate(request._id, e.target.value)}
                      className="bg-white border rounded px-2 py-1 text-sm"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {request.location}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <p className="text-gray-600 line-clamp-2">{request.description}</p>
                  
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{request.contactPhone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{request.contactEmail}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/service-requests/${request._id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={() => navigate(`/edit-service-request/${request._id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => confirmDeleteRequest(request._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteRequest}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyServiceRequests;