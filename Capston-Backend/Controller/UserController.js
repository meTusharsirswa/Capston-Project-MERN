const express = require("express");
const User = require("../model/User-Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto")
const UserDetail = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.json({
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
    const token = jwt.sign({ _id: user._id }, crypto.randomBytes(64).toString('hex'));
    return res.json({
      success: true,
      message: "Register Successfully",
      token,
    });
  }
};

const loginData = async (req, res) => {
  const { email, password } = req.body;
  const login = await User.findOne({ email }).select("+password");
  if (!login)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  const isMatch = await bcrypt.compare(password, login.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  } else {
    const token = jwt.sign({ id: login._id }, crypto.randomBytes(64).toString('hex'), {
      expiresIn: "5h",
    });
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
    });
  }
};

const userData = async (req, res) => {
  const token = req.get("Authorization");
  const decodedToken = jwt.decode(token.split(" ")[1], crypto.randomBytes(64).toString('hex'));
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

const logout = async(req,res)=>{
  const token = req.headers.authorization.split(" ")[1];
  const deletedToken = [];
  deletedToken.push(token);
  res.json({
    status: true,
    success: true,
    message: "User Logout Successfully !!",
  });
} 

module.exports = {
  UserDetail,
  loginData,
  userData,
  logout,
};
