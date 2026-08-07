import { Link } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';
import { formatDate } from '../utils/helpers';

function JobCard({ job, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <CompanyLogo company={job.company} size={44} />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{job.role}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">{job.status}</span>
      </div>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Applied: {formatDate(job.appliedDate)}</p>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
        {job.notes || 'No notes added yet.'}
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link to={`/jobs/${job._id}/edit`} className="text-blue-600">Edit</Link>
        <Link to={`/jobs/${job._id}`} className="text-slate-600 dark:text-slate-300">View</Link>
        <button onClick={() => onDelete(job._id)} className="text-red-600">Delete</button>
      </div>
    </div>
  );
}

export default JobCard;
