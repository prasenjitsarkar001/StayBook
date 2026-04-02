const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js")

// Signup page
router.get("/signup", userController.renderSignupFrom);

// Signup logic
router.post("/signup",wrapAsync(userController.signup));

// Login page
router.get("/login",userController.renderLogin );

// Login logic
router.post("/login",
    saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
 userController.login
);

// Logout
router.get("/logout", userController.logout);

//forget 
router.get("/forgot", userController.renderForget);
//forget logic
router.post("/forgot",userController.forget);

//Reset Password
router.get("/reset/:id", userController.resetPassword );
//Handle New Password
router.post("/reset/:id", userController.newPassword);


module.exports = router;