import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-6xl mx-auto p-3 my-9">
      <span className="text-slate-600 font-semibold text-xl">
        Welcome back,
      </span>
      <div className="mt-10 max-w-sm mx-auto border border-gray-200 rounded-lg shadow-md flex flex-col items-center p-5">
        <div className="relative h-32 w-32 self-center cursor-pointer shadow-lg overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user-profile"
            className="rounded-full w-full h-full object-cover border-4 border-[lightgray]"
          />
        </div>
        <h1 className="font-semibold text-3xl text-slate-700 underline mt-6 mb-4">
          Profile
        </h1>
        <div className="font-semibold text-lg">
          <p>
            <span className="text-slate-600">Username: </span>
            {currentUser.username}
          </p>
          <p>
            <span className="text-slate-600">Email: </span>
            {currentUser.email}
          </p>
        </div>
        <button className="font-semibold text-xl bg-red-700 text-white px-4 py-1 rounded-lg mt-5 hover:opacity-85">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
