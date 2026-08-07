import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyLogo from '../components/CompanyLogo';
import ResumeUploader from '../components/ResumeUploader';
import api from '../services/api';
import { formatDate, getErrorMessage } from '../utils/helpers';

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setJob(data.data);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <div className="rounded-2xl bg-white p-8 shadow-sm">{error || 'Loading...'}</div>;
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-900">
      <div className="flex items-center gap-4">
        <CompanyLogo company={job.company} size={56} className="border border-slate-200 dark:border-slate-700" />
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{job.role}</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{job.company}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
        <p><span className="font-medium">Status:</span> {job.status}</p>
        <p><span className="font-medium">Applied:</span> {formatDate(job.appliedDate)}</p>
        <p><span className="font-medium">Notes:</span> {job.notes || 'No notes provided.'}</p>
      </div>

      <div className="mt-6">
        <ResumeUploader jobId={job._id} currentUrl={job.resumeUrl} onUploaded={(url) => setJob({ ...job, resumeUrl: url })} />
      </div>
    </div>
  );
}

export default JobDetailPage;
