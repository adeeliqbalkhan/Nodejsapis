
const bcrypt = require("bcrypt");
const User = require('../model/userModel');
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {
        const { username, bio, email, password, } = req.body;

        if (!username || !bio || !email || !password) {
            res.status(400).json({ message: "All fields are mandatory!" });
        }

        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400).json({ message: "User already registered!" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            bio,
            email,
            password: hashedPassword,
        });

        console.log("User created:", user);

        if (user) {

            res.status(200).json({ data: user, message: "User register successfully" });

        }
        else {
            res.status(400).json({ message: "User data is not valid" });
        }
    } catch (err) {
        console.log("Error:", err);
    }
};

const loginUser = async (req, res) => {
    const { email, password, bio } = req.body;

    if (!email || !password || !bio) {
        res.status(400).json({ message: "Email/Password are mandatory!" });
    }
    const user = await User.findOne({ email: email, bio: bio });
    if (user) {
        // Compare password with hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            const accessToken = jwt.sign(
                {
                    user: {
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET
            );

            res.status(200).json({ data: user, token: accessToken, message: "Login successfully" });
        } else {
            res.status(401).json({ message: "Email or password is not valid!" });
        }
    } else {
        res.status(401).json({ message: "Email or password is not valid!" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId, username } = req.body;

        if (!userId || !username) {
            res.status(400).json({ message: "Username and userId is mendatory!" });
        };

        // Find the user by IDs
        const user = await User.findOne({ _id: userId })
        if (user && user.username == username) {
            res.status(400).json({ message: "Username Already exist!" });
        }
        else {

            // Update the username
            const update = {
                $set: {
                    username: username
                }
            };
            // Update the user
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, update, { new: true },).select('-password');
            res.status(200).json({ data: updatedUser, message: "Username updated successfully" });
        }
    } catch (error) {
        console.log(error, "Catched Error")
    }
};

const getUser = async (req, res) => {
    try {
        const { userId = null, } = req.body;

        if (!userId) {
            res.status(400).json({ message: "userId is mendatory to get Info!" });
        }
        const user = await User.findOne({ _id: userId }).select('-password')
        if (user) {
            res.status(200).json({ data: user, message: "Data Found Successfully" });
        }
        else {
            res.status(404).json({ message: "User not found!" })
        }
    } catch (error) {
        console.log(error, "Caught an Error")
    }

};

const removeUser = async (req, res) => {
    try {
        const { userId, } = req.body;
        if (!userId) {
            res.status(400).json({ message: "userId is mendatory to Delete Info!" });
        };
        await User.deleteOne({ _id: userId }).select('password');
        res.status(200).json({ message: "Data Deleted Successfully" })


    } catch (error) {
        console.log(error, "Caught an Error")
    }
};

const currentUser = async (req, res) => {
    try {

        res.status(200).json({ message: "All ok!" })

    } catch (error) {
        console.log(error, "Caught an Error")
    }
};



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    removeUser,
    currentUser,
};