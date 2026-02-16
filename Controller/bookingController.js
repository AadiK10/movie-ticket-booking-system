const showModel = require("../Model/showModel");
const bookingModel = require("../Model/bookingModel");

const viewAvailableShows = async(req,res)=>{
    const shows = await showModel.find().populate("movieId");
    res.render("userShows",{shows});
}

const bookPage = async(req,res)=>{
    const show = await showModel.findById(req.params.id).populate("movieId");
    res.render("bookTicket",{show});
}

const confirmBooking = async(req,res)=>{
    try{
        const show = await showModel.findById(req.params.id);
        const seats = parseInt(req.body.seats);

        if(show.availableSeats < seats){
            return res.send("Not enough seats available");
        }

        show.availableSeats -= seats;
        await show.save();

        await bookingModel.create({
            userId: req.session.userId,
            showId: show._id,
            seatsBooked: seats
        });

        res.redirect("/dashboard");

    }catch(err){
        console.log(err);
    }
}

const bookingHistory = async(req,res)=>{
    let bookings = await bookingModel
        .find({ userId: req.session.userId })
        .populate({
            path: "showId",
            populate: { path: "movieId" }
        });
    bookings = bookings.filter(b => b.showId && b.showId.movieId);
    res.render("bookingHistory",{bookings,role:req.session.role});
}

const cancelBooking = async(req,res)=>{
    const booking = await bookingModel.findById(req.params.id);

    const show = await showModel.findById(booking.showId);
    show.availableSeats += booking.seatsBooked;
    await show.save();

    await bookingModel.findByIdAndDelete(req.params.id);

    res.redirect("/bookingHistory");
}

module.exports = {
    viewAvailableShows,
    bookPage,
    confirmBooking,
    bookingHistory,
    cancelBooking
}
