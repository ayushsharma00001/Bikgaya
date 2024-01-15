const express = require("express");
const router = express.Router();
const User = require("../modals/user.js");
const wrapAsync = require("../utility/wrapAsync.js");       // requiring wrapAsync function to handle errors
const session = require("express-session");
const passport = require("passport");
const LocalStratagy = require("passport-local");
const flash = require("connect-flash");
const {saveRedirectUrl} = require("../middleware.js");
const { renderSignupPage, signupUser, renderLoginPage, loginUser, logoutUser, editUser } = require("../controllers/user.js");





// User section routes

router.route("/signup")
.get(renderSignupPage)
.post(signupUser);

router.route("/login")
.get(renderLoginPage)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),loginUser);


router.get("/logout",logoutUser);




router.put("/users/:id",wrapAsync(editUser));

module.exports = router;