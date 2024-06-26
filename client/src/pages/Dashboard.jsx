import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-6xl mx-auto p-3 my-9">
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
        <form className="w-full">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="username" className="text-slate-500 w-1/4">
              Username:{" "}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="text-slate-700 border border-slate-300 outline-slate-300 p-1 rounded-md  w-3/4"
              value={currentUser.username}
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
              value={currentUser.email}
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
              placeholder="********"
            />
          </div>
          <div className="flex justify-center items-center">
            <button className="font-semibold text-xl bg-sky-700 text-white px-4 py-1 rounded-lg mt-3 hover:opacity-85">
              Update Profile
            </button>
          </div>
        </form>
        <hr className="w-full my-4" />
        <div className="w-full flex flex-row items-center justify-between">
          <Link to="#" className="cursor-pointer hover:underline">
            <p>Delete Account?</p>
          </Link>
          <Link to="#" className="cursor-pointer hover:underline">
            <p>Sign out</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
