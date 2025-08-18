import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { businessAPI, API_URL } from '@/services/api';
import { useAuth } from '../contexts/AuthContext';
import { Building, MapPin, Phone, Mail, Edit, Trash2, Plus } from 'lucide-react';
import StarRating from '@/components/StarRating';

type Business = {
  _id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  createdAt: string;
};

const MyListings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [businessToDelete, setBusinessToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      setIsLoading(true);
      const response = await businessAPI.getMyBusinesses();
      setBusinesses(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch your business listings',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBusiness = (businessId: string) => {
    navigate(`/edit-business/${businessId}`);
  };

  const confirmDeleteBusiness = (businessId: string) => {
    setBusinessToDelete(businessId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteBusiness = async () => {
    if (!businessToDelete) return;
    
    try {
      setIsDeleting(true);
      await businessAPI.deleteBusiness(businessToDelete);
      
      toast({
        title: 'Business Deleted',
        description: 'Your business listing has been deleted successfully',
      });
      
      // Remove the deleted business from the state
      setBusinesses(businesses.filter(business => business._id !== businessToDelete));
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Deletion Failed',
        description: error.response?.data?.message || 'An error occurred while deleting your business',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Business <span className="text-orange-600">Listings</span></h1>
          <Button 
            onClick={() => navigate('/business-listing')}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Business
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : businesses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Building className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Business Listings Yet</h3>
            <p className="text-gray-500 mb-6">You haven't added any businesses to the directory yet.</p>
            <Button 
              onClick={() => navigate('/business-listing')}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              Add Your First Business
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <Card key={business._id} className="overflow-hidden hover:shadow-lg transition-shadow border border-orange-500">
                <div className="relative h-48 bg-gray-200">
                  <img 
                     src={`${API_URL.replace('/api', '')}${business.image}`}
                    alt={business.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2  text-white bg-orange-500  rounded-full px-3 py-1 text-sm font-medium   px-3 py-1 text-sm font-medium">
                    {business.category}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{business.name}</CardTitle>
                    <StarRating rating={Number(business.rating)} size="sm" />
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {business.location}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <p className="text-gray-600 line-clamp-2">{business.description}</p>
                  
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{business.email}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditBusiness(business._id)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => confirmDeleteBusiness(business._id)}
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
              Are you sure you want to delete this business listing? This action cannot be undone.
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
              onClick={handleDeleteBusiness}
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

export default MyListings;