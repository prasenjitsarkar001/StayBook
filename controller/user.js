const User = require("../models/user");
// Signup page
module.exports.renderSignupFrom = (req, res) => {
  res.render("users/signup.ejs");
};
// Signup logic
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to StayBook, " + registeredUser.username + "!");
      res.redirect("/listings");
    });

  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};
// Login page
module.exports.renderLogin=(req, res) => {
  res.render("users/login.ejs");
};
// Login logic
module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back, " + req.user.username + "!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
//logout
module.exports.logout= (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
}
//forget
module.exports.renderForget = (req, res) => {
  res.render("users/forgot.ejs");
}
//forget logic
module.exports.forget = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "No account found with that email.");
    return res.redirect("/forgot");
  }

  // Redirect to reset page with user id
  res.redirect(`/reset/${user._id}`);
}
//Reset Password
module.exports.resetPassword =async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    req.flash("error", "User not found.");
    return res.redirect("/forgot");
  }

  res.render("users/reset.ejs", { user });
}
////Handle New Password
module.exports.newPassword =async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match.");
    return res.redirect(`/reset/${req.params.id}`);
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    req.flash("error", "User not found.");
    return res.redirect("/forgot");
  }

  await user.setPassword(password);   // passport-local-mongoose
  await user.save();

  req.flash("success", "Password updated successfully.");
  res.redirect("/login");
}