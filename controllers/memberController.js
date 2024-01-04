const asyncHandler = require("express-async-handler");
const TeamMember = require("../models/memberModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");

const create = asyncHandler(async (req, res) => {
  try {
    const { name, email, mobile_number, image, city } = req.body;

    if (!name || !city || !email || !mobile_number) {
      errorResponse({ res, message: "Please fill required fields!" });
    }
    const emailExists = await TeamMember.findOne({ email });
    const mobileExists = await TeamMember.findOne({ mobile_number });

    if (emailExists) {
      errorResponse({ res, message: "Email already exists!" });
    }
    if (mobileExists) {
      errorResponse({ res, message: "Mobile number already exists!" });
    }

    const member = await TeamMember.create({
      name,
      email,
      mobile_number,
      image,
      city,
    });
    if (member) {
      successResponse({
        res,
        message: "Member created successfully",
        data: member,
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const remove = asyncHandler(async (req, res) => {
  try {
    const memberId = req.params.id;

    const member = await TeamMember.findById(memberId);
    if (!member) {
      return errorResponse({ res, message: "Member not found!" });
    }

    // Remove the member
    await member.deleteOne();

    successResponse({
      res,
      message: "Member removed successfully",
      data: { memberId },
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const edit = asyncHandler(async (req, res) => {
  try {
    const { name, email, mobile_number, image, city } = req.body;
    if (!name || !city || !email || !mobile_number) {
      errorResponse({ res, message: "Please fill required fields!" });
    }
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id ,
      {
        name: name,
        email: email,
        mobile_number: mobile_number,
        image: image,
        city: city,
      },
      {
        new: true,
      }
    );
    if (member) {
      successResponse({
        res,
        message: "Member updated successfully",
        data: member,
      });
    } else {
      errorResponse({ res, message: "Member not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getSingle = asyncHandler(async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (member) {
          successResponse({
            res,
            message: "Member fetched successfully",
            data: member,
          });
        } else {
          errorResponse({ res, message: "Member not found!" });
        }
    } catch (error) {
        console.log(error);
        errorResponse({ res, message: "Something went wrong!" });
    }
})

const getAll = asyncHandler(async (req, res) => {
  try {
    const member = await TeamMember.find();
    if (member) {
      successResponse({
        res,
        message: "Members fetched successfully",
        data: member,
      });
    } else {
      errorResponse({ res, message: "No members data!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

module.exports = { create, remove, edit, getSingle, getAll };
