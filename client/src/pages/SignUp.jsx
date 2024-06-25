import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      // console.log(error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="bg-[#ffffff] border rounded-2xl shadow-2xl p-6 mt-9">
        <h1 className="text-3xl font-semibold text-center mb-2">Create a new account</h1>
        <p className="text-slate-600 text-center mb-5">It's quick and easy</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="border-2 p-3 rounded-lg outline-sky-500"
            onChange={handleChange}
          />
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
            {loading ? "Loading..." : "Sign up"}
          </button>
          <OAuth />
        </form>
        <div className="flex justify-center gap-1 mt-5">
          <p>Already have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500 hover:underline">Sign in</span>
          </Link>
        </div>
        <p className="text-red-500 mt-5">
          {/* {errorMessage && "Something went wrong"} */}
          {errorMessage && errorMessage}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
