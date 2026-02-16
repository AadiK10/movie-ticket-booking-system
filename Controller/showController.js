const bookingModel = require("../Model/bookingModel");
const movieModel = require("../Model/movieModel");
const showModel = require("../Model/showModel");

const addShowPage = async(req,res)=>{
    const movies = await movieModel.find();
    res.render("addShow",{movies});
}

const addShow = async(req,res)=>{
    try{
        const {movieId,showTime,theatre,totalSeats} = req.body;
        await showModel.create({ movieId,showTime,theatre,totalSeats,availableSeats: totalSeats})
        res.redirect("/admin/shows");
    }catch(err){
        console.log(err);
    }
}

const viewShows = async(req,res)=>{
    const shows = await showModel
    .find()
    .populate("movieId")
    .where("movieId").ne(null);
    res.render("viewShows",{shows,role:req.session.role});
}

const fetchShowById = async(req,res)=>{
    const show = await showModel.findById(req.params.id).populate("movieId");
    res.render("editShow",{show});
}

const updateShow = async(req,res)=>{
    const { theatre, showTime, totalSeats } = req.body;

    const show = await showModel.findById(req.params.id);

    const seatDifference = totalSeats - show.totalSeats;
    show.availableSeats += seatDifference;

    show.theatre = theatre;
    show.showTime = showTime;
    show.totalSeats = totalSeats;

    await show.save();

    res.redirect("/admin/shows");
}


const deleteShow = async(req,res)=>{
    const showId = req.params.id;

        await bookingModel.deleteMany({ showId });

        await showModel.findByIdAndDelete(showId);

        res.redirect("/admin/shows");
}


module.exports = {
    addShowPage,
    addShow,
    viewShows,
    fetchShowById,
    updateShow,
    deleteShow
}
