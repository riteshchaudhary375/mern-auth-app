import React from "react";
import { FaGoogle } from "react-icons/fa";

const OAuth = () => {
  return (
    <button className="w-1/2 mx-auto flex justify-center items-center p-3 rounded-lg bg-transparent hover:bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 border border-sky-600 hover:border-transparent transition bg-duration-200 ease-in">
      <FaGoogle className="mr-2" />
      Continue with Google
    </button>
  );
};

export default OAuth;
