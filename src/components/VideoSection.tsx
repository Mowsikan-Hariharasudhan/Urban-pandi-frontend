
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ExternalLink } from 'lucide-react';

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "Madurai 4k drone view | Athens of the East | Explore Madurai",
      embedUrl: "https://www.youtube.com/embed/eehISH4VfTQ?si=Cw3nZzqGicySJ-j5",
      channel: "Explore the world"
    },
    {
      id: 2,
      title: "Exploring Madurai - The Ancient City of Temples and Culture",
      embedUrl: "https://www.youtube.com/embed/z0QR_cPCWcc?si=s9fa0cKrJMJJHKHH",
      channel: "cinematic travel film"
    },
    {
      id: 3,
      title: "TAMIL NADU: Are we really living in the first globalized world?",
      embedUrl: "https://www.youtube.com/embed/9v45KHkfCq0?si=T25dOcxKICi90nIS",
      channel: "YouTube"
    },
    {
      id: 4,
      title: "Madurai - 2 days Plan | Tourist Place, Meenakshi Temple, Food, Saree & Jewelry Shopping",
      embedUrl: "https://www.youtube.com/embed/3Z0QkeSSjsM?si=Wd25QUQOXG8ChXdu",
      channel: "Tamil Nadu"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore <span className="text-orange-600">Madurai</span>
          </h2>
          <p className="text-xl text-gray-600">
            Watch popular videos showcasing the beauty and culture of Madurai
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card 
              key={video.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden bg-white"
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {video.title}
                </h3>
                
                <div className="space-y-1 text-xs text-gray-600">
                  <p className="font-medium">{video.channel}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Want to see more videos about Madurai? 
            <a 
              href="https://www.youtube.com/@UrbanPandi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-600 font-medium cursor-pointer hover:underline ml-1"
            >
              Visit our YouTube channel
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
