import React, { useEffect } from "react";

const ModalPopup = ({ isOpen, onClose, onConfirm, message }) => {
  useEffect(() => {
    // Lock the page scroll when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when the modal is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 mx-auto relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmation</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
