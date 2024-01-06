const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

adminModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminModel.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Admins = mongoose.model("admins", adminModel);
module.exports = Admins;
