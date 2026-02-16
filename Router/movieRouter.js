const express = require("express");
const { addMoviePage, addMovie, viewMovies, fetchMovieById, updateMovie, deleteMovie } = require("../Controller/movieController");

const movieRouter = express.Router();

movieRouter.get("/addMovie",addMoviePage);
movieRouter.post("/addMovie",addMovie);
movieRouter.get("/movies",viewMovies);
movieRouter.get("/editMovie/:id", fetchMovieById);
movieRouter.patch("/editMovie/:id", updateMovie);
movieRouter.delete("/deleteMovie/:id", deleteMovie);


module.exports = movieRouter;
