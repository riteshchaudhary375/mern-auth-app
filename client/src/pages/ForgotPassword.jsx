import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from "../redux/user/forgotPassword.slice.js";

const ForgotPassword = () => {
  // const [loading, setLoading] = useState(false);
  const { loading } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const [formData, setFormdata] = useState({});
  const [forgotPasswordErrorMessage, setForgotPasswordErrorMessage] =
    useState(null);
  const [forgotPasswordSuccessMessage, setForgotPasswordSuccessMessage] =
    useState(null);

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || formData.email === "") {
      setForgotPasswordErrorMessage("Enter email address");
    }

    try {
      dispatch(forgotPasswordStart());
      // setLoading(true);
      setForgotPasswordErrorMessage(null);
      setForgotPasswordSuccessMessage(null);
      const res = await fetch("/api/auth/forgot/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        dispatch(forgotPasswordFailure(data.message));
        // setLoading(false);
        setForgotPasswordErrorMessage(data.message);
      } else {
        dispatch(forgotPasswordSuccess(data));
        // setLoading(false);
        setForgotPasswordSuccessMessage(
          "Password reset link sent in your email"
        );
      }
    } catch (error) {
      dispatch(forgotPasswordFailure(error));
      // setLoading(false);
      setForgotPasswordErrorMessage(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-sky-600 backdrop-blur-sm flex items-center">
      <div className="bg-gray-100 shadow-lg w-3/4 md:w-1/2 xl:w-1/3 mx-auto rounded-lg px-5 py-7">
        <h1 className="mb-5 text-2xl text-center font-semibold text-gray-700">
          Forgot Password?
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-semibold text-lg">
            Email address:
          </label>
          <input
            className="border-2 p-2 rounded-lg mt-1 outline-sky-500"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-sky-700 text-white w-full rounded-md p-2 hover:opacity-85 mt-6 mb-2"
          >
            {loading ? "Sending link..." : "Search"}
          </button>
        </form>
        <div className="mb-2">
          <Link to="/sign-in" className=" hover:underline">
            Back
          </Link>
        </div>
        {forgotPasswordErrorMessage && (
          <p className="text-red-600">{forgotPasswordErrorMessage}</p>
        )}
        {forgotPasswordSuccessMessage && (
          <p className="text-sky-600">{forgotPasswordSuccessMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
