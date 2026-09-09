const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema(
{
    foodName:{
        type:String,
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },

    reason:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    }

},
{timestamps:true}
);

module.exports = mongoose.model("Waste",wasteSchema);