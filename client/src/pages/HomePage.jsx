import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold">Job Tracker Dashboard</h1>
      <p className="mt-3 text-slate-600">Track applications, manage statuses, and stay organized.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/login" className="rounded-lg bg-slate-900 px-4 py-2 text-white">Login</Link>
        <Link to="/register" className="rounded-lg border border-slate-300 px-4 py-2">Register</Link>
      </div>
    </div>
  );
}

export default HomePage;
