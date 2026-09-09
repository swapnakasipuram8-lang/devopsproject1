const Food = require("../models/Food");

// ======================
// Add Food
// ======================
const addFood = async (req, res) => {
    try {
        const {
            foodName,
            category,
            quantity,
            expiryDate,
            donorName,
            location
        } = req.body;

        const food = new Food({
            foodName,
            category,
            quantity,
            expiryDate,
            donorName,
            location
        });

        await food.save();

        res.status(201).json({
            message: "Food Added Successfully",
            food
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ======================
// Get All Foods
// ======================
const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ======================
// Update Food
// ======================
const updateFood = async (req, res) => {
    try {

        const food = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        res.status(200).json({
            message: "Food Updated Successfully",
            food
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ======================
// Delete Food
// ======================
const deleteFood = async (req, res) => {
    try {

        const food = await Food.findByIdAndDelete(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        res.status(200).json({
            message: "Food Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addFood,
    getFoods,
    updateFood,
    deleteFood
};