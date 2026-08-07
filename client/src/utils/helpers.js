export const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
};

export const getErrorMessage = (error) => {
  return error?.response?.data?.message || 'Something went wrong';
};
