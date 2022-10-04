const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
        },
        lastname: { type: String, required: true, minlength: 2, maxlength: 30 },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            validate:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1024,
        },
        admin: { type: Boolean, default: false },
        phone_number: { type: Number },
        address: { type: String },
    },
    { collection: "user" },
    { timestamps: true }
);

UserSchema.virtual("fullname").get(function () {
    return `${this.firstname} ${this.lastname}`;
});

const User = mongoose.model("userData", UserSchema);

module.exports = User;
