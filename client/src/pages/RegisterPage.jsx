import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../components/ButtonLoader';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { useAppToast } from '../hooks/useAppToast';
import { getErrorMessage } from '../utils/helpers';

function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setServerError] = useState('');
  const toast = useAppToast();
  const password = watch('password', '');

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await registerUser(values);
      toast.success('Account created successfully');
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
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">Start tracking your applications with confidence.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" type="text" placeholder="Full Name" {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" type="email" placeholder="Email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" type="password" placeholder="Password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            {password && password.length < 8 && <p className="mt-1 text-sm text-amber-600">Try a longer password for better security.</p>}
          </div>
          <div>
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" type="password" placeholder="Confirm Password" {...register('confirmPassword', { required: 'Please confirm your password', validate: (value) => value === password || 'Passwords do not match' })} />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>
          {serverError && <p className="text-sm text-red-600">{serverError}</p>}
          <button className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 font-medium text-white" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <ButtonLoader label="Creating account..." /> : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          Already have an account? <Link className="text-blue-600" to="/login">Login</Link>
        </p>
        {isSubmitting && <LoadingSpinner label="Creating your account" />}
      </div>
    </div>
  );
}

export default RegisterPage;
