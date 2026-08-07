import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import ToastProvider from '../components/ToastProvider';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import router from './router';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider />
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
