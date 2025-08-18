
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-gray-900 text-white py-20 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 bg-orange-500 rounded-full blur-3xl -top-48 -right-48"></div>
        <div className="absolute w-80 h-80 bg-red-500 rounded-full blur-3xl -bottom-40 -left-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Enhanced Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-xl">
                <MapPin className="w-8 h-8 text-white drop-shadow-sm" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Urban Pandi</h3>
                <p className="text-sm text-orange-400 font-medium">Discover Local Businesses</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your complete guide to finding the best local businesses and services in Madurai. 
              Connecting customers with quality service providers across the cultural heart of Tamil Nadu.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">Home</a></li>
              <li><a href="/businesses" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">Browse Businesses</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">Contact</a></li>
            </ul>
          </div>

          {/* Enhanced Categories */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/businesses?category=Restaurants+%26+Food" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">Restaurants</Link></li>
              <li><Link to="/businesses?category=Auto+%26+Transport" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">Auto Services</Link></li>
              <li><Link to="/businesses?category=Healthcare+%26+Medical" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">Healthcare</Link></li>
              <li><Link to="/businesses?category=Education+%26+Training" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">Education</Link></li>
              <li><Link to="/businesses?category=Shopping+%26+Retail" className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">Shopping</Link></li>
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-500/30 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Madurai, Tamil Nadu</p>
                  <p className="text-gray-400 text-sm">India - 625001</p>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-500/30 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium">+91 8248256275</p>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-500/30 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium">urbanpandi@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer Bottom */}
        <div className="relative mt-16 pt-8">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © 2024 Urban Pandi. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse animation-delay-500"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-2000"></div>
              </div>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
