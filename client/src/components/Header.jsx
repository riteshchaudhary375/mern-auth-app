import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUserSuccess } from "../redux/user/user.slice.js";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [profileToggle, setProfileToggle] = useState(false);

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

  const handleToggleProfile = () => {
    setProfileToggle(!profileToggle);
  };

  return (
    <div className="bg-sky-200" onClick={handleToggleProfile}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">MERN Auth</h1>
        </Link>
        <ul className="flex gap-5">
          <Link to="/" className="hover:underline">
            <li>Home</li>
          </Link>
          {currentUser ? (
            <div className="relative transition-all duration-500">
              <button
                type="button"
                onClick={handleToggleProfile}
                // onClose={() => setProfileToggle(!profileToggle)}
              >
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                  title="Profile"
                />
              </button>
              {profileToggle && (
                <ul className="absolute right-0 mt-2/3 w-40 rounded-md bg-white shadow-lg">
                  <Link to="/dashboard">
                    <li className="px-3 py-3 hover:bg-slate-100 hover:rounded-md">
                      Profile
                    </li>
                  </Link>
                  <hr />
                  <button
                    onClick={handleSignout}
                    className="w-full text-red-600 text-start px-3 py-3 hover:bg-red-100 hover:rounded-md"
                  >
                    Log out
                  </button>
                </ul>
              )}

              {/* <ul
                className={`absolute ${
                  profileToggle ? "block" : "hidden"
                } right-0 mt-2/3 w-40 rounded-md bg-white shadow-lg`}
              >
                <Link to="/dashboard">
                  <li className="px-3 py-3 hover:bg-slate-100 hover:rounded-md">
                    Profile
                  </li>
                </Link>
                <hr />
                <button
                  onClick={handleSignout}
                  className="w-full text-red-600 text-start px-3 py-3 hover:bg-red-100 hover:rounded-md"
                >
                  Log out
                </button>
              </ul> */}
            </div>
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
        </ul>
      </div>
    </div>
  );
};

export default Header;
