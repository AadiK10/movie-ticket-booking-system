const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    showId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "show",
        required: true
    },
    seatsBooked:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("booking",bookingSchema);
