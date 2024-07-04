import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

const ResetPassword = () => {
  // verifying id and token

  /* const params = useParams();
  console.log(params); */

  const { id, token } = useParams();
  const [formData, setFormData] = useState({ password: "", cPassword: "" });
  /* const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState(""); */
  const [updateMessage, setUpdateMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const userValid = async () => {
    const res = await fetch(
      `http://localhost:3000/api/auth/reset/password/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    // console.log(data);

    if (res.status === 200) {
      console.log("User valid");
    } else {
      console.log("User not valid");
      navigate("/page-not-found");
    }
  };

  const handleChange = (e) => {
    // ------------wrong---------------
    /* setPassword(e.target.value);
    setCPassword(e.target.value); */

    // ----------------for whole form at a time------------------

    // setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

    // --------------- one by one------------------------

    const { name, value } = e.target;

    setFormData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, cPassword } = formData;

    if (password === "") {
      return setErrorMessage("Password is required");
    } else if (cPassword === "") {
      return setErrorMessage("Confirm password is required");
    } else if (password !== cPassword) {
      return setErrorMessage("Password and Confirm password not matched");
    } else {
      try {
        setLoading(true);
        const res = await fetch(`/api/auth/${id}/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        const data = await res.json();
        // console.log(data);
        setFormData({ ...formData, password: "", cPassword: "" });

        if (res.status === 201) {
          setUpdateMessage("Password updated successfully");
          setLoading(false);
          navigate("/success");
        } else {
          setLoading(false);
          setErrorMessage("Token expired! Please generate new link");
          return;
        }
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <div className="fixed inset-0 bg-sky-600 backdrop-blur-sm flex items-center">
      <div className="bg-gray-100 shadow-lg w-3/4 md:w-1/2 xl:w-1/3 mx-auto rounded-lg px-5 py-7">
        <h1 className="mb-5 text-2xl text-center font-semibold text-gray-700">
          Reset Password
        </h1>
        <form className="flex flex-col">
          <div className="mb-3">
            <label htmlFor="password" className="font-semibold text-lg">
              New Password:
            </label>
            <div className="border-2 rounded-lg flex justify-between items-center">
              <input
                className="w-full p-3 rounded-lg outline-green-500 z-10"
                type={!showPassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className=" h-12 py-3 px-4 flex items-center cursor-pointer bg-slate-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <BiShow /> : <BiHide />}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="font-semibold text-lg">
              Confirm Password:
            </label>
            <div className="border-2 rounded-lg flex justify-between items-center">
              <input
                className="w-full p-3 rounded-lg outline-green-500 z-10"
                type={!showCPassword ? "password" : "text"}
                name="cPassword"
                id="cPassword"
                placeholder="Enter confirm password"
                value={formData.cPassword}
                onChange={handleChange}
              />
              <div
                className=" h-12 py-3 px-4 flex items-center cursor-pointer bg-slate-200"
                onClick={() => setShowCPassword(!showCPassword)}
              >
                {!showCPassword ? <BiShow /> : <BiHide />}
              </div>
            </div>
          </div>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-green-700 text-white w-full rounded-md p-2 hover:opacity-85 mt-7 mb-2"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div className="mb-2 mt-1 flex justify-end">
          <Link to="/sign-in" className="hover:underline">
            Sign in
          </Link>
        </div>
        {updateMessage && <p className="text-sky-600">{updateMessage}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
