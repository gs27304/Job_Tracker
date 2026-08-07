function FiltersBar({ filters, onChange, onReset }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
      <select
        className="rounded-lg border border-slate-300 px-3 py-2"
        value={filters.status || ''}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="OA">OA</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select
        className="rounded-lg border border-slate-300 px-3 py-2"
        value={filters.sort || 'newest'}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      <select
        className="rounded-lg border border-slate-300 px-3 py-2"
        value={filters.limit || 10}
        onChange={(e) => onChange({ ...filters, limit: Number(e.target.value) })}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </select>

      <button onClick={onReset} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        Reset
      </button>
    </div>
  );
}

export default FiltersBar;
