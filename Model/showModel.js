const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movieId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"movie",
    required:true
  },
  showTime:{
    type:Date,
    required:true
  },
  theatre:{
    type:String,
    required:true,
  },
  totalSeats:{
    type:Number,
    min:1,
    required:true
  },
  availableSeats:{
    type:Number,
    min:0,
    required:true
  }
},{timestamps:true});

module.exports = mongoose.model("show",showSchema);
