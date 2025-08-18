import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation-Service-Page';
import Footer from '@/components/Footer-Service-Section';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import { providerOfferingAPI } from '@/services/api';
import ProviderOfferingCard from '@/components/ProviderOfferingCard';
import ProviderOfferingModal from '@/components/ProviderOfferingModal';
import ServiceRoleToggle from '@/components/ServiceRoleToggle';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';
import InfoBanner from '@/components/InfoBanner';
import { useNavigate } from 'react-router-dom';

const ProviderOfferings: React.FC = () => {
  const { role, setRole } = useServiceRole();
  const navigate = useNavigate();
  const [offerings, setOfferings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffering, setSelectedOffering] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedServiceArea, setSelectedServiceArea] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ["All Categories","Home Services","Professional Services","Education & Training","Events & Entertainment","Health & Wellness","Technology","Others"];  
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
    "Yagappa Nagar"];  

  useEffect(() => {
    fetchOfferings();
  }, [selectedCategory, selectedServiceArea]);

  const fetchOfferings = async () => {
    setIsLoading(true);
    try {
      const filters: any = {};
      if (selectedCategory && selectedCategory !== 'All Categories') filters.category = selectedCategory;
      if (selectedServiceArea && selectedServiceArea !== 'All Locations') filters.serviceArea = selectedServiceArea;
      const res = await providerOfferingAPI.getAllProviderOfferings(filters);
      setOfferings(res.data);
    } catch (e) {
      console.error('Error fetching offerings', e);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = offerings.filter(o => {
    const s = searchQuery.toLowerCase();
    return !s || o.title.toLowerCase().includes(s) || o.description.toLowerCase().includes(s) || o.category.toLowerCase().includes(s);
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Service <span className="text-blue-600">Providers</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">Browse active service offerings from local providers</p>
           
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search service offerings..." className="pl-10 pr-4 py-3 text-lg border-2 border-blue-200 focus:border-blue-500 hover:border-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter by:</span>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64"><SelectValue placeholder="All Categories" /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedServiceArea} onValueChange={setSelectedServiceArea}>
              <SelectTrigger className="w-64"><SelectValue placeholder="All Locations" /></SelectTrigger>
              <SelectContent>
                {serviceAreas.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {setSelectedCategory('');setSelectedServiceArea('');setSearchQuery('');}}>Clear All</Button>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16"><p className="text-xl text-gray-600">Loading offerings...</p></div>
          ) : (
            <>
              <div className="mb-6 px-2 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                <p className="text-gray-500 text-base">Showing <span className="font-semibold text-blue-600">{filtered.length}</span> of <span className="font-semibold text-gray-800">{offerings.length}</span> offerings</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(offering => (
                  <div key={offering._id} className="w-full" onClick={() => {setSelectedOffering(offering);setIsModalOpen(true);}}>
                    <ProviderOfferingCard offering={offering} />
                  </div>
                ))}
              </div>
              {selectedOffering && (
                <ProviderOfferingModal offering={selectedOffering} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
              )}
              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-2xl text-gray-500 mb-4">No offerings match your criteria.</p>
                  <Button onClick={() => {setSelectedCategory('');setSelectedServiceArea('');setSearchQuery('');}} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Clear All Filters</Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {role === 'provider' && (
        <button
          onClick={() => navigate('/create-provider-offering')}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-3 md:py-4 md:px-6 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-200"
          title="Create New Service Offering"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="hidden md:inline">Add Service Offering</span>
        </button>
      )}
      <Footer />
    </div>
  );
};

export default ProviderOfferings;
