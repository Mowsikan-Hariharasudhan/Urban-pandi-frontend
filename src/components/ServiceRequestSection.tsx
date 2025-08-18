import React, { useState, useEffect } from 'react';
import { serviceRequestAPI, API_URL, providerOfferingAPI } from '../services/api';
import ServiceRequestCard from './ServiceRequestCard';
import ProviderOfferingCard from './ProviderOfferingCard';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useServiceRole } from '@/contexts/ServiceRoleContext';
import ServiceRoleToggle from './ServiceRoleToggle';

const ServiceRequestSection = () => {
  const PREVIEW_LIMIT = 4; // show only a small, fixed number of posts in this section
  const [requests, setRequests] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { role, setRole } = useServiceRole();

  useEffect(() => {
  fetchRequests();
  fetchOfferings();
  }, []);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const response = await serviceRequestAPI.getAllServiceRequests({ status: 'open' });
      // Sort by createdAt in descending order and take the top 6
      const sortedRequests = response.data.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  setRequests(sortedRequests.slice(0, PREVIEW_LIMIT));
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOfferings = async () => {
    try {
      setIsLoading(true);
      const res = await providerOfferingAPI.getAllProviderOfferings({ status: 'active' });
      const sorted = res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  setOfferings(sorted.slice(0, PREVIEW_LIMIT));
    } catch (error) {
      console.error('Error fetching offerings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="service-requests" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="mb-6">
            <ServiceRoleToggle role={role} onChange={setRole} />
          </div>
          {role === 'provider' ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Browse <span className="text-blue-600">Service Requests</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                See nearby customer requests you can respond to.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Discover <span className="text-blue-600">Available Services</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Browse service providers and offerings you can hire.
              </p>
            </>
          )}
        </div>

        {/* Show only one panel at a time based on role */}
        {role === 'provider' ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Recent Service Requests</h3>
                <p className="text-sm text-gray-500">Top requests from customers</p>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/create-service-request">
                  <Button className="text-sm">Add new request</Button>
                </Link>
                <Link to="/service-requests">
                  <Button variant="outline" className="text-sm">See all</Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-4">
              {isLoading ? (
                [...Array(PREVIEW_LIMIT)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white p-4 rounded shadow" />
                ))
              ) : (
                (requests.length > 0 ? requests : []).map((request: any) => (
                  <ServiceRequestCard 
                    key={request._id}
                    request={{ ...request, image: request.image?.startsWith('http') ? request.image : `${API_URL.replace('/api', '')}${request.image}` }}
                  />
                ))
              )}

              {requests.length === 0 && !isLoading && (
                <div className="text-center py-6 text-gray-500">No recent requests found.</div>
              )}
            </div>

            {/* Bottom See all for provider panel */}
            <div className="text-center mt-6">
              <Link to="/service-requests">
                <Button variant="outline" className="text-sm">See all</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Available Services</h3>
                <p className="text-sm text-gray-500">Top provider listings you can hire</p>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/create-provider-offering">
                  <Button className="text-sm">Add new service offer</Button>
                </Link>
                <Link to="/provider-offerings">
                  <Button variant="outline" className="text-sm">See all</Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-4">
              {isLoading ? (
                [...Array(PREVIEW_LIMIT)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white p-4 rounded shadow" />
                ))
              ) : (
                (offerings.length > 0 ? offerings : []).map((offering: any) => (
                  <ProviderOfferingCard key={offering._id} offering={{ ...offering, image: offering.image?.startsWith('http') ? offering.image : `${API_URL.replace('/api', '')}${offering.image}` }} />
                ))
              )}

              {offerings.length === 0 && !isLoading && (
                <div className="text-center py-6 text-gray-500">No provider offerings found.</div>
              )}
            </div>

            {/* Bottom See all for seeker panel */}
            <div className="text-center mt-6">
              <Link to="/provider-offerings">
                <Button variant="outline" className="text-sm">See all</Button>
              </Link>
            </div>
          </div>
        )}

        {role === 'seeker' && requests.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No service requests found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceRequestSection;