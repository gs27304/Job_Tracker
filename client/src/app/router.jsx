import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import HomePage from '../pages/HomePage';
import JobDetailPage from '../pages/JobDetailPage';
import JobFormPage from '../pages/JobFormPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'jobs', element: <DashboardPage /> },
          { path: 'jobs/new', element: <JobFormPage /> },
          { path: 'jobs/:id', element: <JobDetailPage /> },
          { path: 'jobs/:id/edit', element: <JobFormPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
