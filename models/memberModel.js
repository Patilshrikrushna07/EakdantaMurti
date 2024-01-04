const mongoose = require("mongoose");

const teamMemberModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TeamMember = mongoose.model("team_member", teamMemberModel);
module.exports = TeamMember;
