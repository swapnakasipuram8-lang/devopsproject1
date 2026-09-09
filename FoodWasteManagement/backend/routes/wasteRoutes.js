const express = require("express");

const router = express.Router();

const {
    addWaste,
    getWaste,
    updateWaste,
    deleteWaste
} = require("../controllers/wasteControllers");

// Add Waste
router.post("/", addWaste);

// Get All Waste
router.get("/", getWaste);

// Update Waste
router.put("/:id", updateWaste);

// Delete Waste
router.delete("/:id", deleteWaste);

module.exports = router;