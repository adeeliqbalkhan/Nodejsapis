
const bcrypt = require("bcrypt");
const User = require('../model/userModel');
const jwt = require("jsonwebtoken");
const upload = require('../controller/uploadController')


const registerUser = async (req, res) => {
    try {
        const { username, bio, email, password, userType } = req.body;

        if (!username || !bio || !email || !password || !userType) {
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        const userAvailable = await User.findOne({ email: email, });
        if (userAvailable) {
            return res.status(400).json({ message: "User already registered!" });
        }
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            bio,
            email,
            password: hashedPassword,
            userType,

        });

        console.log("User created:", user);

        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ data: user, token, message: "User registered successfully" });
        }
        else {
            res.status(400).json({ message: "User data is not valid" });
        }
    } catch (err) {
        console.log("Error:", err);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email/Password are mandatory!" });
    }
    const user = await User.findOne({ email });
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
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
            );
            //saving the assigned token in loginUser
            user.token = accessToken;
            await user.save();

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
        const { userId, username, fileUrl } = req.body;

        if (!userId || !username) {
            res.status(400).json({ message: "Username and userId is mendatory!" });
        };
        // if (req.user.id !== userId) {
        //     return res.status(404).json({ message: "Access denied, Invalid User" });
        // }
        // Find the user by IDs
        const user = await User.findOne({ _id: userId })
        if (user && user.username == username) {
            res.status(400).json({ message: "Username Already exist!" });
        }
        else {

            // Update the username
            const update = {
                $set: {
                    username: username,
                    profilePic: fileUrl,
                }
            };

            // Update the user
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, update, { new: true },).select('-password -token');
            res.status(200).json({ data: updatedUser, message: "Username updated successfully" });
        }
    } catch (error) {
        console.log(error, "Catched Error")
    }
};

const getUser = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "UserId is mendatory to add!" })
        }
        if (req.user.id !== userId) {
            return res.status(404).json({ message: "Access denied. Invalid User" })
        }
        const user = await User.findOne({ _id: userId, }).select("-password -token");

        if (user) {
            return res.status(200).json({ data: user, message: "Data found successfully" });
        } else {
            return res.status(404).json({ message: "User not found!" });
        }
    } catch (error) {
        console.log(error, "Caught an error");
    }
};

const removeUser = async (req, res) => {
    try {
        const { userId, } = req.body;
        if (!userId) {
            res.status(400).json({ message: "userId is mendatory to Delete Info!" });
        };
        if (req.user.id !== userId) {
            return res.status(404).json({ message: "Access denied. Invalid Usser" })
        }
        await User.deleteOne({ _id: userId });
        res.status(200).json({ message: "Data Deleted Successfully" })
    } catch (error) {
        console.log(error, "Caught an Error")
    }
};




module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    removeUser
};