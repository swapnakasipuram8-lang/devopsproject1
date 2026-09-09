const Donation = require("../models/Donation");

// Add Donation
const addDonation = async (req, res) => {

    try {

        const donation = new Donation(req.body);

        await donation.save();

        res.status(201).json({
            message: "Donation Added Successfully",
            donation
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Donations
const getDonations = async (req, res) => {

    try {

        const donations = await Donation.find();

        res.status(200).json(donations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addDonation,
    getDonations
};