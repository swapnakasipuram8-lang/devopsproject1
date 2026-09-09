const User = require("../models/User");
const Food = require("../models/Food");
const Waste = require("../models/Waste");
const Donation = require("../models/Donation");

const getDashboard = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();
        const totalFoods = await Food.countDocuments();
        const totalWaste = await Waste.countDocuments();
        const totalDonations = await Donation.countDocuments();

        const latestFoods = await Food.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            totalUsers,
            totalFoods,
            totalWaste,
            totalDonations,
            latestFoods
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getDashboard
};