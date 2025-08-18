import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation-Service-Page';
import Footer from '@/components/Footer-Service-Section';
import ServiceRequestCard from '@/components/ServiceRequestCard';
import ServiceRequestModal from '@/components/ServiceRequestModal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';
import InfoBanner from '@/components/InfoBanner';
import { serviceRequestAPI, API_URL } from '@/services/api';
import ServiceRoleToggle from '@/components/ServiceRoleToggle';
import { useServiceRole } from '@/contexts/ServiceRoleContext';

const ServiceRequests = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role, setRole } = useServiceRole();

  const categories = [
    "All Categories",
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
    fetchRequests();
  }, [selectedCategory, selectedLocation]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const filters = {};
      if (selectedCategory && selectedCategory !== 'All Categories') {
        (filters as {[key: string]: string}).category = selectedCategory;
      }
      if (selectedLocation && selectedLocation !== 'All Locations') {
        (filters as {[key: string]: string}).location = selectedLocation;
      }
      const response = await serviceRequestAPI.getAllServiceRequests(filters);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRequests = requests.filter(request => {
    const searchMatch = !searchQuery || 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Service <span className="text-blue-600">Requests</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find and respond to service requests in your area
            </p>
           

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for service requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 border-blue-200 focus:border-blue-500 hover:border-blue-500"
                />
              </div>
            </div>
          </div>

          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter by:</span>
            </div>
            
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={selectedLocation} 
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={() => {
                setSelectedCategory('');
                setSelectedLocation('');
                setSearchQuery('');
              }}
              variant="outline"
            >
              Clear All
            </Button>
          </div>
          
        </div>
      </section>


      <section className="py-16">
        <div className="container mx-auto px-4">
          
           
            <>
            {role === 'seeker' && (
              <InfoBanner
                tone="blue"
                title="How to use this page"
                description={<span>1. Browse recent requests below. 2. Click a card to view details & contact options (in seeker mode). 3. Need something else? Post your own request.</span>}
                action={<Button onClick={() => navigate('/create-service-request')} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">Post a Request</Button>}
                className="mb-10"
              />
            )}
              {/* Results Header */}
              <div className="mb-6">
                <div className="px-2 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                  <p className="text-gray-500 text-base">
                    Showing <span className="font-semibold text-blue-600">{filteredRequests.length}</span> of <span className="font-semibold text-gray-800">{requests.length}</span> requests
                  </p>
                </div>
              </div>


              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRequests.map((request) => (
                  <div key={request._id} onClick={() => { setSelectedRequest(request); setIsModalOpen(true); }}>
                    <ServiceRequestCard request={request} />
                  </div>
                ))}
              </div>

              {selectedRequest && (
                <ServiceRequestModal
                  request={selectedRequest}
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              )}

              {filteredRequests.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-2xl text-gray-500 mb-4">No service requests found matching your criteria.</p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedLocation('');
                      setSearchQuery('');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </>
          
        </div>
      </section>

      {/* Floating New Service Request Button */}
      {role === 'seeker' && (
        <button
          onClick={() => navigate('/create-service-request')}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-3 md:py-4 md:px-6 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-200"
          title="Create New Service Request"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="hidden md:inline">Post a Service Need</span>
        </button>
      )}
      <Footer />
    </div>
  );
};

export default ServiceRequests;