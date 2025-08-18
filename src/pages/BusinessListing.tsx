import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { businessAPI, API_URL } from '@/services/api';
import { useAuth } from '../contexts/AuthContext';
import { Building, MapPin, Phone, Mail, Image, Info } from 'lucide-react';


const BusinessListing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
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
    // Comprehensive Madurai localities list (duplicates removed, original 8 retained)
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
    "Yagappa Nagar",
    // Former initial list extras (ensuring coverage)
    "Samayanallur",
    "Teppakulam"
  ];

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
      } else if (formData.image) {
        // If no new file is selected but there's an existing image URL, send it
        dataToSend.append('image', formData.image);
      } else {
        // Use a placeholder image if no image is provided at all
        dataToSend.append('image', "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop");
      }
      
      await businessAPI.createBusiness(dataToSend); // Send FormData
      
      toast({
        title: 'Business Listed Successfully',
        description: 'Your business has been added to our directory!',
      });
      
      navigate('/businesses');
    } catch (error: any) {
      toast({
        title: 'Submission Failed',
        description: error.response?.data?.message || 'An error occurred while listing your business',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              List Your <span className="text-orange-600">Business</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our directory and reach more customers in Madurai. Fill out the form below to get started.
            </p>
          </div>
          
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                      required
                    />
                  </div>
                </div>
                
                {/* Category and Location */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Category *
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
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description *
                  </label>
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-gray-400 mr-2 mt-2" />
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your business, services, and what makes you unique..."
                      rows={4}
                      required
                    />
                  </div>
                </div>
                
                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete business address"
                      required
                    />
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number
                    </label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="919876543210 (without +)"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Email *
                  </label>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.business@example.com"
                      required
                    />
                  </div>
                </div>
                
                {/* Image Upload */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Image
                  </label>
                  <div className="flex items-center">
                    <Image className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      id="image"
                      name="image"
                      type="file" // Changed to file input
                      onChange={handleInputChange}
                      accept="image/*" // Accept only image files
                    />
                  </div>
                  {selectedFile && (
                    <p className="text-xs text-gray-500 mt-1">Selected file: {selectedFile.name}</p>
                  )}
                  {!selectedFile && formData.image && (
                    <p className="text-xs text-gray-500 mt-1">Current image URL: {formData.image}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image of your business. If no file is selected, a default image will be used.
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'List My Business'}
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

export default BusinessListing;