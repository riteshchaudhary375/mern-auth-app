import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import path from "path";
// import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// for finding path dynamically
const __dirname = path.resolve();

// express app
const app = express();

// defining directory of folder client statically
app.use(express.static(path.join(__dirname, "/client/dist")));

// from that static folder path, finding 'index.html' file and sending to client to render first
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const port = process.env.API_PORT;

app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// MIDDLEWARE FOR ERROR HANDLE
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
