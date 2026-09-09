const express = require("express");
const router = express.Router();

const {
    addFood,
    getFoods,
    updateFood,
    deleteFood
} = require("../controllers/foodControllers");

// Add Food
router.post("/", addFood);

// View All Foods
router.get("/", getFoods);

// Update Food
router.put("/:id", updateFood);

// Delete Food
router.delete("/:id", deleteFood);

module.exports = router;