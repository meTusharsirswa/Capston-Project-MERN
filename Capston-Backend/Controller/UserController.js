const express = require("express");
const User = require("../model/User-Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserDetail = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "User Already Exist",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { _id: user._id },
      crypto.randomBytes(64).toString("hex")
    );
    return res.status(200).json({
      success: true,
      message: "Register Successfully",
      token,
    });
  }
};

const loginData = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      crypto.randomBytes(64).toString("hex"),
      {
        expiresIn: "1d", // Token expires in 5 hours
      }
    );

    // Set token in cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    // Send success response with token
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.error("An error occurred while logging in:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const userData = async (req, res) => {
  const token = req.get("Authorization");
  const decodedToken = jwt.decode(
    token.split(" ")[1],
    crypto.randomBytes(64).toString("hex")
  );
  let user = await User.find({ _id: decodedToken.id });

  if (user[0]) {
    res.json({
      user: user[0],
      message: true,
    });
  } else {
    res.json({
      message: false,
      error: "User Not Found",
    });
  }
};

const logout = async (req, res) => {
  try {
    // Clear token cookie
    res.clearCookie("token", { path: "/" }); // Specify the path where the cookie was set
    console.log()
    // Send success response
    res.status(200).json({
      success: true,
      message: "User Logout Successfully !!",
    });
  } catch (error) {
    console.error("An error occurred while logging out:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  UserDetail,
  loginData,
  userData,
  logout,
};
