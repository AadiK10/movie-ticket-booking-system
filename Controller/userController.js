const showModel = require("../Model/showModel");
const userModel = require("../Model/userModel");
const bcryptjs = require('bcryptjs');


const registerForm = (req,res)=>{
    res.render("register")
}

const register = async(req,res)=>{
    try {
        const{name,email,password} = req.body
        const hashPassword = await bcryptjs.hash(password,10)
        await userModel.create({name,email,password:hashPassword})
        res.redirect("/login")
    } catch (error) {
        console.log(error);
    }
}

const loginForm = (req,res)=>{
    res.render("login")
}

const login = async(req,res)=>{
    try {
        const{name,password} = req.body
        const user = await userModel.findOne({name})

        if(!user) res.end("user not registered")

        const isMatch = await bcryptjs.compare(password,user.password)
        if(!isMatch) res.end("Invalid Password")

        req.session.username = user.name
        req.session.userId = user._id;
        req.session.role = user.name === "admin"?"admin":"user"

        if(req.session.role === "admin") res.redirect("/adminDashboard")
        else res.redirect("/dashboard") 
        
    } catch (error) {
        console.log(error);
    }
}

const adminDashboard = (req,res)=>{
    res.render("adminDashboard", {name:req.session.username, role:req.session.role})
}

const userDashboard = async(req,res)=>{
    const shows = await showModel.find().populate("movieId");
    res.render("userDashboard", {
        name: req.session.username,
        role:req.session.role,
        shows
    });
}

const logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login")
    })
}

module.exports = {registerForm,register,loginForm,login,userDashboard,adminDashboard,logout}