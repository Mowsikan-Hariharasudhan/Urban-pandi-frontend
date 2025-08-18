import React, { useState } from 'react';
import Navigation from '@/components/Navigation-Service-Page';
import Footer from '@/components/Footer-Service-Section';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { providerOfferingAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, Phone, Mail, Image, Info, IndianRupee } from 'lucide-react';

const CreateProviderOffering: React.FC = () => {
  const { role, setRole } = useServiceRole();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    serviceArea: '',
    pricingType: 'quote',
    basePrice: '',
    contactPhone: '',
    contactEmail: '',
    whatsappNumber: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories = ["Home Services","Professional Services","Education & Training","Events & Entertainment","Health & Wellness","Technology","Others"];
  const serviceAreas = [
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
  const pricingTypes = [
    { value: 'quote', label: 'Get a Quote' },
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'starting-from', label: 'Starting From' },
    { value: 'hourly', label: 'Hourly Rate' }
  ];

  if (role === 'seeker') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-50">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Switch to <span className="text-blue-600">Provider Mode</span></h1>
            <p className="text-lg text-gray-600 mb-8">Creating a service offering is only available in provider mode.</p>
            <Button onClick={() => setRole('provider')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Switch to Provider Mode</Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // No longer restricted to business accounts; customer account already enforced by ProtectedRoute

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    if (name === 'image' && files) {
      setSelectedFile(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([k,v]) => { if (v !== '') data.append(k, v as string); });
      if (selectedFile) data.append('image', selectedFile);
      await providerOfferingAPI.createProviderOffering(data);
      toast({ title: 'Offering Created', description: 'Your service offering is now live.' });
      navigate('/my-provider-offerings');
    } catch (error: any) {
      toast({ title: 'Creation Failed', variant: 'destructive', description: error.response?.data?.message || 'Error creating offering' });
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Create a <span className="text-blue-600">Service Offering</span></h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Publish your services so seekers can contact you directly.</p>
          </div>
          <Card className="max-w-3xl mx-auto">
            <CardHeader><CardTitle className="text-2xl">Offering Information</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-gray-400 mr-2" />
                    <Input name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g., Professional AC Repair" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <Select value={formData.category} onValueChange={v => handleSelectChange('category', v)}>
                      <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                      <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Area *</label>
                    <Select value={formData.serviceArea} onValueChange={v => handleSelectChange('serviceArea', v)}>
                      <SelectTrigger><SelectValue placeholder="Select Area" /></SelectTrigger>
                      <SelectContent>{serviceAreas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-gray-400 mr-2 mt-2" />
                    <Textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} required placeholder="Describe your service, expertise, and what sets you apart." />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Type *</label>
                    <Select value={formData.pricingType} onValueChange={v => handleSelectChange('pricingType', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{pricingTypes.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  {formData.pricingType !== 'quote' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Base Price *</label>
                      <div className="flex items-center">
                        <IndianRupee className="w-5 h-5 text-gray-400 mr-2" />
                        <Input name="basePrice" type="number" value={formData.basePrice} onChange={handleInputChange} required placeholder="Enter amount" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-t pt-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <div className="flex items-center"><Phone className="w-5 h-5 text-gray-400 mr-2" /><Input name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} required placeholder="+91 98765 43210" /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <div className="flex items-center"><Mail className="w-5 h-5 text-gray-400 mr-2" /><Input name="contactEmail" type="email" value={formData.contactEmail} onChange={handleInputChange} required placeholder="you@example.com" /></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                  <Input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} placeholder="Optional WhatsApp number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <div className="flex items-center">
                    <Image className="w-5 h-5 text-gray-400 mr-2" />
                    <Input name="image" type="file" onChange={handleInputChange} accept="image/*" />
                  </div>
                  {selectedFile && <p className="text-xs text-gray-500 mt-1">Selected: {selectedFile.name}</p>}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">{isLoading ? 'Creating...' : 'Publish Offering'}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CreateProviderOffering;
