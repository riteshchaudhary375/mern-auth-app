import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  // verifying id and token

  /* const params = useParams();
  console.log(params); */

  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/${id}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 201) {
        setPassword("");
        setUpdateMessage("Password updated successfully");
        console.log("Password updated successfully");
        setLoading(false);
        navigate("/success");
      } else {
        console.log("Token expired! Generate new link");
        setErrorMessage("Token expired! Generate new link");
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setErrorMessage(error);
      setLoading(false);
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
          <label htmlFor="password" className="font-semibold text-lg">
            New Password:
          </label>
          <input
            className="border-2 p-2 rounded-lg mt-1 outline-green-500"
            type="password"
            name="password"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={handleChange}
          />
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-green-700 text-white w-full rounded-md p-2 hover:opacity-85 mt-6 mb-2"
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
