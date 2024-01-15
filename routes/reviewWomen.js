const express = require("express");
const wrapAsync = require("../utility/wrapAsync");
const router = express.Router({mergeParams:true});
const Review = require("../modals/review.js");
const Women = require("../modals/women.js");
const { isLoggedIn, isAuthorOfWomen } = require("../middleware.js");
const { postReviewWomen, deleteReviewWomen } = require("../controllers/reviewWomen.js");

router.post("/",isLoggedIn,wrapAsync(postReviewWomen));

router.delete("/:reviewId",isLoggedIn,isAuthorOfWomen,wrapAsync(deleteReviewWomen))


module.exports = router;
