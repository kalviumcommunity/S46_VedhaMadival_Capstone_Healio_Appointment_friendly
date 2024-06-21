const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isdoctor: {
      type: Boolean,
      default: false,
    },
    isadmin:{
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default : []
    },
    unseenNotifications: {
      type: Array,
      default : []
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
