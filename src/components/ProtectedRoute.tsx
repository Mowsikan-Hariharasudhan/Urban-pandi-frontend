import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  userType?: 'customer' | 'business';
};

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If userType is specified, check if the user has the required type
  if (userType && user?.userType !== userType) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;