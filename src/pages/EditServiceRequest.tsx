import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation-Service-Page';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import Footer from '@/components/Footer-Service-Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { serviceRequestAPI, API_URL } from '@/services/api';
import { Building, MapPin, Phone, Mail, Image, Info } from 'lucide-react';

const EditServiceRequest = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { role, setRole } = useServiceRole();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    contactPhone: '',
    contactEmail: '',
    image: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories = [
    "Home Services",
    "Professional Services",
    "Education & Training",
    "Events & Entertainment",
    "Health & Wellness",
    "Technology",
    "Others"
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
    if (requestId) {
      fetchRequestDetails();
    }
  }, [requestId]);

  const fetchRequestDetails = async () => {
    try {
      setIsLoading(true);
      const response = await serviceRequestAPI.getServiceRequestById(requestId);
      const request = response.data;
      setFormData({
        title: request.title,
        description: request.description,
        category: request.category,
        location: request.location,
        budget: request.budget,
        contactPhone: request.contactPhone,
        contactEmail: request.contactEmail,
        image: request.image || ''
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch request details',
        variant: 'destructive'
      });
      navigate('/my-service-requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    if (name === 'image' && files) {
      setSelectedFile(files[0]);
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
      setIsLoading(true);
      const dataToSend = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key) && key !== 'image') {
          dataToSend.append(key, formData[key as keyof typeof formData]);
        }
      }
      if (selectedFile) {
        dataToSend.append('image', selectedFile);
      }
      await serviceRequestAPI.updateServiceRequest(requestId, dataToSend);
      toast({
        title: 'Request Updated',
        description: 'Your service request has been updated!',
      });
      navigate('/my-service-requests');
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description: error.response?.data?.message || 'An error occurred while updating your request',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (role === 'provider') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-50">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Switch to <span className="text-blue-600">Seeker Mode</span></h1>
            <p className="text-lg text-gray-600 mb-8">Editing a service request is only available in seeker mode. You're currently viewing the site as a service provider.</p>
            <Button onClick={() => setRole('seeker')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Switch to Seeker Mode</Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Edit <span className="text-blue-600">Service Request</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Update your service request details below.
            </p>
          </div>
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Edit Request Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Request Title *
                  </label>
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your request title"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
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
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => handleSelectChange('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location" />
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
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-gray-400 mr-2 mt-2" />
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your service needs in detail..."
                      rows={4}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (₹) *
                  </label>
                  <Input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Enter your budget"
                    required
                  />
                </div>
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-2" />
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <div className="flex items-center">
                    <Image className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleInputChange}
                      accept="image/*"
                    />
                  </div>
                  {selectedFile && (
                    <p className="text-xs text-gray-500 mt-1">Selected file: {selectedFile.name}</p>
                  )}
                
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EditServiceRequest;
