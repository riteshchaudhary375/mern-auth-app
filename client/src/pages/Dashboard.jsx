import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserSuccess,
} from "../redux/user/user.slice.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserSuccessMessage, setUpdateUserSuccessMessage] =
    useState(null);
  const [updateUserErrorMessage, setUpdateUserErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserErrorMessage(null);
    setUpdateUserSuccessMessage(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserErrorMessage("No change made");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        setUpdateUserErrorMessage(data.message);
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateUserSuccessMessage("User updated successfully");
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
      setUpdateUserErrorMessage(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutUserSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-3 mt-5">
        <span className="text-slate-600 font-semibold text-xl">
          Welcome back,
        </span>
        <div className="mt-10 max-w-sm mx-auto border border-gray-200 rounded-lg shadow-md flex flex-col items-center p-5">
          <div className="relative h-32 w-32 my-3 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img
              src={currentUser.profilePicture}
              alt="user-profile"
              className="rounded-full w-full h-full object-cover border-4 border-[lightgray]"
            />
          </div>
          <h1 className="font-semibold text-3xl text-slate-700 underline mb-4">
            Profile
          </h1>
          <form className="w-full" onSubmit={handleUpdateSubmit}>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="username" className="text-slate-500 w-1/4">
                Username:{" "}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="text-slate-700 border border-slate-300 outline-slate-300 p-1 rounded-md  w-3/4"
                defaultValue={currentUser.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="email" className="text-slate-500 w-1/4">
                Email:{" "}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="text-slate-700 border border-slate-300 outline-slate-300 p-1 rounded-md  w-3/4"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="text-slate-500 w-1/4">
                Password:{" "}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="text-slate-700 border border-slate-300 outline-slate-300 p-1 rounded-md  w-3/4"
                placeholder="password"
                defaultValue="*******"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="border-2 border-green-700 hover:bg-green-700 hover:text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85">
                Update Profile
              </button>
              <button
                type="button"
                className="border-2 border-red-700 hover:bg-red-700 hover:text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85"
                onClick={handleDeleteUser}
              >
                Delete Account
              </button>
            </div>
          </form>
          <hr className="w-full my-4" />
          <div className="w-full flex flex-row items-center justify-between">
            <button
              type="button"
              className="mx-auto bg-sky-700 text-white text-xl px-4 py-1 rounded-lg hover:opacity-85"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
      {updateUserErrorMessage && (
        <p className="mx-5 my-5 sm:mr-5 sm:w-1/3 sm:float-right lg:w-1/4 border border-red-500 px-3 py-1 text-red-600 rounded-md">
          {updateUserErrorMessage}
        </p>
      )}
      {updateUserSuccessMessage && (
        <p className="mx-5 my-5 sm:mr-5 sm:w-1/3 sm:float-right lg:w-1/4 border border-green-500 px-3 py-1 text-green-600 rounded-md">
          {updateUserSuccessMessage}
        </p>
      )}
      {/*  {error && (
        <p className="mx-5 my-5 sm:mr-5 sm:w-1/3 sm:float-right lg:w-1/4 border border-red-500 px-3 py-1 text-red-600 rounded-md">
          {error}
        </p>
      )} */}
    </>
  );
};

export default Dashboard;
