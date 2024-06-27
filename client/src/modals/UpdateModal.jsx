import React, { useRef } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const UpdateModal = ({ onClose, onUpdateUser }) => {
  const updateModalRef = useRef();

  const closeUpdateModal = (e) => {
    if (updateModalRef.current === e.target) {
      onClose();
    }
  };

  const handleUpdate = async (e) => {
    await onUpdateUser(e);
    await onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center"
      ref={updateModalRef}
      onClick={closeUpdateModal}
    >
      <div className="bg-gray-100 mx-auto rounded-lg px-5 py-7 text-center ">
        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-700 mb-4 mx-auto" />
        <h1 className="mb-2 text-2xl font-semibold text-gray-700">
          Confirm Change
        </h1>
        <p className="mb-5">
          Updating this information will update your profile for each you are
          assigned to.
        </p>
        <div
          className="flex justify-center gap-4"
          ref={updateModalRef}
          onClick={closeUpdateModal}
        >
          <button
            className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="border-2 border-green-700 hover:bg-green-700 hover:text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
