import React from 'react';

interface ButtonProps {
  children: React.ReactNode; // Support children as the button content
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', disabled = false }) => {
  const buttonClass = variant === 'primary'
    ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    : 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded';

  return (
    <button
      className={`${buttonClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
