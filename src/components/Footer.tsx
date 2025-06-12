
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Madurai Directory</h3>
                <p className="text-sm text-gray-400">Discover Local Businesses</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your complete guide to finding the best local businesses and services in Madurai. 
              Connecting customers with quality service providers.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#businesses" className="text-gray-400 hover:text-white transition-colors">Browse Businesses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Add Your Business</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Restaurants</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Auto Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Healthcare</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Education</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shopping</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Madurai, Tamil Nadu</p>
                  <p className="text-sm text-gray-400">India - 625001</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-500 mr-3" />
                <p className="text-sm text-gray-400">+91 98765 43210</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-500 mr-3" />
                <p className="text-sm text-gray-400">info@maduraidirectory.com</p>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-2">Business Hours</h5>
              <p className="text-sm text-gray-400">Monday - Saturday: 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-gray-400">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Madurai Directory. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
