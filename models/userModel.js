const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userId: { type: Number, unique: true, required: true },
        fullName: { type: String, required: true},
        document: { type: String, required: true},
        email: { type: String, required: true },
        active: { type: Boolean, default: true },
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
