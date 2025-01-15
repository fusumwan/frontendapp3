import React from 'react';

interface DatepickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string; // "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss"
  error?: string;
}

const datePatternFormatter = {
  "date": [
    "YYYY-MM-DD",
    "DD-MM-YYYY",
    "MM-DD-YYYY",
    "YYYY/MM/DD",
    "DD/MM/YYYY",
    "MM/DD/YYYY"
  ],
  "datetime-local": [
    "YYYY-MM-DDTHH:mm:ss",
    "YYYY-MM-DD HH:mm:ss",
    "DD-MM-YYYYTHH:mm:ss",
    "DD-MM-YYYY HH:mm:ss",
    "MM-DD-YYYYTHH:mm:ss",
    "MM-DD-YYYY HH:mm:ss",
    "YYYY/MM/DDTHH:mm:ss",
    "YYYY/MM/DD HH:mm:ss",
    "DD/MM/YYYYTHH:mm:ss",
    "DD/MM/YYYY HH:mm:ss",
    "MM/DD/YYYYTHH:mm:ss",
    "MM/DD/YYYY HH:mm:ss"
  ]
};

const determineInputType = (pattern: string): string => {
  if (datePatternFormatter["date"].includes(pattern)) {
    return "date";
  } else if (datePatternFormatter["datetime-local"].includes(pattern)) {
    return "datetime-local";
  } else {
    throw new Error(`Unsupported pattern: ${pattern}`);
  }
};

const formatValue = (value: string, pattern: string): string => {
    if (datePatternFormatter["date"].includes(pattern)) {
      // Strip time portion for date patterns
      return value.includes("T") ? value.split("T")[0] : value;
    } else if (datePatternFormatter["datetime-local"].includes(pattern)) {
      // Format to match "YYYY-MM-DDTHH:mm:ss"
      const [date, time] = value.split("T");
      if (time) {
        return `${date}T${time.split(".")[0]}`;
      }
      return `${date}T00:00:00`;
    }
    return value;
  };

const Datepicker: React.FC<DatepickerProps> = ({
  label,
  name,
  value,
  onChange,
  pattern = 'YYYY-MM-DDTHH:mm:ss',
  error,
}) => {
  // Determine input type dynamically
  const inputType = determineInputType(pattern);

  return (
    <div className="datepicker-container">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={inputType}
        value={formatValue(value, pattern)}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Datepicker;
