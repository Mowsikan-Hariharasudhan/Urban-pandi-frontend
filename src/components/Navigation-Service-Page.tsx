import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, User, Building, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useServiceRole } from '@/contexts/ServiceRoleContext';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { role, toggleRole } = useServiceRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false); // Close mobile menu on logout
  };

  const handleBusinessListingClick = () => {
    if (!isAuthenticated || (user && user.userType !== 'business')) {
      navigate('/login', { state: { from: '/business-listing', message: 'Please login as a business owner to list your business' } });
    } else {
      navigate('/business-listing');
    }
    setMobileMenuOpen(false); // Close mobile menu
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3" onClick={closeMobileMenu}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="hidden xs:block sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">Urban <span className="text-blue-600">Pandi</span></h1>
              <p className="text-xs text-gray-600 hidden sm:block">Discover Local Businesses</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-lg font-bold text-gray-800">Urban <span className="text-blue-600">Pandi</span></h1>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-orange-600' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/businesses" 
              className={`font-medium transition-colors ${
                isActive('/businesses') 
                  ? 'text-orange-600' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Businesses
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-orange-600' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/service-requests" 
              className={`font-medium transition-colors ${
                isActive('/service-requests') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Service Requests
            </Link>
            <Link 
              to="/provider-offerings" 
              className={`font-medium transition-colors ${
                isActive('/provider-offerings') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Providers
            </Link>
          </div>

          {/* Desktop Role Toggle & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Role Toggle */}
            <button
              onClick={toggleRole}
              className="text-xs font-medium px-2 sm:px-3 py-1 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 transition"
              title={role === 'seeker' ? 'Switch to provider mode' : 'Switch to seeker mode'}
            >
              <span className="hidden sm:inline">{role === 'seeker' ? 'Seeker Mode' : 'Provider Mode'}</span>
              <span className="sm:hidden">{role === 'seeker' ? 'Seeker' : 'Provider'}</span>
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <div className="hidden lg:flex items-center space-x-2 text-gray-700 font-medium">
                  <User className="w-4 h-4" />
                  <span>{user?.firstName}</span>
                </div>
                
                {user?.userType === 'customer' && (
                  <>
                    {role === 'seeker' && (
                      <Link to="/my-service-requests">
                        <Button variant="outline" size="sm">
                          <Building className="w-4 h-4 lg:mr-2" />
                          <span className="hidden lg:inline">My Requests</span>
                        </Button>
                      </Link>
                    )}
                    {role === 'provider' && (
                      <Link to="/my-provider-offerings">
                        <Button variant="outline" size="sm">
                          <Building className="w-4 h-4 lg:mr-2" />
                          <span className="hidden lg:inline">My Offerings</span>
                        </Button>
                      </Link> 
                    )}
                  </>
                )}
                
                {user?.userType === 'business' && (
                  <Link to="/my-listings">
                    <Button variant="outline" size="sm">
                      <Building className="w-4 h-4 lg:mr-2" />
                      <span className="hidden lg:inline">My Listings</span>
                    </Button>
                  </Link>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                    <span className="hidden sm:inline">Sign Up</span>
                    <span className="sm:hidden">Join</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle & Role Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Role Toggle */}
            <button
              onClick={toggleRole}
              className={`text-xs font-medium px-2 py-1 rounded-full border transition ${
                role === 'seeker' 
                  ? 'border-blue-200 text-blue-600 bg-blue-50' 
                  : 'border-blue-200 text-blue-600 bg-blue-50'
              }`}
              title={role === 'seeker' ? 'Switch to provider mode' : 'Switch to seeker mode'}
            >
              {role === 'seeker' ? 'Seeker' : 'Provider'}
            </button>

            {/* Mobile auth buttons for non-authenticated users */}
            {!isAuthenticated && (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-xs px-2">Login</Button>
              </Link>
            )}
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2 space-y-1 animate-in slide-in-from-top duration-200">
            {/* Mobile Navigation Links */}
            <Link 
              to="/" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                isActive('/') ? 'text-orange-600 bg-orange-50' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/businesses" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                isActive('/businesses') ? 'text-orange-600 bg-orange-50' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Businesses
            </Link>
            <Link 
              to="/contact" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                isActive('/contact') ? 'text-orange-600 bg-orange-50' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <Link 
              to="/service-requests" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                isActive('/service-requests') ? 'text-blue-600 bg-blue-50' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Service Requests
            </Link>
            <Link 
              to="/provider-offerings" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                isActive('/provider-offerings') ? 'text-blue-600 bg-blue-50' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Providers
            </Link>

            {/* Mobile Auth Section */}
            {isAuthenticated ? (
              <div className="border-t border-gray-100 pt-3">
                <div className="px-4 py-2 flex items-center space-x-2 text-gray-700 font-medium">
                  <User className="w-4 h-4" />
                  <span>{user?.firstName}</span>
                </div>
                
                {user?.userType === 'customer' && (
                  <>
                    {role === 'seeker' && (
                      <Link 
                        to="/my-service-requests" 
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4" />
                          <span>My Requests</span>
                        </div>
                      </Link>
                    )}
                    {role === 'provider' && (
                      <Link 
                        to="/my-provider-offerings" 
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4" />
                          <span>My Offerings</span>
                        </div>
                      </Link>
                    )}
                  </>
                )}
                
                {user?.userType === 'business' && (
                  <Link 
                    to="/my-listings" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4" />
                      <span>My Listings</span>
                    </div>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-100 pt-3 px-4 space-y-2">
                <Link to="/signup" onClick={closeMobileMenu}>
                  <Button size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;