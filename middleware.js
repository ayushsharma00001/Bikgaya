const Men = require("./modals/men");
const Women = require("./modals/women");
const Review = require("./modals/review");





module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must have logged in!");
        res.redirect("/login");
    }
    else{
        next();
    }
};
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isAdmin = async(req,res,next)=>{
    if(req.user && req.user.access =="admin"){
        next();
    }
    else{
        req.flash("error","You are not Admin to change something in website");
        let {id} = req.params;
        if(id){
            if(await Men.findById(id)){
                res.redirect(`/men/${id}`);
            }
            else if(await Women.findById(id)){
                res.redirect(`/women/${id}`);
            }
        }
        else{
            res.redirect("/");
        }

    }
}

module.exports.isAuthorOfMen = async(req,res,next)=>{
    let {reviewId,id} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){   // res.locals.currUser._id
        req.flash("error","You did not created this Review!");
        return res.redirect(`/men/${id}`);
    }
    next();
};
module.exports.isAuthorOfWomen = async(req,res,next)=>{
    let {reviewId,id} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){   // res.locals.currUser._id
        req.flash("error","You did not created this Review!");
        return res.redirect(`/women/${id}`);
    }
    next();
};










const {menSchema,womenSchema} = require("./Schema.js");              // Requiring for mongoose validation if we use any api caller tool for products
const ExpressError = require("./utility/ExpressError.js");       // requiring ExpressError class to show our custom errors error page
const User = require("./modals/user.js");
const Order = require("./modals/orders.js");



module.exports.validateWomenProduct = (req,res,next)=>{
    let {error} = menSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }
    else{
        next();
    }
}
module.exports.validateWomenProduct = (req,res,next)=>{
    let {error} = womenSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }
    else{
        next();
    }
}



module.exports.isCartOwner = async(req,res,next)=>{
    let {userId} = req.params;
    let user = await User.findById(userId);
    if(req.user.cart.equals(user.cart)){
        next();
    }
    else{
        req.flash("error","You are requested for Wrong Cart");
        res.redirect("/");
    }
}

module.exports.isOwnerOfCartId = async(req,res,next)=>{
    let {cartId} = req.params;
    if(req.user.cart.equals(cartId)){
        next();
    }
    else{
        req.flash("error","You are requested for Wrong Cart");
        res.redirect("/");
    }
}

module.exports.orderPlaced = async(req,res,next)=>{
    let {orderId} = req.params;
    let order = await Order.findById(orderId);
    if(order){
        next();
    }
    else{
        req.flash("error","Their is no such Order");
        res.redirect("/");
    }
}

module.exports.isOutOfStock = async(req,res,next)=>{
    let {id} = req.params;
    let product = await Men.findById(id);
    if(!product){
        product = await Women.findById(id);
        if(product.stock>1){
            next();
        }
        else{
            req.flash("error","Product out of stock");
            res.redirect(`/women/${id}`);
        }

    }
    else{
        if(product.stock>1){
            next();
        }
        else{
            req.flash("error","Product out of stock");
            res.redirect(`/men/${id}`);
        }
    }
}