import React from 'react';

interface ModalProps {
  title?: string; // Optional to avoid breaking EditModalComponent usage
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/3 rounded shadow-lg p-6">
        <div className="flex justify-between items-center">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">X</button>
        </div>
        <div className="mt-4">{children}</div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
