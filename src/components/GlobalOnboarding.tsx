import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import { X, Sparkles, Handshake, HelpCircle } from 'lucide-react';

const LS_KEY = 'urbanpandi_onboarded_v1';

const GlobalOnboarding: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setRole } = useServiceRole();

  useEffect(() => {
    if (!localStorage.getItem(LS_KEY)) {
      const t = setTimeout(() => setOpen(true), 300);
      return () => clearTimeout(t);
    }
  }, []);

  const complete = () => {
    localStorage.setItem(LS_KEY, '1');
    setOpen(false);
  };

  const goSeeker = () => {
    setRole('seeker');
    complete();
    navigate('/service-requests');
  };
  const goProvider = () => {
    setRole('provider');
    complete();
    navigate('/provider-offerings');
  };

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-white border border-gray-200 shadow-lg px-4 py-2 rounded-full text-sm text-gray-700 hover:shadow-xl transition"
      aria-label="Open help / onboarding"
    >
      <HelpCircle className="w-4 h-4 text-blue-600" /> Help
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={complete} />
      <div className="relative w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100" onClick={complete} aria-label="Close onboarding">
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Welcome to <span className="text-orange-600">Urban Pandi</span></h2>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">We connect people who need services with trusted local providers in Madurai. Pick how you want to start. You can switch anytime with the mode toggle.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border rounded-xl p-5 hover:shadow-md transition group">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">1</span>
                <h3 className="font-semibold text-gray-800">I Need a Service</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
                <li>Browse existing requests</li>
                <li>Post what you need</li>
                <li>Get & compare offers</li>
              </ul>
              <button onClick={goSeeker} className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 text-sm">Start as Seeker</button>
            </div>
            <div className="border rounded-xl p-5 hover:shadow-md transition group">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">2</span>
                <h3 className="font-semibold text-gray-800">I Provide Services</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
                <li>Showcase your offerings</li>
                <li>Send offers to seekers</li>
                <li>Build reputation (soon)</li>
              </ul>
              <button onClick={goProvider} className="w-full py-2.5 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 text-sm">Start as Provider</button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <Handshake className="w-4 h-4" />
            <span>Tip: Use the mode toggle in the header to switch anytime.</span>
            <span>Need this later? Click Help floating button bottom-left.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalOnboarding;
