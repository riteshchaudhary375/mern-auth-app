import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/user.slice.js";
import OAuth from "../components/OAuth.jsx";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      formData.email === "" ||
      formData.password === ""
    ) {
      // console.log("All fields are required");
      return dispatch(signInFailure("All fields are required"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            placeholder="Enter email address"
            id="email"
            className="border-2 p-3 rounded-lg outline-sky-500"
            onChange={handleChange}
          />
          {/* <input
            type="password"
            placeholder="Enter password"
            id="password"
            className="border-2 p-3 rounded-lg outline-sky-500"
            onChange={handleChange}
          /> */}
          <div className="border-2 rounded-lg flex justify-between items-center">
            <input
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              id="password"
              className="w-full p-3 rounded-lg outline-sky-500 z-10"
              onChange={handleChange}
            />
            {/* <hr className="h-9 w-0.5 rounded-lg bg-slate-200" /> */}
            <div
              className=" h-12 py-3 px-4 flex items-center cursor-pointer bg-slate-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <BiShow /> : <BiHide />}
            </div>
          </div>
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
        {/* {error && <p className="text-red-500 mt-5">{error || error.message}</p>} */}
        {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
        {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignIn;
