import React from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange, placeholder, type = 'text', error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        name={name} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? 'border-red-500' : ''
        }`}
      />
      {/* Display error message if provided */}
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default Input;
