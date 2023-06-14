
const bcrypt = require("bcrypt");
const User = require('../model/userModel');
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {
        const { username, bio, email, password, } = req.body;

        if (!username || !bio || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }

        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered!");
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
            // Check if the entered password is correct
            const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

            if (isPasswordCorrect) {

                // make new user object without password fields
                const updatedUser = { _id: user.id, bio: user.bio, email: user.email }

                res.status(201).json({ data: updatedUser, message: "User register successfully" });
            } else {
                res.status(400);
                throw new Error("Invalid password!");
            }
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }
    } catch (err) {
        console.log("Error:", err);
    }
};

const loginUser = async (req, res) => {
    // console.log(req.body)
    const { email, password, bio } = req.body;

    if (!email || !password || !bio) {
        res.status(400);
        throw new Error("Email/Password are mandatory!");
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

            // Remove password from user object
            const userWithoutPass = { _id: user.id, email: user.email, bio: bio, }

            res.status(200).json({ data: userWithoutPass, token: accessToken, message: "Login successfully" });
        } else {
            res.status(401);
            throw new Error("Email or password is not valid!");
        }
    } else {
        res.status(401);
        throw new Error("Email or password is not valid!");
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId = null, username = null } = req.body;

        if (!userId || !username) {
            res.status(400).json({ message: "Username and userId is mendatory!" });
        };

        // Find the user by IDs
        const user = await User.findOne({ _id: userId })
        if (user && user.username == username) {
            res.status(400).json({ message: "Username Already exist!" });
        }
        else {
            if (user) {

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
            else {
                res.status(404);
                throw new Error("User not found");
            }
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
            // const dataToGive = { username: user.username, bio: user.bio, email: user.email };
            res.status(200).json({ data: user, message: "Data Found Successfully" });

        }
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        console.log(error, "Caught an Error")
    }

};

const RemoveUser = async (req, res) => {
    try {
        const { userId = null, } = req.body;
        if (!userId) {
            res.status(400).json({ message: "userId is mendatory to Delete Info!" });
        };
        const user = await User.deleteOne({ _id: userId }).select('password');
        if (user) {
            // const removeData = { bio: user.bio, email: user.email };
            res.status(200).json({ data: user, message: "Data Deleted Successfully" })

        }

    } catch (error) {
        console.log(error, "Caught an Error")
    }
}



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    RemoveUser,
};
