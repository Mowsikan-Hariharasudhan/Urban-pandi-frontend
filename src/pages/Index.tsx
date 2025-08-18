
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AdvertisementSection from '@/components/AdvertisementSection';
import BusinessSection from '@/components/BusinessSection';
import VideoSection from '@/components/VideoSection';
import Footer from '@/components/Footer';
import ServiceRequestSection from '@/components/ServiceRequestSection';
import HowItWorks from '@/components/HowItWorks';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AdvertisementSection />
      <BusinessSection />
  <ServiceRequestSection />
  <HowItWorks />
      <VideoSection />
      <Footer />
    </div>
  );
};

export default Index;
