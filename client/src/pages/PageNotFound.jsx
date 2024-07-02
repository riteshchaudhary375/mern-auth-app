import React from "react";
import { LuServerOff } from "react-icons/lu";

const PageNotFound = () => {
  return (
    <center className="mt-10">
      <LuServerOff className="h-12 w-12 mb-5" />
      <h1 className="text-slate-700 font-bold text-3xl">Page Not Found!</h1>
    </center>
  );
};

export default PageNotFound;
