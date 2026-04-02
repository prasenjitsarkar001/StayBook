require('dotenv').config();
console.log(process.env);

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");

const ejsMate = require('ejs-mate');
const passport = require("passport");

const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const session = require("express-session");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const flash = require("connect-flash");

const axios = require("axios");
const ExpressError = require("./utils/ExpressError.js");


//routes part
const listings =require("./routes/listing.js"); 
const reviews =require("./routes/review.js");
const userRouter =require("./routes/user.js");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const sessionOption = {
  secret: "mySecretCode",
  resave: false,
  saveUninitialized: true,
    cookie:{
      expires: Date.now() +7*24*60*60*1000,
      maxAge: 7* 24*60*60* 1000,
      httpOnly: true,
    }
}

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//  Flash middleware
app.use(flash());

//  Make flash messages available to all templates
app.use((req, res, next) => {
  console.log("Current User:", req.user);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});






main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });



async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.get("/", (req, res) => {
//     res.send("hi!, i am root");
// });




//routes part start
app.use("/listings",listings);
app.use("/listings/:id/reviews", reviews);
app.use("/",userRouter);
//routes part end


// 404
app.use((req, res, next) => {
  next(new ExpressError(404, "Page is not Found"));
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);

  let { statusCode = 500, message = "Something went wrong!" } = err;

  res.status(statusCode).render("error", { message });
});

app.listen(3000, (req, res) => {
  console.log("server is listening to port 3000");
});