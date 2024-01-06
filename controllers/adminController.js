const asyncHandler = require("express-async-handler");
const Admins = require("../models/adminModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");
const generateToken = require("../config/generateToken");

const register = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      errorResponse({ res, message: "Please fill required fields!" });
    }
    const usernameExists = await Admins.findOne({ username });

    if (usernameExists) {
      errorResponse({ res, message: "Username already exists!" });
    }
    const admin = await Admins.create({
      username,
      password,
    });
    if (admin) {
      const data = {
        _id: admin._id,
        username: admin.username,
        password: admin.password,
        token: generateToken(admin._id),
      };
      successResponse({
        res,
        message: "admin created successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      errorResponse({ res, message: "Please fill required fields!" });
    }
    const admin = await Admins.findOne({ username });

    if (!admin) {
      errorResponse({ res, message: "admin does not exists!" });
    }
    if (admin && (await admin.matchPassword(password))) {
      const data = {
        _id: admin._id,
        username: admin.username,
        password: admin.password,
        token: generateToken(admin._id),
      };
      successResponse({
        res,
        message: "admin login successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

module.exports = {login,register}