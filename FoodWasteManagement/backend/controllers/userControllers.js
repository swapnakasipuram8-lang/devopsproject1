const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// =====================================
// Register User
// =====================================
const registerUser = async (req, res) => {

    try {

        let { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Please fill all fields"
            });

        }

        name = name.trim();
        email = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({

            name,
            email,
            password: hashedPassword

        });

        await user.save();

        res.status(201).json({

            success: true,
            message: "Registration Successful"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

// =====================================
// Login User
// =====================================
const loginUser = async (req, res) => {

    try {

        let { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Please enter Email and Password"
            });

        }

        email = email.trim().toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

// =====================================
// Get All Users
// =====================================
const getUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).json({

            success: true,

            users

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

// =====================================
// Get Logged-in User Profile
// =====================================
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

// =====================================
// Update Logged-in User Profile
// =====================================
const updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.name = name || user.name;
        user.email = email ? email.trim().toLowerCase() : user.email;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile Updated Successfully",

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

// =====================================
// Export
// =====================================

module.exports = {

    registerUser,
    loginUser,
    getUsers,
    getProfile,
    updateProfile

};