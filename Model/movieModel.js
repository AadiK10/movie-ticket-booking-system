const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    min: 30,
    required: true,  
  },
  language: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true
  }
}, {timestamps:true});

module.exports = mongoose.model("movie",movieSchema);
