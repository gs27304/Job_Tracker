function ButtonLoader({ label = 'Loading...' }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      <span>{label}</span>
    </span>
  );
}

export default ButtonLoader;
