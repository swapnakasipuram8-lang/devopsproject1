const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getUsers,
    getProfile,
    updateProfile
} = require("../controllers/userControllers");

// ==========================
// Authentication
// ==========================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// ==========================
// Users
// ==========================

// Get All Users
router.get("/", getUsers);

// Get Logged-in User Profile
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;