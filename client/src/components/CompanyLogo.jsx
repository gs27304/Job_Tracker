import { useEffect, useMemo, useState } from 'react';
import { getCompanyLogoUrl } from '../utils/companyLogo';

function CompanyLogo({ company, size = 40, className = '' }) {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);

  const resolved = useMemo(() => getCompanyLogoUrl(company), [company]);

  useEffect(() => {
    setImageUrl(resolved);
    setError(false);
  }, [resolved]);

  if (error || !imageUrl) {
    const initial = (company || 'J').charAt(0).toUpperCase();
    return (
      <div className={`flex items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-100 ${className}`} style={{ width: size, height: size }}>
        {initial}
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={`${company || 'Company'} logo`}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
      onError={() => setError(true)}
    />
  );
}

export default CompanyLogo;
