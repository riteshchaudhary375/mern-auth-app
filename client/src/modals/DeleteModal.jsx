import React, { useRef } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeleteModal = ({ onClose, onDeleteUser }) => {
  const deleteModalRef = useRef();

  const closeDeleteModal = (e) => {
    if (deleteModalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center"
      ref={deleteModalRef}
      onClick={closeDeleteModal}
    >
      <div className="bg-gray-100 mx-auto rounded-lg px-5 py-7 text-center ">
        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-700 mb-4 mx-auto" />
        <h1 className="mb-1 text-2xl font-semibold text-gray-700">
          Are you sure?
        </h1>
        <p className="mb-5">
          Do you really want to delete your account. This process cannot be
          undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85"
            onClick={onClose}
          >
            No, cancel
          </button>
          <button
            className="border-2 border-red-700 hover:bg-red-700 hover:text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85"
            onClick={onDeleteUser}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
