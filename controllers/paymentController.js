const asyncHandler = require("express-async-handler");
const Payments = require("../models/paymentModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");
const generateToken = require("../config/generateToken");


const makePayment = asyncHandler(async (req, res) => {
    try {
        const { order_id, payment_method, payment_status,transaction_id,amount} =
          req.body;
    
        if (!order_id  || !payment_method ||!payment_status || !transaction_id||!amount ) {
          errorResponse({ res, message: "Please fill required fields!" });
        }
    
        const payment = await Payments.create({
            order_id, payment_method, payment_status,transaction_id,amount
        });
        if (payment) {
          successResponse({
            res,
            message: "Payment successfully",
            data: payment,
          });
        }
      } catch (error) {
        console.log(error);
        errorResponse({ res, message: "Something went wrong!" });
      }
  });
  
  const edit = asyncHandler(async (req, res) => {
    try {
      const { order_id, payment_method, payment_status,transaction_id,amount} =
        req.body;
  
      if (!order_id  || !payment_method ||!payment_status ||!amount) {
        errorResponse({ res, message: "Please fill required fields!" });
      }
  
      const payment = await Payments.findByIdAndUpdate(
        req.params.id,
        {
          order_id:order_id,
          payment_method:payment_method,
          payment_status:payment_status,
          transaction_id:transaction_id,
          amount:amount,
        },
        {
          new: true,
        }
      );
      if (payment) {
        successResponse({
          res,
          message: "Payment updated successfully",
          data: payment,
        });
      } else {
        errorResponse({ res, message: "Product not found!" });
      }
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });
  const find = asyncHandler(async (req, res) => {
    try {
      const payment = await Payments.findById(req.params.id);
      if (payment) {
        successResponse({
          res,
          message: "Payment fetched successfully",
          data: payment,
        });
      } else {
        errorResponse({ res, message: "Payment not found!" });
      }
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });

const  getAll=asyncHandler(async(req,res)=>{
    try {
        const payment = await Payments.find();
        if (payment) {
          successResponse({
            res,
            message: "Payment fetched successfully",
            data: payment,
          });
        } else {
          errorResponse({ res, message: "No Payment data!" });
        }
      } catch (error) {
        console.log(error);
        errorResponse({ res, message: "Something went wrong!" });
      }
  })
  

  module.exports = { makePayment,find,getAll,edit};