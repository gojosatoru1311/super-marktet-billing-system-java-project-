import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateStaffRouteProps {
  children: React.ReactNode;
}

const PrivateStaffRoute: React.FC<PrivateStaffRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/staff" replace />;
  }

  return <>{children}</>;
};

export default PrivateStaffRoute;