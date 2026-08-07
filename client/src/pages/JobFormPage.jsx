import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonLoader from '../components/ButtonLoader';
import { useAppToast } from '../hooks/useAppToast';
import api from '../services/api';
import { getErrorMessage } from '../utils/helpers';

function JobFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      company: '',
      role: '',
      status: 'Applied',
      appliedDate: '',
      notes: '',
    },
  });
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const toast = useAppToast();

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const { data } = await api.get(`/jobs/${id}`);
        const job = data.data;
        reset({
          company: job.company || '',
          role: job.role || '',
          status: job.status || 'Applied',
          appliedDate: job.appliedDate ? job.appliedDate.slice(0, 10) : '',
          notes: job.notes || '',
        });
      } catch (err) {
        setServerError(getErrorMessage(err));
      }
    };

    fetchJob();
  }, [id, reset]);

  const onSubmit = async (values) => {
    setServerError('');
    setSuccess('');

    try {
      if (id) {
        await api.put(`/jobs/${id}`, values);
        setSuccess('Job updated successfully');
        toast.success('Job updated successfully');
      } else {
        await api.post('/jobs', values);
        setSuccess('Job added successfully');
        toast.success('Job added successfully');
      }
      setTimeout(() => navigate('/dashboard'), 600);
    } catch (err) {
      const message = getErrorMessage(err);
      setServerError(message);
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">{id ? 'Edit Job' : 'Add Job'}</h1>
      <p className="mt-2 text-sm text-slate-500">Capture the details of your application clearly.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Company" {...register('company', { required: 'Company is required' })} />
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
        </div>

        <div>
          <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Role" {...register('role', { required: 'Role is required' })} />
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
        </div>

        <div>
          <input className="w-full rounded-lg border border-slate-300 px-4 py-3" type="date" {...register('appliedDate')} />
        </div>

        <div>
          <select className="w-full rounded-lg border border-slate-300 px-4 py-3" {...register('status')}>
            <option value="Applied">Applied</option>
            <option value="OA">OA</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <textarea className="w-full rounded-lg border border-slate-300 px-4 py-3" rows="5" placeholder="Notes" {...register('notes')} />
        </div>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}
        {success && <p className="text-sm text-emerald-600">{success}</p>}

        <div className="flex gap-3">
          <button className="flex-1 rounded-lg bg-slate-900 px-4 py-3 font-medium text-white" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <ButtonLoader label="Saving..." /> : id ? 'Save Changes' : 'Create Job'}
          </button>
          <button type="button" className="rounded-lg border border-slate-300 px-4 py-3" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobFormPage;
