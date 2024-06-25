import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { signInSuccess } from "../redux/user/user.slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleClick = async (req, res) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      // console.log(resultFromGoogle);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Could not login with google!", error);
      dis;
    }
  };

  return (
    <button
      className="w-1/2 mx-auto flex justify-center items-center p-3 rounded-lg bg-transparent hover:bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 border border-sky-600 hover:border-transparent transition bg-duration-200 ease-in"
      onClick={handleGoogleClick}
      type="button"
    >
      <FaGoogle className="mr-2" />
      Continue with Google
    </button>
  );
};

export default OAuth;
