import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// HASHING ROUNDS
const salt = parseInt(process.env.SALT_ROUNDS);
// const salt = 10;

// SECRET KEY
const keySecret = process.env.JWT_SECRET;

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

  try {
    const preUsername = await User.findOne({ username });
    if (preUsername) {
      return res
        .status(422)
        .json({ success: false, message: "Username already exists" });
    }

    const preEmail = await User.findOne({ email });
    if (preEmail) {
      return res
        .status(422)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
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

    const token = jwt.sign({ id: validUser._id }, keySecret);
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
      const token = jwt.sign({ id: user._id }, keySecret);
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
      const hashedPassword = bcryptjs.hashSync(generatedPassword, salt);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, keySecret);
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
        from: process.env.EMAIL,
        to: email,
        subject: "MERN Auth Password Reset",
        // text: `This link valid for 3 minutes http://localhost:5173/reset/password/${validUser.id}/${setUserToken.verifyToken}`,
        html: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Email Template</title>
                  </head>
                  <body
                    style="background-color: grey; font-family: 'Poppins', Arial, sans-serif"
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="550"
                      bgcolor="white"
                      style="border: 2px solid black"
                    >
                      <tbody>
                        <!-- HEADER -->
                        <tr>
                          <td
                            align="center"
                            style="
                              background-color: #4cb96b;
                              color: #ffffff;
                              height: 50px;
                              line-height: 25px;
                              letter-spacing: 0.7px;
                            "
                          >
                            <p style="margin-bottom: 0px">
                              <a
                                href="#"
                                target="_blank"
                                style="
                                  font-size: 23px;
                                  font-weight: bold;
                                  color: #ffffff;
                                  text-decoration: none;
                                "
                                >MERN Auth</a
                              >
                            </p>
                            <p style="font-size: 14px; font-weight: semibold; margin-top: 0px">
                              Reset password
                            </p>
                          </td>
                        </tr>

                        <!-- BODY -->
                        <tr>
                          <td>
                            <table style="padding: 25px 20px; font-size: 15px">
                              <tr>
                                <td>
                                  <tr>
                                    <td style="line-height: 25px; letter-spacing: 0.7px">
                                      <p>
                                        Hi
                                        <span style="font-weight: bold; font-size: 18px"
                                          >${validUser.username}</span
                                        >,
                                      </p>
                                      <p>Forgot your password?</p>
                                      <p>
                                        You recently requested to reset your password for your
                                        account. Use the button below to reset it.
                                        <strong
                                          >This password reset is only valid for 3
                                          minutes.</strong
                                        >
                                      </p>
                                      <a
                                        href="http://localhost:5173/reset/password/${validUser.id}/${setUserToken.verifyToken}"
                                        target="_blank"
                                        style="
                                          font-weight: bold;
                                          text-decoration: none;
                                          padding: 7px 15px;
                                          border-radius: 7px;
                                          background-color: #4cb96b;
                                          color: #ffffff;
                                        "
                                        >Reset password</a
                                      >
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <p style="margin-bottom: 0px; margin-top: 25px; color: black">
                                        Or copy and paste the URL into your browser:
                                      </p>
                                      <p
                                        style="
                                          margin-top: 5px;
                                          background-color: rgba(0, 0, 0, 0.07);
                                          padding: 5px 0px 5px 9px;
                                          border-radius: 7px;
                                        "
                                      >
                                        <a
                                          href="#"
                                          target="_blank"
                                          style="color: #0400ed; font-size: 12px"
                                          >
                                            http://localhost:5173/reset/password/${validUser.id}/${setUserToken.verifyToken}
                                          </a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- FOOTER -->
                        <tr>
                          <td
                            align="center"
                            style="
                              background-color: #333333;
                              color: #ffffff;
                              font-size: 13px;
                              height: 95px;
                              line-height: 25px;
                              letter-spacing: 0.7px;
                            "
                          >
                            <p style="margin-bottom: 0px">
                              Copyright © 2024 | MERN Auth | All Rights Reserved.
                            </p>
                            <p style="margin-top: 0px">Mahrajgunj, Kathmandu, Nepal</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </body>
                </html>
              `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // console.log("Got Error", error);
          return res
            .status(401)
            .json({ success: false, message: "Email not send" });
        } else {
          // console.log("Email sent: " + info.response);
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
      const newPassword = bcryptjs.hashSync(password, salt);

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
