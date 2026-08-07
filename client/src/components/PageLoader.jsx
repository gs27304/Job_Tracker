function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-900">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-slate-700 dark:border-t-sky-400" />
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Preparing your workspace...</p>
      </div>
    </div>
  );
}

export default PageLoader;
