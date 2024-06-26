import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-sky-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">MERN Auth</h1>
        </Link>
        <ul className="flex gap-5">
          <Link to="/" className="hover:underline">
            <li>Home</li>
          </Link>
          <Link to="/dashboard">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
                title="Profile"
              />
            ) : (
              <div className="flex gap-4">
                <Link to="/sign-in" className="hover:underline">
                  <li>Sign in</li>
                </Link>
                <Link to="/sign-up" className="hover:underline">
                  <li>Sign up</li>
                </Link>
              </div>
            )}
          </Link>

          {/* {currentUser ? (
            <Link to="/dashboard">
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
                title="Profile"
              />
            </Link>
          ) : (
            <>
              <Link to="/sign-in" className="hover:underline">
                <li>Sign in</li>
              </Link>
              <Link to="/sign-up" className="hover:underline">
                <li>Sign up</li>
              </Link>
            </>
          )} */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
