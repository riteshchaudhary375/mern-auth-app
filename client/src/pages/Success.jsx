import React from "react";
import { IoCloudDoneOutline } from "react-icons/io5";

const Success = () => {
  return (
    <center className="my-9">
      <IoCloudDoneOutline className="h-12 w-12 mb-3" />
      <p className="text-2xl font-semibold">Operation Successful</p>
      <p className="text-slate-500 mt-1">
        <strong>Password updated.</strong> Now, you can login your account.
      </p>
    </center>
  );
};

export default Success;
