import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/user.slice.js";
import OAuth from "../components/OAuth.jsx";

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
      <div className="bg-[#ffffff] border rounded-2xl shadow-2xl p-6 mt-9">
        <h1 className="text-3xl text-center font-semibold mb-5 text-sky-600">
          Log Into App
        </h1>
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
            className="bg-sky-600 text-white p-3 rounded-lg hover:opacity-85  disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="mt-5 flex items-center justify-around">
          <hr className="w-2/5" />
          <span className="text-slate-400">or</span>
          <hr className="w-2/5" />
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div className="flex gap-1">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <span className="text-sky-600 hover:underline">Sign up</span>
            </Link>
          </div>
          <Link to="/forgot/password">
            <span className="hover:underline">Forgot Password?</span>
          </Link>
        </div>
        <p className="text-red-500 mt-5">{errorMessage && errorMessage}</p>
      </div>
    </div>
  );
};

export default SignIn;
