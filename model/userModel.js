const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'admin'
    },
    bio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already taken"]
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    profilePic: {
        type: String,
        default: null
    }

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);

