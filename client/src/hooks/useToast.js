import { useEffect, useState } from 'react';

export const useToast = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const showToast = (msg, toastType = 'success') => {
    setType(toastType);
    setMessage(msg);
  };

  return { message, type, showToast };
};
