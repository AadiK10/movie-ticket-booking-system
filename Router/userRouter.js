const express = require('express');
const { register, login, logout, registerForm, loginForm, adminDashboard, userDashboard } = require('../Controller/userController');
const { viewAvailableShows, bookPage, confirmBooking, bookingHistory, cancelBooking } = require('../Controller/bookingController');

const userRouter = express.Router()

userRouter.get("/register",registerForm)
userRouter.post("/register",register)
userRouter.get("/login",loginForm)
userRouter.post("/login",login)

const isAuth = (req,res,next) =>{
    if(req.session.username) next()
    else res.redirect("/login")
}

userRouter.get("/adminDashboard",isAuth,adminDashboard)
userRouter.get("/dashboard",isAuth,userDashboard)
userRouter.get("/shows",viewAvailableShows)
userRouter.get("/book/:id",bookPage);
userRouter.post("/book/:id",confirmBooking);
userRouter.get("/bookingHistory",bookingHistory)
userRouter.delete("/cancelBooking/:id",cancelBooking)
userRouter.get("/logout",logout)

module.exports = userRouter