function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-6 text-sm text-slate-600 dark:text-slate-300">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-sky-400" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
