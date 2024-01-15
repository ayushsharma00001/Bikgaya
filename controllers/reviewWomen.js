const Review = require("../modals/review");
const Women = require("../modals/women");

module.exports.postReviewWomen = async (req,res,next)=>{
    let product = await Women.findById(req.params.id);
    let newReview = new Review(req.body.review);
    product.reviews.push(newReview);
    newReview.author = req.user._id;

    await product.save();
    await newReview.save();
    req.flash("success","Review created");
    res.redirect(`/women/${req.params.id}`);
}

module.exports.deleteReviewWomen = async (req,res,next)=>{
    let {id, reviewId} = req.params;
    await Women.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/women/${id}`);
}