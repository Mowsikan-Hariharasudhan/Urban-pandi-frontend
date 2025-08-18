import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Businesses from "./pages/Businesses";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { ServiceRoleProvider } from "./contexts/ServiceRoleContext";
import GlobalOnboarding from '@/components/GlobalOnboarding';
import NotificationCenter from '@/components/NotificationCenter';
import BusinessListing from "./pages/BusinessListing.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import MyListings from "./pages/MyListings.tsx";
import EditBusiness from "./pages/EditBusiness.tsx";
import BusinessDetails from "./pages/BusinessDetails.tsx";
import ServiceRequests from "./pages/ServiceRequests";
import CreateServiceRequest from "./pages/CreateServiceRequest";
import MyServiceRequests from "./pages/MyServiceRequests";
import ServiceRequestDetails from "./pages/ServiceRequestDetails";
import EditServiceRequest from "./pages/EditServiceRequest";
import ProviderOfferings from './pages/ProviderOfferings';
import ProviderOfferingDetails from './pages/ProviderOfferingDetails';
import CreateProviderOffering from './pages/CreateProviderOffering';
import MyProviderOfferings from './pages/MyProviderOfferings';
import EditProviderOffering from './pages/EditProviderOffering';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ServiceRoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Service Request Routes */}
            <Route path="/service-requests" element={<ServiceRequests />} />
            <Route path="/service-requests/:requestId" element={<ServiceRequestDetails />} />
            <Route path="/create-service-request" element={<ProtectedRoute userType="customer"><CreateServiceRequest /></ProtectedRoute>} />
            <Route path="/my-service-requests" element={<ProtectedRoute userType="customer"><MyServiceRequests /></ProtectedRoute>} />

            <Route path="/edit-service-request/:requestId" element={
              <ProtectedRoute userType="customer">
                <EditServiceRequest />
              </ProtectedRoute>
            } />
            {/* Existing Business Routes */}
            <Route path="/my-listings" element={
  <ProtectedRoute userType="business">
    <MyListings />
  </ProtectedRoute>
} />
<Route path="/edit-business/:businessId" element={
  <ProtectedRoute userType="business">
    <EditBusiness />
  </ProtectedRoute>
} />

            <Route path="/business-listing" element={
              <ProtectedRoute userType="business">
                <BusinessListing />
              </ProtectedRoute>
            } />
            <Route path="/businesses/:businessId" element={<BusinessDetails />} />
            <Route path="/provider-offerings" element={<ProviderOfferings />} />
            <Route path="/provider-offerings/:offeringId" element={<ProviderOfferingDetails />} />
            <Route path="/create-provider-offering" element={<ProtectedRoute userType="customer"><CreateProviderOffering /></ProtectedRoute>} />
            <Route path="/my-provider-offerings" element={<ProtectedRoute userType="customer"><MyProviderOfferings /></ProtectedRoute>} />
            <Route path="/edit-provider-offering/:offeringId" element={<ProtectedRoute userType="customer"><EditProviderOffering /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Notification center icon and modal accessible on all pages */}
          <NotificationCenter />
          <GlobalOnboarding />
        </BrowserRouter>
      </TooltipProvider>
      </ServiceRoleProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;


