const bookingModel = require("../Model/bookingModel");
const movieModel = require("../Model/movieModel");
const showModel = require("../Model/showModel");



const addMoviePage = (req,res)=>{
    res.render("addMovie");
}

const addMovie = async(req,res)=>{
    try{
        const {title,description,duration,language,releaseDate} = req.body;
        await movieModel.create({title, description, duration, language, releaseDate})
        res.redirect("/admin/movies");
    }catch(err){
        console.log(err);
    }
}

const viewMovies = async(req,res)=>{
    const movies = await movieModel.find();
    res.render("viewMovies",{movies, role:req.session.role});
}

const fetchMovieById = async(req,res)=>{
    const movie = await movieModel.findById(req.params.id);
    res.render("editMovie",{movie});
}

const updateMovie = async(req,res)=>{
    await movieModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin/movies");
}

const deleteMovie = async(req,res)=>{
    const movieId = req.params.id;

        const shows = await showModel.find({ movieId });

        const showIds = shows.map(show => show._id);

        await bookingModel.deleteMany({ showId: { $in: showIds } });

        await showModel.deleteMany({ movieId });

        await movieModel.findByIdAndDelete(movieId);

        res.redirect("/admin/movies");
}


module.exports = {addMoviePage,addMovie,viewMovies,fetchMovieById,updateMovie,deleteMovie}
