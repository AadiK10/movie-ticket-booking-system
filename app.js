const express = require('express');
const session = require('express-session');
const userRouter = require('./Router/userRouter');
const methodOverride = require('method-override');
const ejs = require('ejs');
const { dbConnect } = require('./db');
const movieRouter = require('./Router/movieRouter');
const showRouter = require('./Router/showRouter');


dbConnect()
const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    res.locals.role = req.session.role;
    res.locals.username = req.session.username;
    next();
});

app.use("/",userRouter)
app.use("/admin",movieRouter)
app.use("/admin",showRouter)

app.listen(5000, ()=>{
    console.log("running");
})