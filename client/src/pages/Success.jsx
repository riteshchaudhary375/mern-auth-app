import React from "react";
import { IoCloudDoneOutline } from "react-icons/io5";

const Success = () => {
  return (
    <center className="my-9">
      <IoCloudDoneOutline className="h-12 w-12 mb-3" />
      <p className="text-2xl font-semibold">Operation Successful</p>
    </center>
  );
};

export default Success;
