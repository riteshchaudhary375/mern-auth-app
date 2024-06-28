import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = ({ onClose }) => {
  const handleForgotBack = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-sky-600 backdrop-blur-sm flex items-center">
      <div className="bg-gray-100 md:w-1/2 lg:w-1/3 mx-auto rounded-lg px-5 py-7 text-center">
        <form>
          <h1 className="mb-5 text-2xl font-semibold text-gray-700">
            Forgot Password?
          </h1>
          <div className="flex flex-col w-full text-left gap-1">
            <label htmlFor="email" className="font-semibold text-lg">
              Email address:
            </label>
            <input
              className="border-2 p-2 rounded-lg outline-sky-500"
              type="email"
              name="email"
              id="email"
              placeholder="your email address"
            />
          </div>
          <button className="bg-sky-700 text-white w-full rounded-md p-2 hover:opacity-85 mt-7 mb-2">
            Submit
          </button>
        </form>
        <div className="float-left">
          <Link onClick={handleForgotBack} className="hover:underline">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
