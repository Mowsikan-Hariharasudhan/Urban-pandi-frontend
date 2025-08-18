import React from 'react';
import { ArrowRightCircle, MessageSquare, CheckCircle2, Rocket, Users, Handshake as HandshakeIcon } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const stepsSeeker = [
    { icon: <Rocket className="w-6 h-6 text-blue-600" />, title: 'Post Your Need', text: 'Describe what service you need (include details + optional image).'},
    { icon: <MessageSquare className="w-6 h-6 text-blue-600" />, title: 'Receive Offers', text: 'Providers send you offers with price & message.'},
    { icon: <HandshakeIcon className="w-6 h-6 text-blue-600" />, title: 'Compare & Choose', text: 'Review offers, accept the one that fits.'},
    { icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />, title: 'Complete & Close', text: 'Mark request completed (ratings coming soon).'},
  ];
  const stepsProvider = [
    { icon: <Users className="w-6 h-6 text-orange-600" />, title: 'Browse Needs', text: 'View real service requests around you.'},
    { icon: <MessageSquare className="w-6 h-6 text-orange-600" />, title: 'Send Offer', text: 'Quote price + short message to stand out.'},
    { icon: <HandshakeIcon className="w-6 h-6 text-orange-600" />, title: 'Win the Job', text: 'Get accepted and connect with the seeker.'},
    { icon: <CheckCircle2 className="w-6 h-6 text-orange-600" />, title: 'Build Reputation', text: 'Successful jobs boost trust (reviews soon).'},
  ];
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How <span className="text-blue-600">It Works</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Two simple paths. Choose the one that fits you today. Switch anytime.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full opacity-40" />
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">I Need a Service</h3>
            <div className="space-y-5">
              {stepsSeeker.map((s,i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-105 transition">{s.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">{i+1}. {s.title} <ArrowRightCircle className="w-4 h-4 text-blue-400" /></p>
                    <p className="text-gray-600 text-sm mt-1">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-100 rounded-full opacity-40" />
            <h3 className="text-2xl font-semibold text-orange-600 mb-6">I Provide Services</h3>
            <div className="space-y-5">
              {stepsProvider.map((s,i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:scale-105 transition">{s.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">{i+1}. {s.title} <ArrowRightCircle className="w-4 h-4 text-orange-400" /></p>
                    <p className="text-gray-600 text-sm mt-1">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
