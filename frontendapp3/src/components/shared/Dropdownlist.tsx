import React from 'react';

interface DropdownlistProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dataSource: any[];
  dataTextField: string;
  dataTextValue: string;
  selectedValue: string;
  error?: string;
}

const Dropdownlist: React.FC<DropdownlistProps> = ({
  label,
  name,
  onChange,
  dataSource,
  dataTextField,
  dataTextValue,
  selectedValue,
  error
}) => {
  return (
    <div className="dropdownlist-container">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={selectedValue}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-500' : ''}`}
      >
        <option value="" disabled>
          -- Select an option --
        </option>
        {dataSource.map((item, index) => (
          <option key={index} value={item[dataTextValue]}>
            {item[dataTextField]}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Dropdownlist;
