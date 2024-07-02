import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    /*     return res
      .status(400)
      .json({ success: false, message: "All fields are required" }); */

    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(200).json({ success: true, message: "Signup successful" });
  } catch (error) {
    /* res.status(500).json({
      success: false,
      message: error.message,
    }); */
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All filds are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    // const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      // const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      // const expiryDate = new Date(Date.now() + 3600000);
      res
        .status(201)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// SECRET KEY
const keySecret = process.env.JWT_SECRET;

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);

  if (!email || email === "") {
    return next(errorHandler(401, "Enter email address"));
  }

  try {
    const validUser = await User.findOne({ email });
    // console.log("validUser", validUser);

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // token generate for reset password
    const token = jwt.sign({ id: validUser._id }, keySecret, {
      expiresIn: "180s",
    });
    // console.log("token", token);

    const setUserToken = await User.findByIdAndUpdate(
      { _id: validUser._id },
      { verifyToken: token },
      { new: true }
    );
    // console.log("setUserToken", setUserToken);
    if (setUserToken) {
      const mailOptions = {
        from: "riteshkd997@gmail.com",
        to: email,
        subject: "Sending Email for Password Reset",
        text: `This link valid for 3 minutes http://localhost:5173/reset/password/${validUser.id}/${setUserToken.verifyToken}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Got Error", error);
          return res
            .status(401)
            .json({ success: false, message: "Email not send" });
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(200)
            .json({ success: true, message: "Email sent successfully" });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  // console.log(id, token);

  try {
    const validUser = await User.findOne({ _id: id, verifyToken: token });
    // console.log(validUser);

    // validation for token verify
    const verifyToken = jwt.verify(token, keySecret);
    // console.log(verifyToken);

    if (validUser && verifyToken.id) {
      res.status(200).json({ success: true, validUser });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const newPassword = async (req, res, next) => {
  const { id, token } = req.params;

  const { password } = req.body;

  try {
    const validUser = await User.findOne({ _id: id, verifyToken: token });
    // console.log(validUser);

    // validation for token verify
    const verifyToken = jwt.verify(token, keySecret);

    if (validUser && verifyToken.id) {
      const newPassword = bcryptjs.hashSync(password, 10);

      const setUserNewPassword = await User.findByIdAndUpdate(
        { _id: id },
        { password: newPassword }
      );
      setUserNewPassword.save();
      res.status(201).json({
        success: true,
        message: "Password updated successful",
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
