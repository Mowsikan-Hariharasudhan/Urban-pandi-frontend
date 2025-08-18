import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation-Service-Page';
import Footer from '@/components/Footer-Service-Section';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { providerOfferingAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BASE_URL } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { Pause, Play, Trash2, Edit } from 'lucide-react';

const MyProviderOfferings: React.FC = () => {
  const { role, setRole } = useServiceRole();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [offerings, setOfferings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (role === 'provider' && user?.userType === 'customer') load(); }, [role]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await providerOfferingAPI.getMyProviderOfferings();
      setOfferings(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const toggleStatus = async (id: string, current: string) => {
    const next = current === 'active' ? 'paused' : 'active';
    await providerOfferingAPI.updateOfferingStatus(id, next);
    setOfferings(prev => prev.map(o => o._id === id ? { ...o, status: next } : o));
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this offering?')) return;
    await providerOfferingAPI.deleteProviderOffering(id);
    setOfferings(prev => prev.filter(o => o._id !== id));
  };

  if (role === 'seeker') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-50">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Switch to <span className="text-blue-600">Provider Mode</span></h1>
            <p className="text-lg text-gray-600 mb-8">Manage offerings only in provider mode.</p>
            <Button onClick={() => setRole('provider')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Switch to Provider Mode</Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // ProtectedRoute now restricts to customer accounts; no additional check needed

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">My Service Offerings</h1>
              <p className="text-gray-600">Manage, pause, edit, or remove your published services.</p>
            </div>
            <Button onClick={() => navigate('/create-provider-offering')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">New Offering</Button>
          </div>
          {loading ? (
            <div className="text-center py-16"><p className="text-xl text-gray-600">Loading...</p></div>
          ) : offerings.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-blue-200 rounded-lg">
              <p className="text-xl text-gray-600 mb-6">You haven't created any offerings yet.</p>
              <Button onClick={() => navigate('/create-provider-offering')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Create Your First Offering</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map(o => (
                <Card key={o._id} className="overflow-hidden border border-blue-200">
                  <img src={o.image?.startsWith('http') ? o.image : `${BASE_URL}${o.image}`} alt={o.title} className="w-full h-40 object-cover" />
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{o.title}</h3>
                      <Badge className={o.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>{o.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{o.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{o.category}</span>
                      <span>{o.serviceArea}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => navigate(`/edit-provider-offering/${o._id}`)} className="flex-1"><Edit className="w-4 h-4 mr-1" />Edit</Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => toggleStatus(o._id, o.status)} className="flex-1">
                        {o.status === 'active' ? <><Pause className="w-4 h-4 mr-1" />Pause</> : <><Play className="w-4 h-4 mr-1" />Activate</>}
                      </Button>
                      <Button type="button" variant="destructive" size="sm" onClick={() => remove(o._id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MyProviderOfferings;
