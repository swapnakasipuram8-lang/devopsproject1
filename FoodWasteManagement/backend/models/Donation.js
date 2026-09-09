const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
{
    foodName:{
        type:String,
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },

    donorName:{
        type:String,
        required:true
    },

    receiverName:{
        type:String,
        default:"Not Assigned"
    },

    location:{
        type:String,
        required:true
    },

    status:{
        type:String,
        default:"Available"
    }

},
{timestamps:true}
);

module.exports = mongoose.model("Donation", donationSchema);