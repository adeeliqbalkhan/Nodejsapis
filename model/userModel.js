const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    bio: {
        type: String,
        required: [true, "Please add the Bio of User"],
    },
    email: {
        type: String,
        required: [true, "Please add the user Email Address"],
        unique: [true, "Email already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the user Phone Number"],
    },

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);

