import Modal from "react-modal";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { faL } from "@fortawesome/free-solid-svg-icons";

// Generic Modal Component
const GenericModal = ({ isOpen, onRequestClose, title, children, onSave }) => {
  let [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave();
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoading(false);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg p-8 shadow-lg relative w-11/12 max-w-2xl h-100 mx-auto my-8"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
    >
      {" "}
      {loading ? (
        <div className="flex justify-center items-center">
        <ClipLoader
          color={"#F4CE14"}
          loading={loading}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
          
        />
        </div>
      ) : (
        <div>
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onRequestClose}
          >
            ✖️
          </button>
          <h2 className="text-2xl font-bold mb-4 codefolio-yellow">{title}</h2>
          {children}
          <div className="flex justify-end">
            <button
              onClick={onRequestClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="codefoliobg-yellow text-white px-4 py-2 rounded hover:bg-amber-300"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default GenericModal;
