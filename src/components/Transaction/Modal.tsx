import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 shadow-lg max-w-xs w-full text-center">
        <p className="mb-4 text-lg font-semibold">Bill saved successfully!</p>
        <button
          onClick={onClose}
          className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
