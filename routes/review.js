const express = require("express");
const wrapAsync = require("../utility/wrapAsync");
const router = express.Router();
const Review = require("../modals/review.js");
const Men = require("../modals/men.js");
const { isLoggedIn, isAuthorOfMen } = require("../middleware.js");
const { postReviewMen, deleteReviewMen } = require("../controllers/reviewMen.js");

router.post("/men/:id/review",isLoggedIn,wrapAsync(postReviewMen));

router.delete("/men/:id/review/:reviewId",isLoggedIn,isAuthorOfMen,wrapAsync(deleteReviewMen))


module.exports = router;
