import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="border rounded-2xl shadow p-6 mt-7">
        <h1 className="text-3xl text-center font-semibold mb-7">Sign In</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border-2 p-3 rounded-lg outline-sky-500"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border-2 p-3 rounded-lg outline-sky-500"
          />
          <button className="bg-sky-600 text-white p-3 rounded-lg hover:opacity-90  disabled:opacity-80">
            Sign In
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500 hover:underline">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
