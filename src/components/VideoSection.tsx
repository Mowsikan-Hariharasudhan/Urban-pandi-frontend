
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ExternalLink } from 'lucide-react';

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "Meenakshi Temple - Wonder of Madurai",
      thumbnail: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop",
      duration: "5:32",
      views: "2.3M",
      channel: "Tamil Heritage"
    },
    {
      id: 2,
      title: "Street Food Tour of Madurai",
      thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      duration: "8:15",
      views: "1.8M",
      channel: "Food Explorer"
    },
    {
      id: 3,
      title: "Madurai - The Cultural Capital",
      thumbnail: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=400&h=300&fit=crop",
      duration: "6:45",
      views: "950K",
      channel: "Travel Tamil Nadu"
    },
    {
      id: 4,
      title: "Traditional Silk Weaving in Madurai",
      thumbnail: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=300&fit=crop",
      duration: "4:28",
      views: "567K",
      channel: "Artisan Stories"
    }
  ];

  const handleVideoClick = (videoId: number) => {
    console.log(`Playing video ${videoId}`);
    // TODO: Implement video player or redirect to YouTube
  };

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
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden bg-white cursor-pointer"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-orange-600 fill-current" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>

                {/* External Link Icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {video.title}
                </h3>
                
                <div className="space-y-1 text-xs text-gray-600">
                  <p className="font-medium">{video.channel}</p>
                  <p>{video.views} views</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Want to see more videos about Madurai? 
            <span className="text-orange-600 font-medium cursor-pointer hover:underline ml-1">
              Visit our YouTube channel
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
