import React, { useRef } from "react";
import { IoMdPower } from "react-icons/io";

const LogoutModal = ({ onClose, onSignoutUser }) => {
  const logoutModalRef = useRef();

  const closeLogoutModal = (e) => {
    if (logoutModalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center"
      ref={logoutModalRef}
      onClick={closeLogoutModal}
    >
      <div className="bg-gray-100 mx-auto rounded-lg px-5 py-7 text-center ">
        <IoMdPower className="h-14 w-14 text-gray-700 mb-4 mx-auto" />
        <h1 className="mb-1 text-2xl font-semibold text-gray-700">
          Logout Account
        </h1>
        <p className="mb-5">Are you sure you want to logout your account?</p>
        <div className="flex justify-center gap-4">
          <button
            className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="border-2 border-sky-700 hover:bg-sky-700 hover:text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85"
            onClick={onSignoutUser}
          >
            Yes, Logout!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
