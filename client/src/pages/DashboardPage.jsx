import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ChartCard from '../components/ChartCard';
import DarkModeToggle from '../components/DarkModeToggle';
import FiltersBar from '../components/FiltersBar';
import JobCard from '../components/JobCard';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import SearchBar from '../components/SearchBar';
import SkeletonCards from '../components/SkeletonCards';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useAppToast } from '../hooks/useAppToast';
import api from '../services/api';
import { formatDate, getErrorMessage } from '../utils/helpers';

const summaryCards = [
  { label: 'Total', key: 'total' },
  { label: 'Applied', key: 'Applied' },
  { label: 'OA', key: 'OA' },
  { label: 'Interview', key: 'Interview' },
  { label: 'Offer', key: 'Offer' },
  { label: 'Rejected', key: 'Rejected' },
];

function DashboardPage() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const toast = useAppToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const search = params.get('search') || '';
  const status = params.get('status') || '';
  const sort = params.get('sort') || 'newest';
  const page = Number(params.get('page') || '1');
  const limit = Number(params.get('limit') || '10');
  const isJobListPage = location.pathname === '/jobs';

  const updateQuery = (updates) => {
    const next = new URLSearchParams(location.search);
    const shouldResetPage = Object.keys(updates).some((key) => ['search', 'status', 'sort', 'limit'].includes(key));

    if (shouldResetPage) {
      next.set('page', '1');
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    navigate({ pathname: location.pathname, search: next.toString() ? `?${next.toString()}` : '' });
  };

  const fetchJobs = async (query = {}) => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.get('/jobs', {
        params: {
          search: query.search ?? search,
          status: query.status ?? status,
          sort: query.sort ?? sort,
          page: query.page ?? page,
          limit: query.limit ?? limit,
        },
      });

      setJobs(data.data || []);
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0, limit: query.limit ?? limit });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs({ search, status, sort, page, limit });
  }, [search, status, sort, page, limit]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await api.delete(`/jobs/${deleteTarget}`);
      toast.success('Job deleted successfully');
      setDeleteTarget(null);
      fetchJobs({ search, status, sort, page, limit });
    } catch (err) {
      setError(getErrorMessage(err));
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const stats = useMemo(() => {
    const counts = { total: jobs.length, Applied: 0, OA: 0, Interview: 0, Offer: 0, Rejected: 0 };
    jobs.forEach((job) => {
      if (counts[job.status] !== undefined) counts[job.status] += 1;
    });
    return counts;
  }, [jobs]);

  if (loading && !isJobListPage) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      {user?.role === 'guest' && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200 gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100 uppercase tracking-wide">
              Interviewer Demo Mode
            </span>
            <span>You have full access to explore features, filter data, and create/edit applications. Destructive delete actions are restricted.</span>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Welcome, {user?.name || 'there'}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">A polished overview of your application pipeline.</p>
          </div>
          <div className="flex gap-3">
            <DarkModeToggle isDark={isDark} onToggle={toggleTheme} />
            <Link to="/jobs/new" className="rounded-lg bg-slate-900 px-4 py-2 text-white">Quick Add</Link>
            <button onClick={logout} className="rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-600 dark:text-slate-200">Logout</button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{card.key === 'total' ? stats.total : stats[card.key]}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Applications by Status" data={summaryCards.filter((card) => card.key !== 'total').map((card) => ({ name: card.label, value: stats[card.key] }))} />
        <ChartCard title="Applications by Month" data={[{ name: 'Jan', value: 2 }, { name: 'Feb', value: 4 }, { name: 'Mar', value: 3 }, { name: 'Apr', value: 6 }, { name: 'May', value: 5 }]} />
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      {isJobListPage ? (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">All Jobs</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Search, filter, and browse your applications.</p>
            </div>
            <Link to="/jobs/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">Add Job</Link>
          </div>

          <div className="mb-4 space-y-3">
            <SearchBar value={search} onChange={(value) => updateQuery({ search: value })} />
            <FiltersBar
              filters={{ status, sort, limit }}
              onChange={(nextFilters) => updateQuery({ status: nextFilters.status, sort: nextFilters.sort, limit: nextFilters.limit })}
              onReset={() => updateQuery({ search: '', status: '', sort: 'newest', limit: 10 })}
            />
          </div>

          {loading ? (
            <SkeletonCards count={3} />
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
              No jobs match your current filters.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} onDelete={() => setDeleteTarget(job._id)} />
              ))}
            </div>
          )}

          <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={(nextPage) => updateQuery({ page: nextPage })} />
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Jobs</h2>
            <Link className="text-sm text-blue-600" to="/jobs">View all</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <SkeletonCards count={3} />
            ) : jobs.slice(0, 6).map((job) => (
              <div key={job._id} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{job.role}</h3>
                    <p className="text-sm text-slate-500">{job.company}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{job.status}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">Applied: {formatDate(job.appliedDate)}</p>
                <div className="mt-4 flex gap-3 text-sm">
                  <Link to={`/jobs/${job._id}/edit`} className="text-blue-600">Edit</Link>
                  <Link to={`/jobs/${job._id}`} className="text-slate-600 dark:text-slate-300">View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={Boolean(deleteTarget)}
        title="Delete this job?"
        description="This action cannot be undone. The job will be removed from your tracker."
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default DashboardPage;
