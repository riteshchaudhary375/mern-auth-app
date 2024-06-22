import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-sky-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">MERN Auth</h1>
        </Link>
        <ul className="flex gap-5">
          <Link to="/sign-in" className="hover:underline">
            <li>Sign in</li>
          </Link>
          <Link to="/sign-up" className="hover:underline">
            <li>Sign up</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
