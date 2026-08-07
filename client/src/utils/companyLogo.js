const cache = new Map();

export const getCompanyLogoUrl = (company) => {
  if (!company) return '';
  const key = company.trim().toLowerCase();
  if (cache.has(key)) return cache.get(key);

  const encoded = encodeURIComponent(company);
  const url = `https://logo.clearbit.com/${encoded}`;
  cache.set(key, url);
  return url;
};
