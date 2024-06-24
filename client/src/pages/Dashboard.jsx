import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-6xl mx-auto p-3 my-9">
      <p className="font-semibold text-lg">
        <span className="text-slate-600 mr-1">Welcome back,</span>
        <span className="uppercase">{currentUser.username}!</span>
      </p>
    </div>
  );
};

export default Dashboard;
