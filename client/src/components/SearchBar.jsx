import { useEffect, useState } from 'react';

function SearchBar({ value, onChange, placeholder = 'Search jobs...' }) {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, 350);

    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  return (
    <input
      className="w-full rounded-lg border border-slate-300 px-4 py-3"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}

export default SearchBar;
