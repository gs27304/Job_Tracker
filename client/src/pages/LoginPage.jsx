import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../components/ButtonLoader';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { useAppToast } from '../hooks/useAppToast';
import { getErrorMessage } from '../utils/helpers';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setServerError] = useState('');
  const toast = useAppToast();

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await login(values.email, values.password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      const message = getErrorMessage(err);
      setServerError(message);
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
      <div className="w-full rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-slate-500">Access your job tracker.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" type="email" placeholder="Email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" type="password" placeholder="Password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          {serverError && <p className="text-sm text-red-600">{serverError}</p>}
          <button className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 font-medium text-white" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <ButtonLoader label="Logging in..." /> : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          No account? <Link className="text-blue-600" to="/register">Create one</Link>
        </p>
        {isSubmitting && <LoadingSpinner label="Authenticating" />}
      </div>
    </div>
  );
}

export default LoginPage;
