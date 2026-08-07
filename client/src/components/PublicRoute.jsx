import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default PublicRoute;
