if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
const mongoose = require("mongoose");
app.use(express.static(path.join(__dirname, "public")));
const ExpressError = require("./utility/ExpressError");
const User = require("./modals/user.js");

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const session = require("express-session");
const passport = require("passport");
const LocalStratagy = require("passport-local");
const flash = require("connect-flash");
const MongoStore = require('connect-mongo');


// Requiring routers

const womenRouter = require("./routes/women.js");
const userRouter = require("./routes/user.js");
const menRouter = require("./routes/men.js");
const addRouter = require("./routes/newProduct.js");
const reviewRouter = require("./routes/review.js");
const reviewRouterWomen = require("./routes/reviewWomen.js");
const dashboardRouter = require("./routes/dashboard.js");
const addressesRouter = require("./routes/addresses.js");
const cartRouter = require("./routes/cart.js");
const orderRouter = require("./routes/orders.js");



// Mongo store setup
const db_url = process.env.ATLASDB_URL;
const store = MongoStore.create({
  mongoUrl:db_url,
  crypto:{
      secret:process.env.SECRET
  },
  tuchAfter:24*3600

});
store.on("error",()=>{
  console.log("Error occured on Mongo session store",err);
})
// Session setup

sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUnintitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Setting passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratagy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/contact", (req, res, next) => {
  next(new ExpressError(500, "Its is not available right now"));
});
app.get("/about", (req, res, next) => {
  next(new ExpressError(500, "Its is not available right now"));
});
app.get("/child", (req, res, next) => {
  next(new ExpressError(500, "Its is not available right now"));
});

// Using routers here

app.use("/women", womenRouter);
app.use("/men", menRouter);
app.use("/cart",cartRouter);
app.use("/women/:id/review", reviewRouterWomen);
app.use("/", userRouter);
app.use("/", addRouter);
app.use("/", reviewRouter);
app.use("/dashboard", dashboardRouter);
app.use("/",addressesRouter);
app.use("/",orderRouter);


async function main() {
  await mongoose.connect(db_url);
}
main()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});


app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
