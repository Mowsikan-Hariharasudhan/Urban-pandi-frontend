
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const AdvertisementSection = () => {
  const ads = [
    {
      id: 1,
      title: "Cloud Solution",
      business: "Clofy Technologies",
      image: "\Screenshot 2025-06-13 210056.png",
      offer: "30% OFF",
      description: "Streamline with optimized Microsoft Teams configurations",
      sponsored: true
    },
    {
      id: 2,
      title: "Cloud Migration Service",
      business: "Clofy Technologies",
      image: "\Screenshot 2025-06-13 210056.png",
      offer: "25% OFF",

      description: "Streamline with optimized Microsoft Teams configurations",
      sponsored: true
    },
    {
      id: 3,
      title: "SAAS End-to-End Solution",
      business: "Clofy Technologies",
      image: "\Screenshot 2025-06-13 210056.png",
      offer: "40% OFF",
      description: "Streamline with optimized Microsoft Teams configurations",
      sponsored: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured <span className="text-orange-600">Promotions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Discover amazing deals from local businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ads.map((ad) => (
            <Card key={ad.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden bg-white cursor-pointer">
              <div className="relative">
                <img 
                  src={ad.image} 
                  alt={ad.business}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  {ad.sponsored && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Sponsored
                    </Badge>
                  )}
                </div>
                 <div className="absolute top-3 right-3">
                  <Badge className="bg-red-500 hover:bg-red-600 text-white text-lg font-bold">
                    {ad.offer}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {ad.title}
                </h3>
                <p className="text-orange-600 font-medium mb-2">{ad.business}</p>
                <p className="text-gray-600 text-sm">
                  {ad.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
        <p className="text-center text-gray-600 mt-8 text-lg">
          Want to advertise your business? <a href="https://wa.me/9363139464" target="_blank" rel="noopener noreferrer" className="text-orange-600 font-medium cursor-pointer hover:underline">Contact us</a>
        </p>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
