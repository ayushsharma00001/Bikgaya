const Review = require("../modals/review");
const Men = require("../modals/men");

module.exports.postReviewMen = async (req,res,next)=>{
    let product = await Men.findById(req.params.id);
    let newReview = new Review(req.body.review);
    product.reviews.push(newReview);
    newReview.author = req.user._id;

    await product.save();
    await newReview.save();
    req.flash("success","Review created");
    res.redirect(`/men/${req.params.id}`);
};

module.exports.deleteReviewMen = async (req,res,next)=>{
    let {id, reviewId} = req.params;
    await Men.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/men/${id}`);
}