function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold">404</h1>
        <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
