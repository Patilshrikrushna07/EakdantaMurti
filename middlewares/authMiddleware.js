const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const { errorResponse } = require("../helpers/apiResponse");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      errorResponse({ res, message: "Unauthorized" });
    }
  } else {
    errorResponse({ res, message: "Unauthorized" });
  }
});

module.exports = protect;
