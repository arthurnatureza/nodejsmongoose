const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: { type: Number, unique: true, required: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    birthday: { type: String, required: true},
    address: { type: String, required: true},
    cep: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: false },
    password: { type: String, required: true },
    privilege: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;

module.exports.hashPassword = async (password) => {
  try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
  } catch (error) {
      throw new Error("Hashing failed", error);
  }
};
