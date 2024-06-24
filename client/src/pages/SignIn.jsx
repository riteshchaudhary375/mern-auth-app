import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/user.slice.js";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  /* const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); */

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      formData.email === "" ||
      formData.password === ""
    ) {
      // return setErrorMessage("All fields are required");
      return dispatch(signInFailure("All fields are required"));
    }

    try {
      /* setErrorMessage(false);
      setLoading(true); */
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        // setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/dashboard");
      }
    } catch (error) {
      /* setErrorMessage(error.message);
      setLoading(false); */
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="border rounded-2xl shadow p-6 mt-7">
        <h1 className="text-3xl text-center font-semibold mb-7">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border-2 p-3 rounded-lg outline-sky-500"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border-2 p-3 rounded-lg outline-sky-500"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-sky-600 text-white p-3 rounded-lg hover:opacity-90  disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500 hover:underline">Sign up</span>
          </Link>
        </div>
        <p className="text-red-500 mt-5">{errorMessage && errorMessage}</p>
      </div>
    </div>
  );
};

export default SignIn;
