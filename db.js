const mongoose = require('mongoose');

const dbConnect = () =>{
    mongoose.connect("mongodb://localhost:27017/movieTicketBookingSystem").then((result) => {
        console.log("connected");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = {dbConnect}