const Waste = require("../models/Waste");

// =======================
// Add Waste
// =======================
const addWaste = async (req, res) => {
    try {

        const {
            foodName,
            quantity,
            reason,
            location
        } = req.body;

        const waste = new Waste({
            foodName,
            quantity,
            reason,
            location
        });

        await waste.save();

        res.status(201).json({
            message: "Waste Added Successfully",
            waste
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// =======================
// Get All Waste
// =======================
const getWaste = async (req, res) => {
    try {

        const waste = await Waste.find();

        res.status(200).json(waste);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// =======================
// Update Waste
// =======================
const updateWaste = async (req, res) => {
    try {

        const waste = await Waste.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!waste) {
            return res.status(404).json({
                message: "Waste not found"
            });
        }

        res.status(200).json({
            message: "Waste Updated Successfully",
            waste
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// =======================
// Delete Waste
// =======================
const deleteWaste = async (req, res) => {
    try {

        const waste = await Waste.findByIdAndDelete(req.params.id);

        if (!waste) {
            return res.status(404).json({
                message: "Waste not found"
            });
        }

        res.status(200).json({
            message: "Waste Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// =======================
// Export
// =======================
module.exports = {
    addWaste,
    getWaste,
    updateWaste,
    deleteWaste
};