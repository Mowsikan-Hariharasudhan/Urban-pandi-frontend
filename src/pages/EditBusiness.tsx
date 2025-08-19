import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { businessAPI } from '@/services/api';
import { useAuth } from '../contexts/AuthContext';
import { Building, MapPin, Phone, Mail, Image, Info, Save } from 'lucide-react';

const EditBusiness = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    image: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // New state for selected file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // New state for image preview

  const categories = [
    "Restaurants & Food",
    "Auto & Transport",
    "Education & Training",
    "Healthcare & Medical",
    "Shopping & Retail",
    "Beauty & Wellness",
    "Electronics & Technology",
    "Home & Garden"
  ];

  const locations = [
    "Alagar Kovil Road",
    "Angel Nagar",
    "Anna Nagar",
    "Anuppanadi",
    "Arajar Salai",
    "Arappalayam",
    "Avaniyapuram",
    "Bama Nagar",
    "Bethaniapuram",
    "Chandragandhi Nagar",
    "Chinna Chokkikulam",
    "Cs Nagar",
    "Doak Nagar",
    "Durai Samy Nagar",
    "Ellis Nagar",
    "Fenner Colony",
    "Gandhi Nagar",
    "Gayathri Nagar",
    "Gnanavolivupuram",
    "Gomathipuram",
    "Goripalayam",
    "Harvey Nagar",
    "Iravathanallur",
    "Iyer Bungalow",
    "Jaihindpuram",
    "K.K. Nagar",
    "K.Pudur",
    "Kamarajar Salai",
    "Kanpalayam",
    "Karpaga Nagar",
    "Kattaboman Nagar",
    "Kochadai",
    "Kodikulam",
    "Koodal Nagar",
    "Krishnapuram Colony",
    "Kudiraicharikulam",
    "Kurinji Nagar",
    "Lion City",
    "Lourdhu Nagar",
    "Madurai Main",
    "Mahapupalayam",
    "Managiri",
    "Meenakshi Amman Nagar",
    "Meenakshi Nagar",
    "Moondrumavadi",
    "Munichallai",
    "Muthia Nagar",
    "Muthu Patti",
    "Muthuramalingapuram",
    "Nagu Nagar",
    "Navalar Nagar",
    "Near Madurai Bus Stand",
    "Near Madurai Train Station",
    "Near Meenakshi Amman Temple",
    "Nehru Nagar",
    "New Ellis Nagar",
    "North Veli Street",
    "Otthakadai",
    "Palangantham",
    "Paravai",
    "Pasumalai",
    "Periyar",
    "Pethaniapuram 2",
    "Ponmeni",
    "Ponnagaram",
    "Poriyalar Nagar",
    "Race Course Colony",
    "Rajamanickamnadar Nagar",
    "Ramalakshmi Nagar",
    "Ramaond Reserve Line",
    "Ramnad Reserve Line",
    "Reserve Police Line",
    "Sambakulam",
    "Sammatipuram",
    "Sathamangalam",
    "Sellur",
    "Shenoy Nagar",
    "Shri Vel Murugan Nagar",
    "Sikkandar Savadi",
    "Simmakkal",
    "Sivagami Nagar",
    "Southern Railway Colony",
    "Sridevi Nagar",
    "Swami Vivekananda Nagar",
    "T M Nagar",
    "Tallakulam",
    "Tangamanal Nagar",
    "Thai Nagar",
    "Thasildar Nagar",
    "Thideer Nagar",
    "Thirunagar",
    "Thiruparakundram",
    "Thiruppalai",
    "Thiyagi Balu",
    "Thomas Colony",
    "Tirupparankunram Road",
    "TTC Nagar",
    "Uthangudi",
    "Vaithiyanathapuram",
    "Vandiyur",
    "Venkatachalapathy Nagar",
    "Vilangudi",
    "Viraganoor",
    "Viratripattu",
    "Viswanathapuram",
    "West Perumal Maistry Street",
    "West Ponnagaram",
    "Yagappa Nagar"
  ];

  useEffect(() => {
    if (businessId) {
      fetchBusinessDetails();
    }
  }, [businessId]);

  const fetchBusinessDetails = async () => {
    try {
      setIsLoading(true);
      const response = await businessAPI.getBusinessById(businessId!);
      const business = response.data;
      
      setFormData({
        name: business.name,
        category: business.category,
        description: business.description,
        location: business.location,
        address: business.address,
        phone: business.phone,
        whatsapp: business.whatsapp || '',
        email: business.email,
        image: business.image
      });
      setImagePreview(business.image); // Set initial image preview
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch business details',
        variant: 'destructive'
      });
      navigate('/my-listings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (name === 'image' && files && files.length > 0) {
      setSelectedFile(files[0]);
      setImagePreview(URL.createObjectURL(files[0])); // Create a URL for preview
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const dataToSend = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key) && key !== 'image') { // Exclude image from direct formData
          dataToSend.append(key, formData[key as keyof typeof formData]);
        }
      }

      if (selectedFile) {
        dataToSend.append('image', selectedFile); // Append the new file if selected
      } else if (formData.image) {
        // If no new file is selected but there's an existing image URL, send it
        dataToSend.append('image', formData.image); 
      } else {
        // Optionally, append a default image if no image is provided at all
        dataToSend.append('image', "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop");
      }

      await businessAPI.updateBusiness(businessId!, dataToSend); // Send FormData
      
      toast({
        title: 'Business Updated Successfully',
        description: 'Your business listing has been updated!',
      });
      
      navigate('/my-listings');
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description: error.response?.data?.message || 'An error occurred while updating your business',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Business <span className="text-orange-600">Listing</span></CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
<div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Building className="w-5 h-5 mr-2 text-orange-500" />
                  Business Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name*</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter business name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category*</label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description*</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your business"
                    rows={4}
                    required
                  />
                </div>
                
               
            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Business Image
              </label>
              <div className="flex items-center space-x-4">
                <Image className="w-5 h-5 text-gray-400" />
                <Input
                  id="image"
                  name="image"
                  type="file" 
                  onChange={handleInputChange}
                  accept="image/*" 
                />
              </div>
              
              <p className="text-xs text-gray-500 mt-1">
                Upload a new image for your business. If no new file is selected, the existing image will be kept.
              </p>
            </div>

            

          </div>
              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                  Location Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Area/Locality*</label>
                    <Select 
                      value={formData.location} 
                      onValueChange={(value) => handleSelectChange('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Address*</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-orange-500" />
                  Contact Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number*</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">WhatsApp Number</label>
                    <Input
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="Enter WhatsApp number (optional)"
                    />
                    <p className="text-xs text-gray-500">Leave empty to use phone number</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address*</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/my-listings')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditBusiness;

         
