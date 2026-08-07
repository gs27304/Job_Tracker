function SkeletonCards({ count = 3 }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-3 h-5 w-32 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-4 h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-2 h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonCards;
