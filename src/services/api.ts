import axios from 'axios';

export const API_URL = 'https://urban-pandi-backend.onrender.com/api';
export const BASE_URL = 'https://urban-pandi-backend.onrender.com'; // New base URL for static assets

const api = axios.create({
  baseURL: API_URL,
  // Remove the headers property entirely or set it to an empty object
  // headers: {
  //   'Content-Type': 'application/json'
  // }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Enhanced response interceptor to handle token expiration and auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (token expired or invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Check if token is actually expired by decoding it
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          
          const decoded = JSON.parse(jsonPayload);
          const currentTime = Date.now() / 1000;
          
          // If token is expired or about to expire (within 5 minutes), refresh it
          if (decoded.exp <= currentTime + 300) { // 5 minutes buffer
            const refreshResponse = await axios.post(`${API_URL}/auth/refresh-token`, {}, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            const { token: newToken, user } = refreshResponse.data;
            
            // Update stored token and user data
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Update the authorization header for the original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            
            // Retry the original request with new token
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Dispatch custom event to notify AuthContext
        window.dispatchEvent(new CustomEvent('auth:logout'));
        
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login?message=Session expired. Please login again.';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


// Auth API calls
export const authAPI = {
  login: (email: string, password: string, userType: string) => {
    return api.post('/auth/login', { email, password, userType });
  },
  signup: (userData: any) => {
    return api.post('/auth/signup', userData);
  },
  refreshToken: () => {
    return api.post('/auth/refresh-token');
  }
};

// Business API calls
// Add this to the businessAPI object
export const businessAPI = {
  getAllBusinesses: (filters?: { category?: string; location?: string }) => {
    return api.get('/businesses', { params: filters });
  },
  searchBusinesses: (query: string, filters?: { category?: string; location?: string }) => {
    return api.get('/businesses/search', { 
      params: { query, ...filters } 
    });
  },
  getBusinessById: (id: string) => {
    return api.get(`/businesses/${id}`);
  },
  createBusiness: (businessData: any) => {
    // When sending FormData, Axios automatically sets the correct Content-Type
    return api.post('/businesses', businessData);
  },
  updateBusiness: (id: string, businessData: any) => {
    return api.put(`/businesses/${id}`, businessData);
  },
  deleteBusiness: (id: string) => {
    return api.delete(`/businesses/${id}`);
  },
  getMyBusinesses: () => {
    return api.get('/businesses/my-businesses');
  },
  // Remove or update this if it still exists and points to /my-listings
  // getMyListings: () => {
  //   return api.get('/businesses/my-listings');
  // },
};

// Contact API calls
export const contactAPI = {
  submitContactForm: (contactData: any) => {
    return api.post('/contact', contactData);
  },
  contactBusiness: (businessId: string, contactData: any) => {
    return api.post(`/contact/business/${businessId}`, contactData);
  },
  getContacts: () => {
    return api.get('/contact');
  }
};

// Add this to your api.ts file
export const reviewAPI = {
  getBusinessReviews: (businessId: string) => {
    return api.get(`/reviews/business/${businessId}`);
  },
  createReview: (reviewData: { businessId: string; rating: number; comment?: string }) => {
    return api.post('/reviews', reviewData);
  },
  updateReview: (reviewId: string, reviewData: { rating: number; comment?: string }) => {
    return api.put(`/reviews/${reviewId}`, reviewData);
  },
  deleteReview: (reviewId: string) => {
    return api.delete(`/reviews/${reviewId}`);
  }
};

// Service Request API calls
export const serviceRequestAPI = {
  getAllServiceRequests: (filters?: { category?: string; location?: string; status?: string }) => {
    return api.get('/service-requests', { params: filters });
  },
  getServiceRequestById: (id: string) => { 
    return api.get(`/service-requests/${id}`);
  },
  createServiceRequest: (requestData: FormData) => {
    return api.post('/service-requests', requestData);
  },
  getMyServiceRequests: () => { 
    return api.get('/service-requests/my-requests');
  },
  updateServiceRequest: (id: string, requestData: FormData) => {
    return api.put(`/service-requests/${id}`, requestData);
  },
  deleteServiceRequest: (id: string) => {
    return api.delete(`/service-requests/${id}`);
  },
  addComment: (id: string, comment: { text: string }) => {
    return api.post(`/service-requests/${id}/comments`, comment);
  },
  updateRequestStatus: (id: string, status: string) => {
    return api.put(`/service-requests/${id}/status`, { status });
  }
};

// Provider Offering API calls
export const providerOfferingAPI = {
  getAllProviderOfferings: (filters?: { category?: string; serviceArea?: string; status?: string }) => {
    return api.get('/provider-offerings', { params: filters });
  },
  getProviderOfferingById: (id: string) => {
    return api.get(`/provider-offerings/${id}`);
  },
  createProviderOffering: (data: FormData) => {
    return api.post('/provider-offerings', data);
  },
  getMyProviderOfferings: () => {
    return api.get('/provider-offerings/my-offerings');
  },
  updateProviderOffering: (id: string, data: FormData) => {
    return api.put(`/provider-offerings/${id}`, data);
  },
  deleteProviderOffering: (id: string) => {
    return api.delete(`/provider-offerings/${id}`);
  },
  updateOfferingStatus: (id: string, status: string) => {
    return api.put(`/provider-offerings/${id}/status`, { status });
  }
};

// Offers API
export const offersAPI = {
  createOffer: (requestId: string, data: { message?: string; proposedPrice?: number }) => api.post(`/offers/${requestId}`, data),
  getOffersForRequest: (requestId: string) => api.get(`/offers/request/${requestId}`),
  getMyOffers: () => api.get('/offers/my'),
  updateOfferStatus: (offerId: string, status: string) => api.put(`/offers/${offerId}/status`, { status }),
  getNotifications: () => api.get('/offers/notifications')
};

export default api;

